import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Feed/HomePage";
import FeedLayout from "./layout/FeedLayout";
import ProfilePage from "./pages/User/ProfilePage";
import LoginPage from "./pages/Authentication/LoginPage";
import RegisterPage from "./pages/Authentication/RegisterPage";
import ConfirmAccountPage from "./pages/Authentication/ConfirmAccountPage";
import AuthLayout from "./layout/AuthLayout";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FeedLayout />}>
          <Route path="/" element={<HomePage />} index />
          <Route path="/:username" element={<ProfilePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/confirm-account" element={<ConfirmAccountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
