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
    // Scroll to top immediately when route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also ensure scroll happens after any async rendering
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    // Reinitialize scroll animations after route change
    setTimeout(() => {
      scrollAnimations.observeNewElements();
    }, 100);
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
