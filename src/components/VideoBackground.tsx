'use client';

import { useEffect, useRef, useState } from 'react';

const PELEX_VIDEOS = [
  'https://player.vimeo.com/external/316940708.sd.mp4?s=2d5c6a9e5bfe2c3a6c6ba4bdf3b8c543b0c1f6c0&profile_id=165&oauth2_token_id=57447761',
  'https://player.vimeo.com/external/369058745.sd.mp4?s=728c01dbb1d72561cdcfcfbf9b3b75eb22e0b100&profile_id=165&oauth2_token_id=57447761',
  'https://player.vimeo.com/external/344327793.sd.mp4?s=d41bc8c1f0417ab4acca213fde7dacf2e22aa8bd&profile_id=165&oauth2_token_id=57447761',
];

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const retryRef = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    setTheme((root.dataset.theme as 'light' | 'dark') ?? 'light');
    const obs = new MutationObserver(() => {
      setTheme((document.documentElement.dataset.theme as 'light' | 'dark') ?? 'light');
    });
    obs.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isDark) return;
    const video = videoRef.current;
    if (!video) return;

    const tryLoad = (index: number) => {
      if (index >= PELEX_VIDEOS.length) return;
      video.src = PELEX_VIDEOS[index];
      video.load();
    };

    const onCanPlay = () => {
      setLoaded(true);
      video.play().catch(() => {});
    };

    const onError = () => {
      retryRef.current++;
      tryLoad(retryRef.current);
    };

    video.addEventListener('canplay', onCanPlay);
    video.addEventListener('error', onError);

    tryLoad(0);

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('error', onError);
      video.pause();
      video.src = '';
    };
  }, [isDark]);

  if (!isDark) return null;

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`pointer-events-none fixed inset-0 h-full w-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ zIndex: -4 }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -3, background: 'linear-gradient(rgb(8 8 12 / 0.45), rgb(8 8 12 / 0.55))' }}
      />
    </>
  );
}
