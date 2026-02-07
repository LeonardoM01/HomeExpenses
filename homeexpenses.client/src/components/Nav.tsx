import { Link } from "react-router-dom";

function Nav() {
    return (
        <div className="absolute top-0 left-0 flex flex-wrap place-items-center">
            <section className="relative mx-auto">              
                <nav className="flex justify-between bg-gray-900 text-white w-screen">
                    <div className="px-5 xl:px-12 py-6 flex w-full items-center">                       
                        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                            <Link className="hover:text-gray-200" to="/">Home</Link>
                            <Link className="hover:text-gray-200" to="/users">Usuários</Link>
                            <Link className="hover:text-gray-200" to="/categories">Categorias</Link>
                            <Link className="hover:text-gray-200" to="/transactions">Transações</Link>
                            <Link className="hover:text-gray-200" to="/reports">Relatório</Link>
                      </ul>                      
                  </div>                  
              </nav>
          </section>
      </div>
  );
}

export default Nav;