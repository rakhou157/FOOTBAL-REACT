function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-senegal-green p-5 text-white">
        <h1 className="text-3xl font-bold">
          Football Team Manager ⚽
        </h1>
      </header>

      <main className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold">
            Gestion de mon équipe
          </h2>

          <p className="mt-3 text-gray-600">
            Gérer les joueurs, matchs et statistiques.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;