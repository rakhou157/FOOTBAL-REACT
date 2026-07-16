import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 py-16"
    >
      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">À propos du projet</h1>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        « Lions du Sénégal » est une application de gestion d'équipe de football développée
        dans le cadre de l'examen final de Développement Web Front-End. Elle permet de
        centraliser l'effectif, de suivre les statistiques individuelles et collectives, et
        d'offrir une vue d'ensemble claire de la performance de l'équipe.
      </p>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
        Le projet a été réalisé en équipe avec React JS, TypeScript et Tailwind CSS, en
        respectant une architecture modulaire (composants, pages, contextes, hooks
        personnalisés, types, services et données) et une organisation Git collaborative.
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
        <Github className="w-4 h-4" />
        Code source hébergé sur GitHub
      </div>
    </motion.div>
  );
}

export default About;