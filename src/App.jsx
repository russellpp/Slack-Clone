import HomePage from "./pages/HomePage";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/Home/Login" />} />
        <Route path="/Home" element={<Navigate to="/Home/Login" />} />
        <Route path="/Home/*" element={<HomePage />} />
        <Route path="/Dashboard/*" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
   
  );
}

export default App;
