
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Login from './pages/login'
import { store } from "./store/store"; // Ensure store is initialized
import { Provider } from "react-redux";
import Dashboard from './pages/dashboard';
import RoleManagement from './pages/role_management';
import UserManagement from './pages/user_management';
import Headers from './components/Header';
import { ThemeProvider } from './components/theme-provider';
import ProtectedRoutes from './protectedRoutes';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Headers />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/roles"
          element={
            <ProtectedRoutes>
              <RoleManagement />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoutes>
              <UserManagement />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  )
}

export default App
