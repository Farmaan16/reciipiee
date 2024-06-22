import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pages from "./pages/Pages";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-white w-full min-h-screen flex flex-col">
        <Navbar />

        <Pages />
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
