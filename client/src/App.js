import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './Component/registrationForm';
import Login from './Component/loginPage';
import Display from './Component/display';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<RegisterForm/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/display" element={<Display/>} />
      </Routes>
    </div>
  );
}

export default App;
