import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Signup';
import { Encyclopedia } from './pages/Encyclopedia';
import { NicknameTitle } from './pages/nickname-title';
import { Btn } from './pages/btn';
import { NicknameEdit } from './pages/profile/nickname-edit';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/btn" element={<Btn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/nickname/title" element={<NicknameTitle />} />
          <Route path="/nickname/edit" element={<NicknameEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
