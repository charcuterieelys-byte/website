import React, { useEffect, useRef, useState } from 'react';

interface TurntableVideoProps {
  videoSrc: string;
  videoFallbackMp4: string;
  posterSrc: string;
  alt: string;
  isActiveOrAdjacent: boolean;
  getTargetProgress: () => number;
  className?: string;
}

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = vec2(a_position.x * 0.5 + 0.5, 0.5 - a_position.y * 0.5);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying vec2 v_uv;
  uniform sampler2D u_tex;
  void main() {
    vec3 rgb = texture2D(u_tex, vec2(v_uv.x, v_uv.y * 0.5)).rgb;
    float alpha = texture2D(u_tex, vec2(v_uv.x, 0.5 + v_uv.y * 0.5)).r;
    gl_FragColor = vec4(rgb * alpha, alpha);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Renders a 360° scroll-scrubbed 3D turntable with 100% real pixel-perfect transparency
 * on ALL browsers:
 * - Chrome / Firefox / Edge: Native VP9 WebM Alpha (yuva420p)
 * - Safari (iPhone, iPad, macOS): H.264 Stacked-Alpha MP4 + WebGL Alpha Compositor Canvas
 */
export const TurntableVideo: React.FC<TurntableVideoProps> = ({
  videoSrc,
  videoFallbackMp4,
  posterSrc,
  alt,
  isActiveOrAdjacent,
  getTargetProgress,
  className = 'w-full h-full object-contain pointer-events-none select-none floating-product-shadow',
}) => {
  const [isAppleSafari] = useState(
    () =>
      typeof navigator !== 'undefined' &&
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        /^((?!chrome|android).)*safari/i.test(navigator.userAgent))
  );

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const smoothProgressRef = useRef<number>(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Derive the stacked-alpha MP4 path from videoFallbackMp4 (e.g. 04-double-basket.mp4 -> 04-double-basket-alpha.mp4)
  const safariAlphaMp4Src = videoFallbackMp4.replace(
    /\.mp4(\?.*)?$/,
    '-alpha.mp4$1'
  );

  // Initialize video attributes
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    vid.pause();
  }, [videoFailed]);

  // WebGL initialization & frame drawing for Safari / iOS stacked-alpha MP4
  useEffect(() => {
    if (!isAppleSafari || videoFailed) return;
    const canvas = canvasRef.current;
    const vid = videoRef.current;
    if (!canvas || !vid) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      setVideoFailed(true);
      return;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setVideoFailed(true);
      return;
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setVideoFailed(true);
      return;
    }
    gl.useProgram(prog);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const drawVideoFrame = () => {
      if (vid.readyState < 2) return;
      try {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          vid
        );
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        setCanvasReady(true);
      } catch {
        // Ignore transient texture upload error before frame decode completes
      }
    };

    const onLoadedData = () => {
      vid.pause();
      vid.currentTime = 0.01;
      drawVideoFrame();
    };

    vid.addEventListener('loadeddata', onLoadedData);
    vid.addEventListener('seeked', drawVideoFrame);
    vid.addEventListener('timeupdate', drawVideoFrame);

    if (vid.readyState >= 2) {
      drawVideoFrame();
    } else {
      vid.load();
    }

    return () => {
      vid.removeEventListener('loadeddata', onLoadedData);
      vid.removeEventListener('seeked', drawVideoFrame);
      vid.removeEventListener('timeupdate', drawVideoFrame);
      gl.deleteTexture(tex);
      gl.deleteBuffer(posBuffer);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [isAppleSafari, videoFailed]);

  // 60fps Lerp Scroll-Scrubbing Loop
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed || !isActiveOrAdjacent) return;

    let rafId: number;
    const tick = () => {
      const targetP = getTargetProgress();
      const currentP = smoothProgressRef.current;
      const nextP = currentP + (targetP - currentP) * 0.2;
      smoothProgressRef.current = nextP;

      if (
        vid.readyState >= 2 &&
        vid.duration &&
        Number.isFinite(vid.duration)
      ) {
        const clampedP = Math.min(1, Math.max(0, nextP));
        const targetTime = clampedP * Math.max(0, vid.duration - 0.04);

        if (!vid.seeking && Math.abs(vid.currentTime - targetTime) > 0.012) {
          try {
            vid.currentTime = targetTime;
          } catch {
            // Ignore transient seek exception while buffering
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [getTargetProgress, isActiveOrAdjacent, videoFailed]);

  if (videoFailed) {
    return <img src={posterSrc} alt={alt} className={className} />;
  }

  // Safari / iOS: WebGL Stacked-Alpha Canvas + seamless transparent WebP poster until first WebGL frame draws
  if (isAppleSafari) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {!canvasReady && (
          <img
            src={posterSrc}
            alt={alt}
            className={`${className} absolute inset-0`}
          />
        )}
        <canvas
          ref={canvasRef}
          width={800}
          height={450}
          aria-label={alt}
          className={`${className} transition-opacity duration-200 ${
            canvasReady ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <video
          ref={videoRef}
          src={safariAlphaMp4Src}
          muted
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          className="sr-only pointer-events-none w-px h-px opacity-0"
        />
      </div>
    );
  }

  // Chrome / Edge / Firefox / Android: Native VP9 WebM Alpha (yuva420p)
  return (
    <video
      ref={videoRef}
      muted
      playsInline
      preload="auto"
      poster={posterSrc}
      onLoadedData={(e) => {
        const v = e.currentTarget;
        v.pause();
        v.currentTime = 0.01;
      }}
      className={className}
    >
      <source src={videoSrc} type="video/webm" />
      <source
        src={videoFallbackMp4}
        type="video/mp4"
        onError={() => setVideoFailed(true)}
      />
    </video>
  );
};
