import { Link } from "react-router-dom";

export default function Home() {
  return (
      <div>
          <h1>Home Expenses</h1>
          <h5>Seu novo sistema de controle financeiro.</h5>
          <div className="w-100 flex gap-5 mt-5">
              <Link className="bg-[#393A41] px-6 py-3 border-2 border-slate-800 rounded-md decoration-white" to="/users">Usuários</Link>
              <Link className="bg-[#393A41] px-6 py-3 border-2 border-slate-800 rounded-md decoration-white" to="/categories">Categorias</Link>
              <Link className="bg-[#393A41] px-6 py-3 border-2 border-slate-800 rounded-md decoration-white" to="/transactions">Transações</Link>
              <Link className="bg-[#393A41] px-6 py-3 border-2 border-slate-800 rounded-md decoration-white" to="/reports">Relatório</Link>
          </div>
      </div>
  );
}