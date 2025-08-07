// 📄 src/App.jsx — Corregido con lazy loading, rutas dinámicas y componentes persistentes

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GlobalStyles from "@/styles/globalStyles";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Cursor from "@/data/components/cursor";
import Loader from "@/components/ui/Loader";

const Home = lazy(() => import("@/pages/home"));
const Melaminas = lazy(() => import("@/pages/melaminas"));
const Revestimientos = lazy(() => import("@/pages/revestimientos"));
const Vinilos = lazy(() => import("@/pages/vinilos"));
const Herrajes = lazy(() => import("@/pages/herrajes"));
const Simulador = lazy(() => import("@/pages/simulador"));
const Contactos = lazy(() => import("@/pages/contactos"));
const Muebles = lazy(() => import("@/pages/muebles"));
const Cookies = lazy(() => import("@/components/policies/Cookies"));
const Privacidad = lazy(() => import("@/components/policies/Privacidad"));
const Terminos = lazy(() => import("@/components/policies/Terminos"));
const ProductoCategoria = lazy(() => import("@/pages/ProductoCategoria"));
import ScrollToTop from "@/components/layout/ScrollToTop";

const App = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Cursor />
      <Router>
         <ScrollToTop />
        <Header />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/melaminas" element={<Melaminas />} />
            <Route path="/herrajes" element={<Herrajes />} />
            <Route path="/revestimientos" element={<Revestimientos />} />
            <Route path="/muebles" element={<Muebles />} />
            <Route path="/vinilos" element={<Vinilos />} />

            <Route path="/simulador" element={<Simulador />} />
            <Route path="/contactos" element={<Contactos />} />

            <Route path="/cookies" element={<Cookies />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/privacidad" element={<Privacidad />} />

            {/* 🔄 Producto por ruta clásica (por ejemplo: /melaminas/roble-amargo) */}
            <Route path="/:categoria/:producto" element={<ProductoCategoria />} />

            {/* ✅ Nueva ruta para productos con path profundo (Slider) */}
            <Route path="/products/*" element={<ProductoCategoria />} />

            {/* ❌ Página no encontrada */}
            <Route path="*" element={<div style={{ padding: '2rem' }}>Página no encontrada</div>} />
          </Routes>
        </Suspense>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
