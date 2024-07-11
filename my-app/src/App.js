// import React from 'react';
// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import LandingPage from './pages/LandingPage';
// import RegistrationPage from './pages/RegistrationPage';
// import LoginPage from './pages/LoginPage';
// import SearchPage from './pages/SearchPage';

// function App() {
//     return (
//         <div className="App">
//             <div className="container">
//                 <h1 className="page-header text-center">Login or Register</h1>
//                 <BrowserRouter>
//                     <Routes>
//                         <Route path="/" element={<LandingPage />} />
//                         <Route path="/registration" element={<RegistrationPage />} />
//                         <Route path="/login" element={<LoginPage />} />
//                          <Route path="/search" element={<SearchPage />} />
//                     </Routes>
//                 </BrowserRouter>
//             </div>
//         </div>
//     );
// }

// export default App;

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1 className="page-header text-center">Login or Register</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/searchFlights" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
