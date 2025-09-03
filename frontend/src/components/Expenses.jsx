import { useState } from "react";

export default function Expenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Loyer", type: "Fixe", amount: 800, icon: "🏠", date: "2025-08-28", description: "" },
    { id: 2, category: "Courses", type: "Variable", amount: 200, icon: "🛒", date: "2025-08-28", description: "" },
  ]);

  const addExpense = (e) => {
    e.preventDefault();
    const form = e.target;
    const newExpense = {
      id: Date.now(),
      amount: parseFloat(form.amount.value),
      type: form.type.value,
      category: form.category.value,
      description: form.description.value,
      date: form.date.value,
      receipt: form.receipt.files[0]?.name || null,
      icon: "💸",
    };
    setExpenses([...expenses, newExpense]);
    form.reset();
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-500 to-pink-500">
      {/* Navbar gauche */}
      <nav className="w-64 bg-gradient-to-br from-purple-700 to-pink-600 text-white flex flex-col p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-8">💰 BudgetApp</h2>
        <ul className="space-y-4">
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">Tableau de bord</li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">Ajouter une dépense</li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">Revenus</li>
          <li className="hover:bg-white/20 p-3 rounded-xl cursor-pointer transition">Paramètres</li>
        </ul>
      </nav>

      {/* Contenu droite */}
      <main className="flex-1 overflow-auto p-8">
        <h1 className="text-3xl font-bold text-white mb-6">Gestion des Dépenses</h1>

        {/* Formulaire ajout */}
        <form onSubmit={addExpense} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="number" name="amount" placeholder="Montant (Ar)" required className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none" />
            <select name="type" className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none">
              <option value="Ponctuelle">Ponctuelle</option>
              <option value="Récurrente">Récurrente</option>
            </select>
            <input type="date" name="date" required className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none" />
            <input type="text" name="category" placeholder="Catégorie" required className="p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none" />
          </div>
          <textarea name="description" placeholder="Description (optionnel)" className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"></textarea>
          <input type="file" name="receipt" accept=".jpg,.png,.pdf" className="block w-full text-sm text-gray-600" />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 text-white font-medium py-3 rounded-xl shadow-md transition">
            ➕ Ajouter une dépense
          </button>
        </form>

        {/* Liste des dépenses sous forme de table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Catégorie</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Montant</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Reçu</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp, index) => (
                <tr key={exp.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-4 py-3 flex items-center gap-2 font-medium text-gray-700">
                    <span>{exp.icon}</span> {exp.category}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{exp.type}</td>
                  <td className="px-4 py-3 font-bold text-red-600">{exp.amount.toFixed(2)} Ar</td>
                  <td className="px-4 py-3 text-gray-600">{exp.date}</td>
                  <td className="px-4 py-3 text-gray-500">{exp.description || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{exp.receipt ? `📎 ${exp.receipt}` : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
