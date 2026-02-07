import type { Transaction, TransactionType } from '../models/transaction';
import { TransactionTypeOptions } from '../models/transaction';
import { CategoryTypeOptions } from '../models/category';
import { useState, useEffect } from 'react';
import type { Category } from '../models/category';
import type { User } from '../models/user';
import Nav from '../components/Nav';

export default function Transaction() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [formData, setFormData] = useState({
        description: '',
        amount: 0,
        transactionType: 'Revenue' as TransactionType,
        categoryId: 0,
        userId: 0,
    });

    // Função para listar as transações cadastrados no banco.
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('/api/transaction');

                if (!response.ok) return;

                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.log('Backend ainda não disponível ' + error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');

                if (!response.ok) return;

                const data = await response.json();
                console.log(data)
                setCategories(data);
            } catch (error) {
                console.log('Backend ainda não disponível ' + error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/user');
                const data = await response.json();
                console.log(data);
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTransactions();
        fetchCategories();
        fetchUsers();
    }, []);

    // Adicionar nova transação
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log(formData);

        const newTransaction: Transaction = {
            id: 0, // O ID será atribuído pelo backend
            description: formData.description,
            amount: formData.amount,
            transactionType: formData.transactionType,
            categoryId: formData.categoryId,
            userId: formData.userId,
        };

        try {
            const response = await fetch('/api/transaction', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTransaction)
            });
            if (response.ok) {
                alert("Transação Criada com Sucesso!");
                const createdTransaction = await response.json();
                console.log(createdTransaction)
                setTransactions(prev => [...prev, createdTransaction]);

            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }

    };

    // Manipulador de mudança para os campos de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Função para garantir que o valor selecionado é um CategoryType válido
    const isTransactionType = (value: string): value is TransactionType => {
        return TransactionTypeOptions.some(opt => opt.value === value);
    };

    // Manipulador de mudança para o select de CategoryType
    const handleTransactionTypeSelect = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const value = e.target.value;

        if (isTransactionType(value)) {
            setFormData(prev => ({
                ...prev,
                transactionType: value,
                categoryId: 0, // limpa categoria selecionada
            }));
        }
    };

    const filteredCategories = categories.filter(
        (c) => c.categoryType === formData.transactionType
    );

    return (
        <div>
            <Nav />
            <div className="flex justify-center mt-20">
                <form className="flex flex-col w-md" onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-2xl font-bold">
                        Criar Nova Transação
                    </h2>
                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="description">
                            Descrição:
                        </label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                            className="w-full bg-[#393A41] py-1.5 px-3 rounded-md border-1 border-[#3D3E44]"
                        />
                    </div>

                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="TransUser">
                            Usuário:
                        </label>
                        <select
                            id="TransUser"
                            name="TransUser"
                            value={formData.userId}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    userId: Number(e.target.value),
                                }))
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option className="bg-[#393A41]">Selecione</option>
                            {users.map((c) => (
                                <option className="bg-[#393A41]" key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="amount">
                            Valor:
                        </label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            required
                            value={formData.amount}
                            onChange={handleInputChange}
                            className="w-full bg-[#393A41] py-1.5 px-3 rounded-md border-1 border-[#3D3E44]"
                        />
                    </div>

                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="transactionType">
                            Tipo de Transação:
                        </label>
                        <select
                            id="transactionType"
                            name="transactionType"
                            value={formData.transactionType}
                            onChange={handleTransactionTypeSelect}
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                        >
                            {TransactionTypeOptions.map((opt) => (
                                <option className="bg-[#393A41]" key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="categoryType">
                            Categoria:
                        </label>
                        <select
                            id="categoryType"
                            name="categoryType"
                            value={formData.categoryId}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    categoryId: Number(e.target.value),
                                }))
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                        >
                            <option value={0} className="bg-[#393A41]">
                                Selecione
                            </option>

                            {filteredCategories.map((c) => (
                                <option className="bg-[#393A41]" key={c.id} value={c.id}>
                                    {c.description}
                                </option>
                            ))}
                        </select>
                    </div>


                    <button
                        type="submit"
                        className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 cursor-pointer"
                    >
                        Adicionar Transação
                    </button>
                </form>
            </div>
            <hr className="m-5" />
            <div className="mt-8 space-y-3">
                <h2 className="text-2xl font-bold mb-4">
                    Transações Realizadas
                </h2>
                {transactions.map((trs) => (
                    <div
                        key={trs.id}
                        className="border border-gray-200 rounded-md p-4 shadow-sm"
                    >
                        <p className="font-medium">{users.find(u => u.id === trs.userId)?.name}</p>
                        <p className="font-medium">{trs.description}</p>
                        <p className="font-medium">R$ {trs.amount}</p>
                        <p className="font-medium">{categories.find(c => c.id === trs.categoryId)?.description}</p>
                        <p className="font-medium">{TransactionTypeOptions.find(t => t.value === trs.transactionType)?.label.toLowerCase()}</p>

                    </div>
                ))}
            </div>
        </div>
    );
}
