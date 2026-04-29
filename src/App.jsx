import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlgorithmPage from "./pages/AlgorithmPage";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}