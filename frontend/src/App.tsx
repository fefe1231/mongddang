import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Signup';
import { Encyclopedia } from './pages/Encyclopedia';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
