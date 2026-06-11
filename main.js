/* ============================================================
   Anurag Gangwar — Portfolio JS
   - Terminal typewriter animation
   - Scroll-based nav style
   - Reveal-on-scroll animations
   - Mobile menu toggle
   ============================================================ */

// ── NAV SCROLL STYLE ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── TERMINAL TYPEWRITER ──
const terminalEl = document.getElementById('terminal-text');

const lines = [
  { prompt: '~', cmd: 'whoami', delay: 400 },
  { output: 'Anurag Gangwar', color: 'val', delay: 200 },
  { prompt: '~', cmd: 'cat interests.txt', delay: 600 },
  { output: '# AI  |  Cybersecurity  |  Quant Finance', color: 'comment', delay: 200 },
  { output: '# Backend Dev  |  Data Science', color: 'comment', delay: 200 },
  { prompt: '~', cmd: 'ls ./projects', delay: 600 },
  { output: 'Legal-Ease  PhishRadar  NBAS  RapidAid', color: 'val', delay: 200 },
  { prompt: '~', cmd: 'echo $STATUS', delay: 600 },
  { output: 'Open to internships & research 🚀', color: 'val', delay: 200 },
  { prompt: '~', cmd: '', delay: 800, cursor: true },
];

async function typeLine(text, el, speed = 40) {
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTerminal() {
  await sleep(800);
  for (const line of lines) {
    await sleep(line.delay || 0);

    const span = document.createElement('span');
    span.classList.add('terminal__line');

    if (line.prompt !== undefined) {
      // Command line
      const promptEl = document.createElement('span');
      promptEl.classList.add('prompt');
      promptEl.textContent = `anurag@portfolio ${line.prompt} % `;
      span.appendChild(promptEl);

      terminalEl.appendChild(span);
      terminalEl.appendChild(document.createElement('br'));

      if (line.cmd) {
        const cmdEl = document.createElement('span');
        span.appendChild(cmdEl);
        await typeLine(line.cmd, cmdEl, 55);
        terminalEl.scrollTop = terminalEl.scrollHeight;
        await sleep(300);
      }

      if (line.cursor) {
        const cursorEl = document.createElement('span');
        cursorEl.classList.add('cursor');
        cursorEl.textContent = '▋';
        span.appendChild(cursorEl);
      }

    } else if (line.output !== undefined) {
      span.classList.add(line.color || 'val');
      terminalEl.appendChild(span);
      terminalEl.appendChild(document.createElement('br'));
      await typeLine(line.output, span, 22);
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }
  }
}

runTerminal();

// ── REVEAL ON SCROLL ──
const revealTargets = [
  '.edu__card',
  '.timeline__item',
  '.project__card',
  '.skills__group',
  '.cert__card',
  '.award__card',
  '.contact__card',
];

const allReveal = document.querySelectorAll(revealTargets.join(', '));
allReveal.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

allReveal.forEach(el => observer.observe(el));

// ── ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--text)'
          : '';
      });
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));
