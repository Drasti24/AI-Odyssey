import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlgorithmPage from "./pages/AlgorithmPage";
import SplashScreen from "./components/SplashScreen";

// Algorithm Pages
import LinearRegression from "./pages/algorithms/LinearRegression";
import NeuralNetwork from "./pages/algorithms/NeuralNetwork";
import KMeans from "./pages/algorithms/KMeans";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Specific Algorithm Routes */}
          <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
          <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
          <Route path="/algorithms/kmeans" element={<KMeans />} />
          {/* Fallback/Dynamic Route */}
          <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}