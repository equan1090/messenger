import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SplashPage from './Component/SplashPage/splashpage';
import 'bootstrap/dist/css/bootstrap.css';
import SignupPage from './Component/Signup/signup';
import Navbar from './Component/Navbar/navbar';
import MainPage from './Component/MainPage/mainpage';
//Change
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* <Route path="/t" element={<Navbar />} /> */}
            <Route path="/t" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
