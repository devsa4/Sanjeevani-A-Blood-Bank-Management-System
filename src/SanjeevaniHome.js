import React, { useState, useEffect } from "react";
import "./SanjeevaniHome.css";
import { Link } from "react-router-dom";

function SanjeevaniHome() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Smooth scroll function
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="App" style={{ "--x": `${mouse.x}px`, "--y": `${mouse.y}px` }}>
      <nav className="top-nav">
        <Link to="/about" className="nav-link">About Us</Link>
      </nav>

      <video autoPlay loop muted playsInline className="background-video">
        <source src="/rbc_background.mp4" type="video/mp4" />
      </video>

      <div className="vignette-layer"></div>

      <div className="App-header">
        <h1 className="title spotlight-red">
          <svg className="sanjeevani-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12H5L8 3L11 21L14 12H17L19 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sanjeevani
        </h1>
        
        <div className="info-block">
          <div className="subtitle-wrapper">
            <h2 className="subtitle spotlight-white">संजीवनी</h2>
          </div>
          <p className="tagline">A drop of hope, a river of life</p>
        </div>

        {/* Updated clickable section */}
        <div className="scroll-prompt clickable-cta" onClick={scrollDown} style={{ cursor: 'pointer' }}>
          <p>Click Here to donate</p>
          <div className="pulse-icon-wrapper">
            <svg className="blood-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 7 9 7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 9 12 2 12 2Z" fill="currentColor"/>
            </svg>
            <div className="pulse-ring"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SanjeevaniHome;