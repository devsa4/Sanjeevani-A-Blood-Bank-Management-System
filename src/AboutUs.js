import React, { useEffect, useRef } from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";

function AboutUs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const particleCount = 100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }
      update(mouse) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Interaction with mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => { mouse = { x: e.clientX, y: e.clientY }; };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update(mouse);
        p.draw();
        
        // Draw connections (The "Veins")
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 0, 0, ${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="story-container">
      {/* 1. Interactive Canvas Layer */}
      <canvas ref={canvasRef} className="interactive-bg-canvas" />

      {/* 2. The Veiny Animation Layer (Optional overlay) */}
      <div className="vein-overlay"></div>

      <nav className="story-nav">
        <Link to="/" className="story-back-link">← Back Home</Link>
      </nav>
      
      <main className="story-body">
        <h1 className="story-title">About Sanjeevani</h1>
        <p className="story-text">
          Sanjeevani (संजीवनी) was forged in the gap between technology and human survival
          Sanjeevani is a next-generation Blood Bank Management System (BBMS) engineered to transform the traditional, fragmented approach to blood donation into a high-precision, real-time vascular network. At its core, Sanjeevani functions as a digital nervous system that synchronizes the complex interactions between donors, blood banks, and healthcare providers. By moving away from manual ledgers and isolated databases, Sanjeevani addresses the critical "Software Crisis" in healthcare, eliminating time slippage and intractable data errors that often delay life-saving transfusions. The system manages the entire lifecycle of a blood unit—from the initial donor eligibility screening and physiological tracking to advanced inventory analytics and emergency dispatch logistics. In this ecosystem, blood is not just a commodity but a digitized resource, tracked with absolute transparency to ensure that the "river of life" is navigated with maximum efficiency, zero wastage, and an unwavering pulse of hope.
        </p>
      </main>
    </div>
  );
}

export default AboutUs;