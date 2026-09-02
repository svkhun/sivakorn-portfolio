/**
 * Interactive Neural Nodes & Synaptic Canvas
 * Sivakorn Khundilokrattaya Portfolio
 * High-performance particle network responding to cursor interaction
 */

(function () {
  'use strict';

  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let mouse = {
    x: null,
    y: null,
    radius: 160,
    active: false
  };

  // Configuration
  const CONFIG = {
    particleCount: 55, // Responsive count
    maxDistance: 130,
    mouseDistance: 160,
    speed: 0.4,
    nodeColors: ['#00d2d3', '#58a6ff', '#3fb950', '#ffffff'],
    lineColor: 'rgba(0, 210, 211, ',
    cursorLineColor: 'rgba(88, 166, 255, '
  };

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.vx = (Math.random() - 0.5) * CONFIG.speed * 1.5;
      this.vy = (Math.random() - 0.5) * CONFIG.speed * 1.5;
      this.radius = Math.random() * 2.2 + 1.2;
      this.baseRadius = this.radius;
      this.color = CONFIG.nodeColors[Math.floor(Math.random() * CONFIG.nodeColors.length)];
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
      this.pulseVal = Math.random() * Math.PI;
      this.isMajorNode = Math.random() < 0.2; // 20% nodes are larger clusters
      if (this.isMajorNode) {
        this.radius += 1.5;
        this.baseRadius = this.radius;
      }
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Pulse size
      this.pulseVal += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulseVal) * 0.6;

      // Bounce boundaries
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.08;
          // Gentle attraction & swirl
          this.x += dx * force;
          this.y += dy * force;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      if (this.isMajorNode) {
        // Glowing halo for major nodes
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color === '#00d2d3' ? 'rgba(0, 210, 211, 0.15)' : 'rgba(88, 166, 255, 0.15)';
        ctx.fill();
      }
    }
  }

  function initDimensions() {
    dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    height = rect.height || window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Dynamic count according to screen width
    const targetCount = width < 768 ? 32 : Math.min(75, Math.floor(width / 22));
    particles = [];
    for (let i = 0; i < targetCount; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const p1 = particles[i];

      // Connect to other particles
      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          const alpha = (1 - dist / CONFIG.maxDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = CONFIG.lineColor + alpha + ')';
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.mouseDistance) {
          const alpha = (1 - dist / CONFIG.mouseDistance) * 0.55;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = CONFIG.cursorLineColor + alpha + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }
    }

    // Cursor core indicator
    if (mouse.active && mouse.x !== null) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#00d2d3';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 8, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 210, 211, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  let animationFrameId;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    drawConnections();

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    initDimensions();
  });

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    } else {
      mouse.active = false;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Touch support for mobile devices
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  }, { passive: true });

  canvas.addEventListener('touchend', () => {
    mouse.active = false;
  });

  // Initialize
  initDimensions();
  animate();
})();
