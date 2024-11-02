import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Signup';
import { Encyclopedia } from './pages/Encyclopedia';
import { NicknameTitle } from './pages/nickname-title';
import { Btn } from './pages/btn';
import Login from './pages/login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/btn" element={<Btn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/nickname/title" element={<NicknameTitle />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
