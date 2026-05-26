/**
 * LetraLand – Script Principal
 * Sons, Interatividade, Temas e Mini-Jogo do Alfabeto
 * Versão: 1.0
 */

'use strict';

/* ============================================================
   1. CONFIGURAÇÕES GLOBAIS
   ============================================================ */
const CONFIG = {
  soundEnabled: true,
  currentTheme: 'light',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  letterColors: [
    '#FF1493', '#FFB343', '#00BFBF', '#9B59B6', '#27AE60',
    '#E74C3C', '#3498DB', '#F39C12', '#1ABC9C', '#E91E63',
    '#FF5722', '#8BC34A', '#00BCD4', '#FF9800', '#673AB7',
    '#4CAF50', '#F44336', '#2196F3', '#FFEB3B', '#009688',
    '#FF4081', '#69F0AE', '#FF6D00', '#40C4FF', '#EA80FC',
    '#CCFF90'
  ],
  mascotMessages: [
    'Olá! Eu sou o Letrinha! 😄',
    'Vamos aprender juntos? 🌈',
    'Clique nas letras! 🎵',
    'Você é incrível! ⭐',
    'Aprender é divertido! 🚀',
    'Qual letra você quer? 🤔',
    'Parabéns! Continue assim! 🏆',
    'Hoje aprendo uma letra nova! 📚',
    'Sou o Letrinha, seu amigo! 🤝',
    'Vamos brincar com letras? 🎮'
  ]
};

/* ============================================================
   2. WEB AUDIO API – GERADOR DE SONS
   ============================================================ */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API não suportada:', e);
      return null;
    }
  }
  // Retomar contexto suspenso (política de autoplay)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Toca um som sintético baseado em tipo
 * @param {string} type - Tipo do som
 */
function playSound(type) {
  if (!CONFIG.soundEnabled) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  switch (type) {
    case 'click':
      playTone(ctx, now, 'sine', 440, 0.15, 0.1, 0.05);
      break;

    case 'pop':
      playPop(ctx, now);
      break;

    case 'letter':
      playLetterSound(ctx, now);
      break;

    case 'card':
      playCardSound(ctx, now);
      break;

    case 'success':
      playSuccessJingle(ctx, now);
      break;

    case 'hover':
      playTone(ctx, now, 'sine', 523, 0.08, 0.08, 0.04);
      break;

    case 'mascot':
      playMascotSound(ctx, now);
      break;

    case 'alphabet':
      playAlphabetSound(ctx, now);
      break;

    default:
      playTone(ctx, now, 'sine', 440, 0.1, 0.1, 0.05);
  }
}

/**
 * Toca um tom simples
 */
function playTone(ctx, startTime, waveType, freq, gain, duration, fadeTime) {
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(gain, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + fadeTime);
  } catch (e) {
    console.warn('Erro ao tocar tom:', e);
  }
}

/**
 * Som de "pop" divertido
 */
function playPop(ctx, startTime) {
  try {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, startTime + 0.15);

    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.25);
  } catch (e) {
    console.warn('Erro no som pop:', e);
  }
}

/**
 * Som ao clicar em uma letra
 */
function playLetterSound(ctx, startTime) {
  try {
    // Nota musical aleatória (escala pentatônica)
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, startTime);
    oscillator.frequency.setValueAtTime(freq * 1.5, startTime + 0.05);
    oscillator.frequency.exponentialRampToValueAtTime(freq, startTime + 0.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.35, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    oscillator.start(startTime);
    oscillator.stop(startTime + 0.5);
  } catch (e) {
    console.warn('Erro no som de letra:', e);
  }
}

/**
 * Som ao interagir com card
 */
function playCardSound(ctx, startTime) {
  try {
    const freqs = [523.25, 659.25, 783.99];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + i * 0.08);

      gain.gain.setValueAtTime(0, startTime + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.15, startTime + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + i * 0.08 + 0.2);

      osc.start(startTime + i * 0.08);
      osc.stop(startTime + i * 0.08 + 0.25);
    });
  } catch (e) {
    console.warn('Erro no som de card:', e);
  }
}

/**
 * Jingle de sucesso (formulário enviado)
 */
function playSuccessJingle(ctx, startTime) {
  try {
    const melody = [
      { freq: 523.25, time: 0,    dur: 0.15 },
      { freq: 659.25, time: 0.15, dur: 0.15 },
      { freq: 783.99, time: 0.30, dur: 0.15 },
      { freq: 1046.5, time: 0.45, dur: 0.35 },
      { freq: 783.99, time: 0.55, dur: 0.1  },
      { freq: 1046.5, time: 0.65, dur: 0.4  },
    ];

    melody.forEach(note => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, startTime + note.time);

      gain.gain.setValueAtTime(0, startTime + note.time);
      gain.gain.linearRampToValueAtTime(0.25, startTime + note.time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.time + note.dur);

      osc.start(startTime + note.time);
      osc.stop(startTime + note.time + note.dur + 0.05);
    });
  } catch (e) {
    console.warn('Erro no jingle de sucesso:', e);
  }
}

/**
 * Som do mascote
 */
function playMascotSound(ctx, startTime) {
  try {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(440, startTime);
    osc1.frequency.setValueAtTime(550, startTime + 0.1);
    osc1.frequency.setValueAtTime(660, startTime + 0.2);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, startTime);
    osc2.frequency.setValueAtTime(1100, startTime + 0.1);
    osc2.frequency.setValueAtTime(1320, startTime + 0.2);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    osc1.start(startTime);
    osc1.stop(startTime + 0.45);
    osc2.start(startTime);
    osc2.stop(startTime + 0.45);
  } catch (e) {
    console.warn('Erro no som do mascote:', e);
  }
}

/**
 * Som do alfabeto (mais musical)
 */
function playAlphabetSound(ctx, startTime) {
  try {
    // Acorde maior
    const chord = [261.63, 329.63, 392.00, 523.25];
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  } catch (e) {
    console.warn('Erro no som do alfabeto:', e);
  }
}

/* ============================================================
   3. SISTEMA DE TEMAS
   ============================================================ */
function initThemeSystem() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  const html = document.documentElement;

  // Carregar tema salvo
  const savedTheme = localStorage.getItem('letraland-theme') || 'light';
  applyTheme(savedTheme);

  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      applyTheme(theme);
      playSound('click');
    });
  });

  function applyTheme(theme) {
    CONFIG.currentTheme = theme;
    html.setAttribute('data-theme', theme);
    localStorage.setItem('letraland-theme', theme);

    // Atualizar botões ativos
    themeButtons.forEach(btn => {
      const isActive = btn.dataset.theme === theme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive.toString());
    });

    // Toast de confirmação
    const themeNames = {
      light: '☀️ Modo Claro ativado!',
      dark: '🌙 Modo Escuro ativado!',
      daltonism: '🎨 Modo Daltonismo ativado!'
    };
    showToast(themeNames[theme] || 'Tema alterado!');
  }
}

/* ============================================================
   4. CONTROLE DE SOM
   ============================================================ */
function initSoundControl() {
  const soundBtn = document.getElementById('btn-sound');
  if (!soundBtn) return;

  // Carregar preferência salva
  const savedSound = localStorage.getItem('letraland-sound');
  if (savedSound === 'off') {
    CONFIG.soundEnabled = false;
    soundBtn.classList.add('muted');
    soundBtn.querySelector('span').textContent = 'Sons: OFF';
    soundBtn.textContent = '🔇 ';
    soundBtn.innerHTML = '🔇 <span>Sons: OFF</span>';
  }

  soundBtn.addEventListener('click', () => {
    CONFIG.soundEnabled = !CONFIG.soundEnabled;
    localStorage.setItem('letraland-sound', CONFIG.soundEnabled ? 'on' : 'off');

    if (CONFIG.soundEnabled) {
      soundBtn.innerHTML = '🔊 <span>Sons: ON</span>';
      soundBtn.classList.remove('muted');
      playSound('pop');
      showToast('🔊 Sons ativados!');
    } else {
      soundBtn.innerHTML = '🔇 <span>Sons: OFF</span>';
      soundBtn.classList.add('muted');
      showToast('🔇 Sons desativados!');
    }
  });
}

/* ============================================================
   5. NAVEGAÇÃO – MENU HAMBURGUER
   ============================================================ */
function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    playSound('click');
  });

  // Fechar menu ao clicar em link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      playSound('click');

      // Atualizar link ativo
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !mainNav.contains(e.target)) {
      mainNav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Atualizar link ativo ao rolar
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => observer.observe(section));
}

/* ============================================================
   6. MASCOTE INTERATIVO
   ============================================================ */
function initMascot() {
  const mascot = document.getElementById('mascot');
  const speechBubble = document.getElementById('speech-bubble');
  if (!mascot || !speechBubble) return;

  let messageIndex = 0;
  let isAnimating = false;

  mascot.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    playSound('mascot');

    // Mudar mensagem
    messageIndex = (messageIndex + 1) % CONFIG.mascotMessages.length;
    speechBubble.textContent = CONFIG.mascotMessages[messageIndex];

    // Animação de wiggle
    mascot.style.animation = 'none';
    mascot.offsetHeight; // Reflow
    mascot.style.animation = 'mascotWiggle 0.5s ease-in-out';

    // Efeito de partículas
    createParticles(mascot);

    setTimeout(() => {
      mascot.style.animation = 'mascotBounce 3s ease-in-out infinite';
      isAnimating = false;
    }, 600);
  });

  // Mensagem inicial animada
  setTimeout(() => {
    speechBubble.textContent = CONFIG.mascotMessages[0];
  }, 1000);

  // Trocar mensagem automaticamente
  setInterval(() => {
    if (!isAnimating) {
      messageIndex = (messageIndex + 1) % CONFIG.mascotMessages.length;
      speechBubble.style.opacity = '0';
      setTimeout(() => {
        speechBubble.textContent = CONFIG.mascotMessages[messageIndex];
        speechBubble.style.opacity = '1';
      }, 200);
    }
  }, 5000);
}

/* ============================================================
   7. LETRAS FLUTUANTES NA NUVEM
   ============================================================ */
function initFloatingLetters() {
  const letters = document.querySelectorAll('.floating-letter');

  letters.forEach(letter => {
    letter.addEventListener('click', (e) => {
      e.stopPropagation();
      const letterChar = letter.dataset.letter;

      playSound('letter');

      // Animação de clique
      letter.style.animation = 'none';
      letter.offsetHeight;
      letter.style.animation = 'letterPlay 0.5s ease-out';

      // Criar efeito de explosão de estrelas
      createStarBurst(letter);

      // Toast com a letra
      showToast(`Letra ${letterChar}! 🎵`);

      setTimeout(() => {
        letter.style.animation = '';
      }, 600);
    });

    // Hover sound
    letter.addEventListener('mouseenter', () => {
      playSound('hover');
    });
  });
}

/* ============================================================
   8. MINI-JOGO DO ALFABETO
   ============================================================ */
function initAlphabetGame() {
  const grid = document.querySelector('.alphabet-grid');
  if (!grid) return;

  CONFIG.alphabet.forEach((letter, index) => {
    const btn = document.createElement('button');
    btn.className = 'alpha-btn';
    btn.textContent = letter;
    btn.setAttribute('aria-label', `Letra ${letter}`);
    btn.setAttribute('data-letter', letter);
    btn.style.backgroundColor = CONFIG.letterColors[index % CONFIG.letterColors.length];
    btn.style.animationDelay = `${index * 0.03}s`;

    btn.addEventListener('click', (e) => {
      handleAlphaClick(btn, letter, e);
    });

    btn.addEventListener('mouseenter', () => {
      playSound('hover');
    });

    // Adicionar efeito de ripple
    btn.addEventListener('click', createRipple);

    grid.appendChild(btn);
  });
}

function handleAlphaClick(btn, letter, e) {
  playSound('alphabet');

  // Animação da letra
  btn.classList.add('playing');
  setTimeout(() => btn.classList.remove('playing'), 600);

  // Criar partículas
  createStarBurst(btn);

  // Toast com a letra e uma palavra
  const words = {
    A: 'A de Abacaxi 🍍', B: 'B de Bola ⚽', C: 'C de Casa 🏠',
    D: 'D de Dado 🎲', E: 'E de Elefante 🐘', F: 'F de Flor 🌸',
    G: 'G de Gato 🐱', H: 'H de Hipopótamo 🦛', I: 'I de Iglu 🏔️',
    J: 'J de Jacaré 🐊', K: 'K de Kiwi 🥝', L: 'L de Leão 🦁',
    M: 'M de Macaco 🐒', N: 'N de Nuvem ☁️', O: 'O de Ovo 🥚',
    P: 'P de Pato 🦆', Q: 'Q de Queijo 🧀', R: 'R de Rato 🐭',
    S: 'S de Sol ☀️', T: 'T de Tigre 🐯', U: 'U de Uva 🍇',
    V: 'V de Vaca 🐄', W: 'W de Waffle 🧇', X: 'X de Xícara ☕',
    Y: 'Y de Iogurte 🥛', Z: 'Z de Zebra 🦓'
  };

  showToast(words[letter] || `Letra ${letter}! 🎵`);

  // Efeito ripple
  createRipple(e);
}

/* ============================================================
   9. CARDS DE SERVIÇOS
   ============================================================ */
function initServiceCards() {
  const cards = document.querySelectorAll('.service-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      playSound('card');
      createParticles(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playSound('card');
        createParticles(card);
      }
    });

    // Botões dentro dos cards
    const cardBtn = card.querySelector('.card-btn');
    if (cardBtn) {
      cardBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('pop');
        createRipple(e);

        // Animação do botão
        cardBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          cardBtn.style.transform = '';
        }, 150);
      });
    }
  });
}

/* ============================================================
   10. FORMULÁRIO DE CONTATO
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (!form) return;

  // Sons nos inputs
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => playSound('hover'));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm(form)) return;

    // Simular envio
    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Enviando...';

    setTimeout(() => {
      playSound('success');
      form.hidden = true;
      successMsg.hidden = false;
      createCelebration();
      showToast('🎉 Mensagem enviada com sucesso!');
    }, 1500);
  });
}

function validateForm(form) {
  const inputs = form.querySelectorAll('[required]');
  let isValid = true;

  inputs.forEach(input => {
    input.style.borderColor = '';

    if (!input.value.trim()) {
      input.style.borderColor = '#FF1493';
      input.style.boxShadow = '0 0 0 4px rgba(255, 20, 147, 0.2)';
      isValid = false;
      playSound('pop');
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      input.style.borderColor = '#FF1493';
      input.style.boxShadow = '0 0 0 4px rgba(255, 20, 147, 0.2)';
      isValid = false;
      showToast('📧 Digite um e-mail válido!');
      playSound('pop');
    }
  });

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   11. BOTÃO VOLTAR AO TOPO
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.hidden = window.scrollY < 400;
  }, { passive: true });

  btn.addEventListener('click', () => {
    playSound('pop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   12. SONS NOS LINKS DE NAVEGAÇÃO
   ============================================================ */
function initLinkSounds() {
  document.querySelectorAll('[data-sound]').forEach(el => {
    const soundType = el.dataset.sound;

    if (el.tagName === 'A' || el.tagName === 'BUTTON') {
      el.addEventListener('click', (e) => {
        if (soundType && soundType !== 'pop' && soundType !== 'success') {
          playSound(soundType);
        }
      });
    }
  });
}

/* ============================================================
   13. EFEITOS VISUAIS – PARTÍCULAS E RIPPLE
   ============================================================ */

/**
 * Cria efeito de ripple nos botões
 */
function createRipple(e) {
  const btn = e.currentTarget || e.target.closest('button, a');
  if (!btn) return;

  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';

  const size = Math.max(rect.width, rect.height);
  const x = (e.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
  const y = (e.clientY || rect.top + rect.height / 2) - rect.top - size / 2;

  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `;

  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

/**
 * Cria partículas de estrela ao redor de um elemento
 */
function createStarBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2 + window.scrollY;

  const emojis = ['⭐', '🌟', '✨', '💫', '🎵', '🎶', '🎉', '🌈'];
  const count = 6;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      left: ${centerX}px;
      top: ${centerY}px;
      font-size: ${Math.random() * 16 + 12}px;
      pointer-events: none;
      z-index: 9999;
      animation: particleFly 0.8s ease-out forwards;
      transform-origin: center;
    `;
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const angle = (i / count) * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 900);
  }
}

/**
 * Cria partículas genéricas ao redor de um elemento
 */
function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const colors = ['#FFB343', '#FF1493', '#00FFFF', '#F3DE2C', '#9B59B6'];

  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 6;

    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top + Math.random() * rect.height}px;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: particleFly 0.7s ease-out forwards;
    `;

    const dx = (Math.random() - 0.5) * 120;
    const dy = (Math.random() - 0.5) * 120;
    particle.style.setProperty('--dx', `${dx}px`);
    particle.style.setProperty('--dy', `${dy}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
  }
}

/**
 * Celebração ao enviar formulário
 */
function createCelebration() {
  const emojis = ['🎉', '🎊', '⭐', '🌟', '🎈', '🎁', '🏆', '🌈'];
  const count = 20;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      particle.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -50px;
        font-size: ${Math.random() * 20 + 16}px;
        pointer-events: none;
        z-index: 9999;
        animation: confettiFall ${Math.random() * 2 + 1.5}s ease-in forwards;
      `;
      particle.textContent = emoji;

      document.body.appendChild(particle);
      setTimeout(() => particle.remove(), 4000);
    }, i * 100);
  }
}

/* ============================================================
   14. INJETAR KEYFRAMES DINÂMICOS
   ============================================================ */
function injectDynamicStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFly {
      0% {
        opacity: 1;
        transform: translate(0, 0) scale(1) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translate(var(--dx, 60px), var(--dy, -60px)) scale(0) rotate(360deg);
      }
    }

    @keyframes confettiFall {
      0% {
        opacity: 1;
        transform: translateY(0) rotate(0deg);
      }
      100% {
        opacity: 0;
        transform: translateY(110vh) rotate(${Math.random() * 720}deg);
      }
    }

    @keyframes letterPlay {
      0% { transform: scale(1); }
      30% { transform: scale(1.3) rotate(-5deg); }
      60% { transform: scale(1.2) rotate(5deg); }
      100% { transform: scale(1) rotate(0deg); }
    }

    @keyframes mascotWiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-8deg) scale(1.05); }
      75% { transform: rotate(8deg) scale(1.05); }
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   15. TOAST NOTIFICATIONS
   ============================================================ */
let toastTimeout = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ============================================================
   16. SCROLL SUAVE PARA LINKS ÂNCORA
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const accessBarHeight = document.querySelector('.accessibility-bar')?.offsetHeight || 0;
        const offset = headerHeight + accessBarHeight + 16;

        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   17. ANIMAÇÕES DE ENTRADA (INTERSECTION OBSERVER)
   ============================================================ */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar cards e seções
  document.querySelectorAll('.service-card, .alphabet-game, .support-inner').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.97)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
  });
}

/* ============================================================
   18. EFEITO DE DIGITAÇÃO NO HERO
   ============================================================ */
function initTypingEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const text = subtitle.textContent;
  subtitle.textContent = '';
  subtitle.style.borderRight = '3px solid var(--color-primary)';

  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      subtitle.textContent += text[i];
      i++;
    } else {
      clearInterval(typeInterval);
      subtitle.style.borderRight = 'none';
    }
  }, 50);
}

/* ============================================================
   19. EFEITO PARALLAX NAS NUVENS (SCROLL)
   ============================================================ */
function initParallax() {
  const clouds = document.querySelectorAll('.cloud');
  const stars = document.querySelectorAll('.star');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    clouds.forEach((cloud, i) => {
      const speed = 0.1 + (i * 0.05);
      cloud.style.transform = `translateY(${scrollY * speed}px)`;
    });

    stars.forEach((star, i) => {
      const speed = 0.05 + (i * 0.03);
      star.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });
}

/* ============================================================
   20. INICIALIZAÇÃO PRINCIPAL
   ============================================================ */
function init() {
  // Injetar estilos dinâmicos
  injectDynamicStyles();

  // Inicializar módulos
  initThemeSystem();
  initSoundControl();
  initNavigation();
  initMascot();
  initFloatingLetters();
  initAlphabetGame();
  initServiceCards();
  initContactForm();
  initBackToTop();
  initLinkSounds();
  initSmoothScroll();
  initScrollAnimations();
  initParallax();

  // Efeito de digitação após um delay
  setTimeout(initTypingEffect, 800);

  // Ativar contexto de áudio no primeiro toque (mobile)
  document.addEventListener('touchstart', () => {
    getAudioContext();
  }, { once: true, passive: true });

  // Ativar contexto de áudio no primeiro clique
  document.addEventListener('click', () => {
    getAudioContext();
  }, { once: true });

  console.log('🌈 LetraLand carregado com sucesso!');
}

// Iniciar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
