import React from "react";
import { Routes, Route } from "react-router-dom";
import SanjeevaniHome from "./SanjeevaniHome";
import AboutUs from "./AboutUs";

function App() {
  return (
    <div className="App-Wrapper">
      <Routes>
        {/* When URL is /, ONLY show Home */}
        <Route path="/" element={<SanjeevaniHome />} />
        
        {/* When URL is /about, ONLY show About Us */}
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;