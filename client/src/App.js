import { Routes, Route } from "react-router-dom";

import './App.css';
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Header from "./components/header/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
        <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
        />
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/auth" element={<Login />} />
                <Route path="/register" element={<Signup />} />
            </Routes>
    </div>
  );
}

export default App;
