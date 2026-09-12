/**
 * Interactive Neural Nodes & Synaptic Canvas
 * Sivakorn Khundilokrattaya Portfolio
 * High-performance synaptic particle network responding to cursor interaction
 */

(function () {
  'use strict';

  function createNeuralCanvas(canvasId, customConfig = {}) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let particles = [];
    let streamLines = [];
    let mouse = {
      x: null,
      y: null,
      radius: customConfig.mouseDistance || 170,
      active: false
    };

    // Configuration (Subtle Non-Distracting Aesthetic Accent)
    const CONFIG = {
      particleDensity: customConfig.particleDensity || 32,
      streamCount: customConfig.streamCount !== undefined ? customConfig.streamCount : 3,
      maxDistance: customConfig.maxDistance || 120,
      mouseDistance: customConfig.mouseDistance || 150,
      speed: customConfig.speed || 0.22,
      darkColors: ['#38bdf8', '#6366f1', '#818cf8', '#34d399', '#94a3b8'],
      lightColors: ['#0284c7', '#4f46e5', '#0369a1', '#059669', '#1e293b'],
      ...customConfig
    };

    class StreamLine {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.35;
        this.speed = 0.6 + Math.random() * 0.7;
        this.length = 80 + Math.random() * 110;
        this.opacity = 0.06 + Math.random() * 0.12;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x > width + 100 || this.y < -100 || this.y > height + 100) {
          this.x = -60;
          this.y = Math.random() * height;
        }
      }

      draw() {
        const isLight = document.documentElement.classList.contains('light');
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length
        );
        ctx.strokeStyle = isLight 
          ? `rgba(2, 132, 199, ${this.opacity * 0.8})` 
          : `rgba(56, 189, 248, ${this.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

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
        this.colorIndex = Math.floor(Math.random() * CONFIG.darkColors.length);
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.pulseVal = Math.random() * Math.PI;
        this.isMajorNode = Math.random() < 0.22; // 22% major clusters
        if (this.isMajorNode) {
          this.radius += 1.6;
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
            const force = (1 - dist / mouse.radius) * 0.09;
            this.x += dx * force;
            this.y += dy * force;
          }
        }
      }

      draw() {
        const isLight = document.documentElement.classList.contains('light');
        const palette = isLight ? CONFIG.lightColors : CONFIG.darkColors;
        const color = palette[this.colorIndex];

        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.5, this.radius), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (this.isMajorNode) {
          // Glowing halo for major synaptic nodes
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = isLight 
            ? 'rgba(2, 132, 199, 0.12)' 
            : 'rgba(56, 189, 248, 0.18)';
          ctx.fill();
        }
      }
    }

    function initDimensions() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || canvas.parentElement.clientWidth || window.innerWidth;
      height = rect.height || canvas.parentElement.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      const targetCount = width < 768 ? 26 : Math.min(60, Math.floor(width / CONFIG.particleDensity));
      particles = [];
      for (let i = 0; i < targetCount; i++) {
        particles.push(new Particle());
      }

      streamLines = [];
      for (let i = 0; i < CONFIG.streamCount; i++) {
        streamLines.push(new StreamLine());
      }
    }

    function drawConnections() {
      const isLight = document.documentElement.classList.contains('light');
      const linePrefix = isLight ? 'rgba(2, 132, 199, ' : 'rgba(56, 189, 248, ';
      const cursorLinePrefix = isLight ? 'rgba(5, 150, 105, ' : 'rgba(52, 211, 153, ';
      const len = particles.length;

      for (let i = 0; i < len; i++) {
        const p1 = particles[i];

        // Connect to neighboring synaptic nodes
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.maxDistance) {
            const alpha = (1 - dist / CONFIG.maxDistance) * (isLight ? 0.22 : 0.28);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = linePrefix + alpha + ')';
            ctx.lineWidth = 0.9;
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
            ctx.strokeStyle = cursorLinePrefix + alpha + ')';
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      // Cursor core indicator
      if (mouse.active && mouse.x !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = isLight ? '#0284c7' : '#38bdf8';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 9, 0, Math.PI * 2);
        ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.5)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < streamLines.length; i++) {
        streamLines[i].update();
        streamLines[i].draw();
      }

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      drawConnections();

      requestAnimationFrame(animate);
    }

    // Event Listeners
    window.addEventListener('resize', initDimensions);

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
  }

  // Initialize both Hero and Footer canvas instances
  createNeuralCanvas('neural-canvas', { particleDensity: 22, streamCount: 8 });
  createNeuralCanvas('footer-neural-canvas', { particleDensity: 24, streamCount: 6 });
})();

