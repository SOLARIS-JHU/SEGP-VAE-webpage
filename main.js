'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [{left:'$$',right:'$$',display:true},{left:'\\(',right:'\\)',display:false}],
      throwOnError:false
    });
  }

  const copy = document.getElementById('copy-bibtex');
  const bib = document.getElementById('bibtex');
  const status = document.getElementById('copy-status');
  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bib.textContent.trim());
      status.textContent = 'BibTeX copied.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(bib);
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'BibTeX selected. Use your browser’s copy command.';
    }
  });

  const object = document.getElementById('abstract-animation');
  const toggle = document.getElementById('toggle-animation');
  const restart = document.getElementById('restart-animation');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let svg, frame = null, playing = !reduced.matches, previous = null;
  let elapsed = window.CopipAbstract?.initialTime ?? 2;

  function draw() { if (svg) window.CopipAbstract.render(svg, elapsed); }
  function tick(timestamp) {
    if (!playing || document.hidden) { previous = null; frame = null; return; }
    if (previous !== null) elapsed += Math.min((timestamp - previous) / 1000, 0.1);
    previous = timestamp;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function synchronize() {
    toggle.textContent = playing ? 'Pause animation' : 'Play animation';
    toggle.setAttribute('aria-pressed', String(playing));
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null; previous = null;
    if (playing && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function initialize() {
    const candidate = object.contentDocument?.documentElement;
    if (!candidate || candidate.localName !== 'svg' || !window.CopipAbstract) return;
    svg = candidate;
    toggle.disabled = restart.disabled = false;
    draw(); synchronize();
  }
  object.addEventListener('load', initialize);
  initialize();
  toggle.addEventListener('click', () => { playing = !playing; synchronize(); });
  restart.addEventListener('click', () => { elapsed = window.CopipAbstract?.initialTime ?? 2; draw(); synchronize(); });
  reduced.addEventListener('change', event => { if (event.matches) { playing = false; synchronize(); } });
  document.addEventListener('visibilitychange', synchronize);
});
