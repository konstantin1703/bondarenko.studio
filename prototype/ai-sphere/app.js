(() => {
  const root = document.documentElement;
  const shell = document.getElementById('shell');
  const nodes = document.getElementById('microNodes');
  const sphereStage = document.getElementById('sphereStage');
  const progressFill = document.getElementById('progressFill');
  const builder = document.getElementById('builder');
  const builderSummary = document.getElementById('builderSummary');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const pieceCount = window.innerWidth < 820 ? 9 : 12;
  for (let index = 0; index < pieceCount; index += 1) {
    const piece = document.createElement('span');
    piece.className = 'shell-piece';
    const angle = (360 / pieceCount) * index + (index % 2 ? 5 : -3);
    const distance = 66 + (index % 4) * 16;
    piece.style.setProperty('--angle', `${angle}deg`);
    piece.style.setProperty('--distance', `${distance}px`);
    piece.style.zIndex = String(20 - Math.abs(index - pieceCount / 2));
    piece.style.filter = `brightness(${0.82 + (index % 5) * 0.055})`;
    shell.appendChild(piece);
  }

  const nodeCount = window.innerWidth < 820 ? 18 : 32;
  for (let index = 0; index < nodeCount; index += 1) {
    const node = document.createElement('i');
    node.className = 'micro-node';
    node.style.setProperty('--angle', `${(360 / nodeCount) * index}deg`);
    node.style.setProperty('--spread', `${28 + (index % 6) * 12}px`);
    node.style.animationDelay = `${-index * 0.09}s`;
    nodes.appendChild(node);
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const updatePointer = (event) => {
    targetX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetY = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', updatePointer, { passive: true });
  }

  const updateScroll = () => {
    const section = document.querySelector('.hero-scroll');
    const max = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / max));
    const eased = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    root.style.setProperty('--open', reduceMotion ? '0.42' : eased.toFixed(4));
    progressFill.style.height = `${eased * 100}%`;
  };

  const animate = () => {
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;
    root.style.setProperty('--pointer-x', currentX.toFixed(4));
    root.style.setProperty('--pointer-y', currentY.toFixed(4));
    requestAnimationFrame(animate);
  };

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
  animate();

  document.querySelectorAll('.magnetic').forEach((element) => {
    if (!window.matchMedia('(pointer: fine)').matches || reduceMotion) return;

    element.addEventListener('pointermove', (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
    });
    element.addEventListener('pointerleave', () => {
      element.style.transform = '';
    });
  });

  const openBuilder = () => {
    builder.classList.add('is-open');
    builder.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeBuilder = () => {
    builder.classList.remove('is-open');
    builder.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-open-builder]').forEach((button) => {
    button.addEventListener('click', openBuilder);
  });
  document.querySelector('.builder-close').addEventListener('click', closeBuilder);
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeBuilder();
  });

  const selected = { product: '', goal: '' };
  document.querySelectorAll('[data-choice-group]').forEach((group) => {
    const groupName = group.dataset.choiceGroup;
    group.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', () => {
        group.querySelectorAll('button').forEach((item) => item.classList.remove('is-selected'));
        button.classList.add('is-selected');
        selected[groupName] = button.textContent.trim();
        const parts = [selected.product, selected.goal].filter(Boolean);
        builderSummary.textContent = parts.length
          ? parts.join(' · ')
          : 'Выберите продукт и задачу';
      });
    });
  });

  sphereStage.addEventListener('pointerenter', () => root.classList.add('sphere-hover'));
  sphereStage.addEventListener('pointerleave', () => root.classList.remove('sphere-hover'));
})();
