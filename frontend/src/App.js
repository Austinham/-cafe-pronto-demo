import React from "react";
import "./App.css";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Catering from "./pages/Catering";
import About from "./pages/About";
import { Toaster } from "./components/ui/sonner";
import "./index.css";

// Import Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// ScrollToTop component to ensure proper scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    
    // Also use a timeout as backup to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Additional effect to handle any remaining scroll issues
  React.useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return null;
}

function App() {
  // Ensure proper scroll behavior on app load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <HashRouter>
        <ScrollToTop />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/catering" element={<Catering />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </HashRouter>
    </div>
  );
}

export default App;