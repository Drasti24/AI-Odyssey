import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlgorithmPage from "./pages/AlgorithmPage";
import SplashScreen from "./components/SplashScreen";

// Algorithm Pages
import KNN from "./pages/algorithms/KNN";
import LinearRegression from "./pages/algorithms/LinearRegression";
import NeuralNetwork from "./pages/algorithms/NeuralNetwork";
import KMeans from "./pages/algorithms/KMeans";
import DecisionTree from "./pages/algorithms/DecisionTree";
import LogisticRegression from "./pages/algorithms/LogisticRegression";
import RandomForest from "./pages/algorithms/RandomForest";
import Playground from "./pages/Playground";

export default function App() {
  const [splashDone, setSplashDone] = useState(false);
  const handleSplashFinish = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && <SplashScreen onFinish={handleSplashFinish} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/algorithms/knn" element={<KNN />} />
          <Route path="/algorithms/linear-regression" element={<LinearRegression />} />
          <Route path="/algorithms/neural-network" element={<NeuralNetwork />} />
          <Route path="/algorithms/kmeans" element={<KMeans />} />
          <Route path="/algorithms/decision-tree" element={<DecisionTree />} />
          <Route path="/algorithms/logistic-regression" element={<LogisticRegression />} />
          <Route path="/algorithms/random-forest" element={<RandomForest />} />
          <Route path="/algorithm/:id" element={<AlgorithmPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}