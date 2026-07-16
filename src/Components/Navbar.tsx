import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';
import { useAuth } from '../Context/AuthContext';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/joueurs', label: 'Joueurs' },
  { to: '/ajouter', label: 'Ajouter' },
  { to: '/a-propos', label: 'À propos' },
];

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, coach, logout } = useAuth();
  const navigate = useNavigate();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-white/15 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="sticky top-0 z-50 bg-senegal-green dark:bg-emerald-950 shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-white font-display font-bold text-lg">
            <Shield className="w-6 h-6 text-senegal-yellow" />
            Lions du Sénégal
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClasses} end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Basculer le thème"
              className="w-9 h-9 flex items-center justify-center rounded-full text-white/90 hover:bg-white/10 transition-colors"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-white px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {coach?.name}
              </button>
            ) : (
              <NavLink
                to="/connexion"
                className="flex items-center gap-1.5 text-sm font-medium bg-white text-senegal-green px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </NavLink>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-4">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={linkClasses}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-white/90"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
                </button>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/90"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                ) : (
                  <NavLink
                    to="/connexion"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-white/90"
                  >
                    <LogIn className="w-4 h-4" />
                    Connexion
                  </NavLink>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;