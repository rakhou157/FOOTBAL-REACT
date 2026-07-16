import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Trophy, BarChart3 } from 'lucide-react';

const features = [
  { icon: Users, title: 'Effectif complet', text: "Consultez, ajoutez, modifiez et supprimez les fiches joueurs en quelques clics." },
  { icon: BarChart3, title: 'Statistiques claires', text: "Buts, passes décisives et répartition par poste visualisés en un coup d'œil." },
  { icon: Trophy, title: 'Suivi de performance', text: "Un dashboard pensé pour préparer les prochaines échéances de l'équipe." },
];

function Home() {
  return (
    <div className="dark:bg-gray-950 transition-colors duration-300">
      <section className="bg-gradient-to-br from-senegal-green to-emerald-800 dark:from-emerald-950 dark:to-gray-950 text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-block bg-senegal-yellow text-senegal-green text-xs font-semibold px-3 py-1 rounded-full mb-4"
          >
            Gestion d'équipe
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold max-w-2xl leading-tight"
          >
            Gérez les Lions du Sénégal comme un vrai staff technique
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/80 max-w-xl"
          >
            Suivez l'effectif, les statistiques et la performance de l'équipe nationale
            depuis un tableau de bord unique, pensé pour les entraîneurs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-senegal-green font-medium px-6 py-3 rounded-lg hover:bg-gray-100 hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              Voir le Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/joueurs"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
            >
              Voir l'effectif
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 transition-colors"
          >
            <f.icon className="w-8 h-8 text-senegal-green mb-3" />
            <h3 className="font-display font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{f.text}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

export default Home;