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

// ScrollToTop component to ensure proper scroll behavior
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    // Force scroll to top with multiple methods
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try scrolling the main element if it exists
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  // Ensure proper scroll behavior on app load
  React.useEffect(() => {
    window.scrollTo(0, 0);
    
    // Wait for fonts to load
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('400 1em Playfair Display'),
        document.fonts.load('400 1em Inter'),
        document.fonts.load('700 1em Playfair Display'),
        document.fonts.load('700 1em Inter')
      ]).then(() => {
        setIsLoading(false);
      }).catch(() => {
        // Fallback if font loading fails
        setTimeout(() => setIsLoading(false), 500);
      });
    } else {
      // Fallback for browsers that don't support font loading API
      setTimeout(() => setIsLoading(false), 500);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 font-medium">Loading Cafe Pronto...</p>
        </div>
      </div>
    );
  }

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