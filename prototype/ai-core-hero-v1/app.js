(() => {
  const scrollScene = document.getElementById('heroScroll');
  const frames = [...document.querySelectorAll('[data-frame]')];
  const stateLabel = document.getElementById('stateLabel');
  const cursorGlow = document.getElementById('cursorGlow');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const labels = ['01 · СОБРАН', '02 · АКТИВИРОВАН', '03 · ЧАСТИЧНО РАСКРЫТ', '04 · SYSTEM MODE'];
  let scrollTarget = 0;
  let scrollCurrent = 0;
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerX = 0;
  let pointerY = 0;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const smoother = (t) => {
    const x = clamp(t, 0, 1);
    return x * x * x * (x * (x * 6 - 15) + 10);
  };
  function updateScroll() {
    const rect = scrollScene.getBoundingClientRect();
    const max = Math.max(1, scrollScene.offsetHeight - innerHeight);
    scrollTarget = clamp(-rect.top / max, 0, 1);
  }
  function renderFrames(progress) {
    const scaled = progress * (frames.length - 1);
    const base = Math.floor(scaled);
    const local = smoother(scaled - base);
    frames.forEach((frame, index) => {
      let opacity = 0;
      if (index === base) opacity = 1 - local;
      if (index === base + 1) opacity = local;
      if (base >= frames.length - 1 && index === frames.length - 1) opacity = 1;
      frame.style.opacity = opacity.toFixed(4);
      const depth = (index - 1.5) * 0.7;
      frame.style.setProperty('--parallax-x', `${pointerX * depth}px`);
      frame.style.setProperty('--parallax-y', `${pointerY * depth}px`);
    });
    const state = Math.min(labels.length - 1, Math.round(scaled));
    stateLabel.textContent = labels[state];
    document.documentElement.style.setProperty('--progress', progress.toFixed(4));
  }
  function animate() {
    scrollCurrent += (scrollTarget - scrollCurrent) * (reducedMotion ? 1 : 0.075);
    pointerX += (pointerTargetX - pointerX) * 0.055;
    pointerY += (pointerTargetY - pointerY) * 0.055;
    renderFrames(scrollCurrent);
    requestAnimationFrame(animate);
  }
  addEventListener('scroll', updateScroll, { passive: true });
  addEventListener('resize', updateScroll, { passive: true });
  addEventListener('pointermove', (event) => {
    pointerTargetX = (event.clientX / innerWidth - 0.5) * 10;
    pointerTargetY = (event.clientY / innerHeight - 0.5) * 8;
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }, { passive: true });
  addEventListener('pointerleave', () => { pointerTargetX = 0; pointerTargetY = 0; });
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  scrollTo(0, 0);
  updateScroll();
  renderFrames(0);
  animate();
})();
