import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Slider = ({ title, data, categoria }) => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_PUBLIC_BASE || "http://localhost:4000";


  useEffect(() => {
    const checkScroll = () => {
      if (!containerRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      checkScroll();
    };

    checkScroll();
    containerRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      containerRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  const scrollBy = (offset) => {
    containerRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

const handleClick = (item) => {
  console.log("👉 Click en item:", item); // <- Esto debería dispararse sí o sí

  if (!Array.isArray(item.pathArray) || item.pathArray.length === 0) {
    console.warn("⚠️ Producto sin pathArray válido:", item);
    return;
  }

  const path = item.pathArray.map(encodeURIComponent).join("/");
  console.log("🔗 Navegando a:", `/products/${path}`);
  navigate(`/products/${path}`);
};


  return (
    <div style={styles.container}>
      <div style={styles.sliderWrapper}>
        {!isMobile && (
          <button
            onClick={() => scrollBy(-300)}
            style={{ ...styles.navButton, left: 0 }}
            disabled={!canScrollLeft}
          >
            <ChevronLeft size={16} />
          </button>
        )}

        <div ref={containerRef} style={styles.slider}>
          {data.map((item) => {
            const imagen = Array.isArray(item.imagenes)
              ? item.imagenes[0]
              : item.imagen || "placeholder.jpg";

            const imageSrc = imagen.startsWith("http")
              ? imagen
              : `${BASE_URL}/products/${imagen}`;

            return (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={styles.card} className="slider-card">
                  <img src={imageSrc} alt={item.nombre} style={styles.image} />
                  <p style={styles.name}>{item.nombre}</p>
                </div>
              </div>
            );
          })}
        </div>

        {!isMobile && (
          <button
            onClick={() => scrollBy(300)}
            style={{ ...styles.navButton, right: 0 }}
            disabled={!canScrollRight}
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      <style>{`
        .slider-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .slider-card:hover {
          transform: scale(1.05);
        }
        .slider-card::before {
          content: '';
          position: absolute;
          left: -75%;
          top: 0;
          width: 50%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transform: skewX(-20deg);
          transition: left 0.4s ease;
        }
        .slider-card:hover::before {
          left: 125%;
        }

        div[style*="overflow-x: auto"] {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        div[style*="overflow-x: auto"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    position: "relative",
    background: "transparent",
  },
  sliderWrapper: {
    position: "relative",
  },
  slider: {
    display: "flex",
    overflowX: "auto",
    overflowY: "hidden",
    gap: "0.6rem",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    WebkitOverflowScrolling: "touch",
    scrollSnapType: "x mandatory",
    padding: "0.25rem 0",
  },
  card: {
    minWidth: "90px",
    flex: "0 0 auto",
    scrollSnapAlign: "start",
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "0.3rem",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "50px",
    objectFit: "cover",
    marginBottom: "0.25rem",
  },
  name: {
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    width: "26px",
    height: "26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: 10,
    opacity: 0.85,
  },
};

export default Slider;


