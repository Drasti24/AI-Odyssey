import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlgorithmPage from "./pages/AlgorithmPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm/:id" element={<AlgorithmPage />} />
      </Routes>
    </BrowserRouter>
  );
}