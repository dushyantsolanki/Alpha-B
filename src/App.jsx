import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Route from "./routes/Route";

function App() {
  return (
    <>
      <ToastContainer />
      <Route />
    </>
  );
}
export default App;
