import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white w-full min-h-screen flex flex-col">
        <Navbar />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
