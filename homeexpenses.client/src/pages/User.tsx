import React from 'react';
import { useEffect, useState } from 'react';
import type { User } from '../models/user';
import Nav from '../components/Nav';
export default function User() {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        age: ''
    });

    // Função para listar os usuários cadastrados no banco.
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        }; fetchUsers();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));        
    };

    // Adicionar novo usuário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newUser: User = {
            id: 0, // O ID será atribuído pelo backend
            name: formData.name.trim(),
            age: parseInt(formData.age)
        };

        try {
            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });            
            if (response.ok) {
                alert("Usuario Criado com Sucesso!");
                const createdUser = await response.json();
                setUsers(prev => [...prev, createdUser]);             

            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }        

        // Limpar formulário
        setFormData({
            name: '',
            age: ''
        });
    };

    // Deletar usuário
    const handleDeleteUser = async (id: number) => {
        try {
            const response = await fetch(`/api/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                alert("Usuario apagado com sucesso!");

                setUsers(prev => prev.filter(user => user.id !== id));
            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <Nav />
            <div className="flex justify-center mt-20">
                <form className="flex flex-col w-md" onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-xl">Criar Novo Usuário</h2>
                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="name">Nome</label>
                        <input className="w-full bg-[#393A41] py-1.5 px-3 rounded-md border-1 border-[#3D3E44]" type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} />
                    </div>

                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="age">Idade</label>
                        <input className="w-full bg-[#393A41] py-1.5 px-3 rounded-md border-1 border-[#3D3E44]" type="number" id="age" name="age" required value={formData.age} onChange={handleInputChange} />
                    </div>
                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 cursor-pointer" type="submit">
                        Adicionar Usuário
                    </button>
                </form>
            </div>
            <hr className="m-5"></hr>
            <div className="flex justify-center flex-wrap mx-5">
                <h2 className="w-full mb-4 text-xl">Usuários Cadastrados</h2>
                {users.length === 0 ? (
                    <h2 className="mb-4 text-xl">Nenhum usuário cadastrado ainda.</h2>
                ) : (
                    <div className="w-full shadow-xs rounded-md border border-default">
                        <table className="w-full text-sm">
                            <thead className="text-sm text-body border-b rounded-base border-default">
                                <tr className="text-xl">
                                    <th scope="col" className="px-6 py-3">Nome</th>
                                    <th scope="col" className="px-6 py-3">Idade</th>
                                    <th scope="col" className="px-6 py-3">Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr className="border-b border-default text-lg">
                                        <td scope="row" className="px-6 py-4 text-center">{user.name}</td>
                                        <td scope="row" className="px-6 py-4 text-center">{user.age}</td>
                                        <td className="px-6 py-4 text-center"><button
                                            className="rounded-md bg-red-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg hover:bg-red-400 cursor-pointer"
                                            onClick={() => handleDeleteUser(user.id)} aria-label={`Deletar usuário ${user.name}`}>Excluir Usuário</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}