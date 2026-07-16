function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Lions du Sénégal — Application de gestion d'équipe.
        </p>
        <p className="text-xs text-gray-500">Projet réalisé en React, TypeScript &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}

export default Footer;