import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import { Footer } from "../components/footer";
import AnimatedCursor  from "../hooks/AnimatedCursor";
import "./App.css";
import "../scrollAnimations.css";
import scrollAnimations from "../scrollAnimation.js";

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    const html = document.documentElement;
    
    // Add class to disable smooth scrolling
    html.classList.add('scroll-instant');
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Scroll again after a brief moment to ensure it takes effect
    const scrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);

    // Scroll once more after transition and restore smooth scrolling
    const transitionTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      // Remove class to restore smooth scrolling
      html.classList.remove('scroll-instant');
      // Reinitialize scroll animations after route change
      scrollAnimations.observeNewElements();
    }, 450);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(transitionTimer);
      html.classList.remove('scroll-instant');
    };
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
        <Footer />
      </ScrollToTop>
    </Router>
  );
}
