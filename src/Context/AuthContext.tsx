import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface Coach {
  name: string;
  email: string;
}

interface AuthContextValue {
  coach: Coach | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'lions-du-senegal-coach';

// Authentification simulée : un seul compte de démonstration, sans backend
const DEMO_EMAIL = 'coach@lions.sn';
const DEMO_PASSWORD = 'lions2026';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [coach, setCoach] = useState<Coach | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCoach(JSON.parse(saved));
  }, []);

  function login(email: string, password: string) {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const newCoach: Coach = { name: 'Coach Principal', email: DEMO_EMAIL };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCoach));
      setCoach(newCoach);
      return { success: true };
    }
    return { success: false, error: 'Identifiants incorrects. Utilisez le compte de démonstration.' };
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setCoach(null);
  }

  return (
    <AuthContext.Provider value={{ coach, isAuthenticated: !!coach, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personnalisé : useAuth
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un <AuthProvider>');
  }
  return context;
}