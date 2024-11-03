import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { KidsMainPage } from './pages/MainPage';
import { SignUp } from './pages/Signup';
import { Encyclopedia } from './pages/Encyclopedia';
import { NicknameTitle } from './pages/nickname-title';
import { Btn } from './pages/btn';
import Menu from './pages/Menu/Menu';
import Login from './pages/login';
import { NicknameEdit } from './pages/profile/nickname-edit';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<KidsMainPage />} />
          <Route path="/btn" element={<Btn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/nickname/title" element={<NicknameTitle />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/nickname/edit" element={<NicknameEdit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
