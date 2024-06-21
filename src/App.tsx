import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import Hero from "./components/Hero";
import Popular from "./components/Popular";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white w-full min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <Popular />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
