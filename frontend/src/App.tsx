import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { KidsMainPage } from './pages/MainPage';
import { NicknameTitle } from './pages/nickname-title';
import { Btn } from './pages/btn';
import Menu from './pages/Menu/Menu';
import Login from './pages/login';
import { NicknameEdit } from './pages/profile/ui/nickname-edit';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Profile } from './pages/profile';
import { Report } from './pages/report';
import { RecordPage } from './pages/record';
import { Encyclopedia } from './pages/Encyclopedia';
import { SignUp } from './pages/Signup';
import ProtectorMain from './pages/protectormain/ProtectorMain';
import { useLoadState } from './app/hooks/use-load-state';
import { InviteCode } from './pages/Signup/invite-code';
import { GmiDetail } from './pages/report/ui/detail/gmi';
import { Variability } from './pages/report/ui/detail/variability';
import { Mean } from './pages/report/ui/detail/mean';
import { Tir } from './pages/report/ui/detail/tir/indesx';
import { DayRecordPage } from './pages/day-record';
import { useEffect } from 'react';
import { SocialLogin } from '@capgo/capacitor-social-login';
import { PushNotifications } from '@capacitor/push-notifications';
import { usePushNotificationStore } from './shared/model/usePushNotificationStore';
import { PushNotification } from './shared/ui/PushNotification/PushNotification';

function App() {
  useLoadState();
  const { setPushNotification } = usePushNotificationStore();
  useEffect(() => {
    SocialLogin.initialize({
      google: {
        webClientId: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID,
      },
    });

    // 푸시 알림 받기
    const initializePushListener = () => {
      PushNotifications.removeAllListeners();
      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification) => {
          setPushNotification(notification);
        }
      );
    };
    initializePushListener();
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <PushNotification />
      <Router>
        <Routes>
          <Route path="/main" element={<KidsMainPage />} />
          <Route path="/btn" element={<Btn />} />
          <Route path="/" element={<Login />} />
          <Route path="/invitecode" element={<InviteCode />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/nickname/title" element={<NicknameTitle />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/nickname/edit" element={<NicknameEdit />} />
          <Route path="/report" element={<Report />} />
          <Route path="/report/detail/gmi" element={<GmiDetail />} />
          <Route path="/report/detail/gv" element={<Variability />} />
          <Route path="/report/detail/mean" element={<Mean />} />
          <Route path="/report/detail/tir" element={<Tir />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/record/:date" element={<DayRecordPage />} />
          <Route path="/protector-main" element={<ProtectorMain />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
