import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { KidsMainPage } from './pages/MainPage';
import { SignUp } from './pages/Signup';
import { Encyclopedia } from './pages/Encyclopedia';
import { NicknameTitle } from './pages/nickname-title';
import { Btn } from './pages/btn';
import Menu from './pages/Menu/Menu';
import Login from './pages/login';
import { NicknameEdit } from './pages/profile/nickname-edit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Profile } from './pages/profile';
import { Report } from './pages/report';

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<KidsMainPage />} />
          <Route path="/btn" element={<Btn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/nickname/title" element={<NicknameTitle />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nickname/edit" element={<NicknameEdit />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
