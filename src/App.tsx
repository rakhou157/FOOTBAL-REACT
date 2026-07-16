import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import MainLayout from './Layouts/MainLayout';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Players from './Pages/Players';
import AddPlayer from './Pages/AddPlayer';
import About from './Pages/About';
import Login from './Pages/Login';
// @ts-ignore: allow importing CSS without type declarations
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="connexion" element={<Login />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="joueurs"
                element={
                  <ProtectedRoute>
                    <Players />
                  </ProtectedRoute>
                }
              />
              <Route
                path="ajouter"
                element={
                  <ProtectedRoute>
                    <AddPlayer />
                  </ProtectedRoute>
                }
              />
              <Route path="a-propos" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;