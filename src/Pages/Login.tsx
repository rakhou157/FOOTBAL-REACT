import { useState, FormEvent } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('coach@lions.sn');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Erreur de connexion');
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-950 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-8"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-senegal-green/10 flex items-center justify-center mb-3">
            <Shield className="w-6 h-6 text-senegal-green" />
          </div>
          <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">Espace Coach</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connexion réservée au staff technique
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-senegal-green/50 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="lions2026"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-senegal-green/50 text-sm"
            />
          </div>

          {error && <p className="text-sm text-senegal-red">{error}</p>}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-senegal-green text-white font-medium py-2.5 rounded-lg hover:bg-senegal-green/90 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Se connecter
          </button>
        </form>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-5">
          Démo : coach@lions.sn / lions2026
        </p>
      </motion.div>
    </div>
  );
}

export default Login;