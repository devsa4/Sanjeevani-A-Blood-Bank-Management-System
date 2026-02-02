import React, { useState, useEffect, useRef } from "react";
import "./SanjeevaniHome.css";
import { Link } from "react-router-dom";

function SanjeevaniHome() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const pipVideoRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      // Trigger full screen video after 100px scroll
      if (window.scrollY > 100) {
        setIsScrolled(true);
        // Force play when scrolled to ensure no black screen
        if (pipVideoRef.current) pipVideoRef.current.play();
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

      {/* Background Video 1: RBC */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/rbc_background.mp4" type="video/mp4" />
      </video>

      {/* Full Screen PiP Overlay: Infection */}
      <div className={`pip-box ${isScrolled ? "active" : ""}`}>
        <video 
          ref={pipVideoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="pip-video"
        >
          <source src="/bloodsample.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="App-header">
        <h1 className="title spotlight-red">
          <svg className="sanjeevani-icon" viewBox="0 0 24 24" fill="none">
            <path d="M2 12H5L8 3L11 21L14 12H17L19 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sanjeevani
        </h1>
        
        <div className="info-block">
          <div className="subtitle-wrapper">
            <h2 className="subtitle spotlight-white"><i><b>संजीवनी</b></i></h2>
          </div>
          <p className="tagline">A drop of hope, a river of life</p>
        </div>

        <div className="scroll-prompt clickable-cta" onClick={scrollDown}>
          <p>Click Here to donate</p>
          <div className="pulse-icon-wrapper">
            <svg className="blood-icon" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 7 9 7 13C7 15.7614 9.23858 18 12 18C14.7614 18 17 15.7614 17 13C17 9 12 2 12 2Z" fill="currentColor"/>
            </svg>
            <div className="pulse-ring"></div>
          </div>
        </div>
      </div>
      
      {/* Scrollable Area */}
      <div style={{ height: '100vh' }}></div>
    </div>
  );
}

export default SanjeevaniHome;