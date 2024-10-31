import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { DataForm } from './pages/Signup/DataForm';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup2" element={<DataForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
