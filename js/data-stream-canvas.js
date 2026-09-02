/**
 * Subtle Data Ingestion Stream Background Canvas
 * Sivakorn Khundilokrattaya - Calm Tech Portfolio
 * Low-eyestrain dynamic vector stream responding gently to cursor interaction
 */

(function () {
  'use strict';

  const canvas = document.getElementById('data-stream-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, dpr;
  let particles = [];
  let streamLines = [];
  let mouse = {
    x: null,
    y: null,
    radius: 150,
    active: false
  };

  const CONFIG = {
    particleCount: 42,
    streamCount: 10,
    colors: ['#38bdf8', '#34d399', '#7dd3fc', '#94a3b8'],
    lineColor: 'rgba(56, 189, 248, ',
    sageLineColor: 'rgba(52, 211, 153, '
  };

  class StreamLine {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3;
      this.speed = 0.5 + Math.random() * 0.6;
      this.length = 70 + Math.random() * 90;
      this.opacity = 0.05 + Math.random() * 0.1;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;

      if (this.x > width + 80 || this.y < -80 || this.y > height + 80) {
        this.x = -40;
        this.y = Math.random() * height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  class DataPacket {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.vx = (Math.random() - 0.5) * 0.4 + 0.2;
      this.vy = -(0.35 + Math.random() * 0.45);
      this.radius = Math.random() * 1.8 + 1.0;
      this.baseRadius = this.radius;
      this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.pulseSpeed = 0.015 + Math.random() * 0.02;
      this.pulse = Math.random() * Math.PI;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      this.pulse += this.pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulse) * 0.4;

      if (this.y < -20) this.y = height + 20;
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;

      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.06;
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

    const count = width < 768 ? 22 : Math.min(50, Math.floor(width / 28));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(new DataPacket());
    }

    streamLines = [];
    for (let i = 0; i < CONFIG.streamCount; i++) {
      streamLines.push(new StreamLine());
    }
  }

  function drawConnections() {
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < len; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.16;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = CONFIG.lineColor + alpha + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const alpha = (1 - dist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = CONFIG.sageLineColor + alpha + ')';
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }

    if (mouse.active && mouse.x !== null) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
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

  initDimensions();
  animate();
})();
