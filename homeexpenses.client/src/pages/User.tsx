import React from 'react';
import { useEffect, useState } from 'react';
import type { User } from '../models/user';
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
            <h2>Criar Novo Usuário</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleInputChange} />

                <label htmlFor="age">Idade:</label>
                <input type="number" id="age" name="age" required value={formData.age} onChange={handleInputChange} />

                <button type="submit">
                    Adicionar Usuário
                </button>
            </form>

            <h2>Usuários Cadastrados</h2>
            {users.length === 0 ? (
                <p>Nenhum usuário cadastrado ainda.</p>
            ) : (
                <div >
                    {users.map(user => (
                        <div key={user.id} >
                            <div >
                                <span>{user.name}</span>
                                <span>Idade: {user.age}</span>
                            </div>
                            <button onClick={() => handleDeleteUser(user.id)} aria-label={`Deletar usuário ${user.name}`}>Excluir</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}