import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to Top"
      title="Back to Top"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "58px",
        height: "58px",
        borderRadius: "50%",
        border: "none",
        outline: "none",
        backgroundColor: isHovered ? "#eab308" : "#facc15",
        color: "#ffffff",
        cursor: "pointer",
        boxShadow: isHovered
          ? "0 10px 25px rgba(0,0,0,0.28)"
          : "0 8px 20px rgba(0,0,0,0.2)",
        display: showButton ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
        transition: "all 0.3s ease",
        zIndex: 1000,
      }}
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default BackToTopButton;