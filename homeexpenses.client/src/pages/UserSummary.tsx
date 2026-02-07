import Nav from '../components/Nav';
import type { TransactionUserSummary } from '../models/transaction';
import { useState, useEffect } from 'react';
export default function UserSummary() {
    const [transactionsUsers, setTransactionsUsers] = useState<TransactionUserSummary[]>([]);

    useEffect(() => {
        const fetchTransactionsUsers = async () => {
            try {
                const response = await fetch(`/api/reports/users`);
                if (!response.ok) return;

                const data = await response.json();
                setTransactionsUsers(data);
            } catch (error) {
                console.log('Backend ainda não disponível ' + error);
            }
        };
        fetchTransactionsUsers();
    }, []);



    return (
        <div>
            <Nav />
            <div className="max-w-2xl mx-auto p-6 mt-20">
                {transactionsUsers.map((tUsers) => (
                    <div
                        key={tUsers.id}
                        className="bg-[#393A41] border border-[#3D3E44] rounded-md p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <p className="text-xl font-bold mb-2">{tUsers.name}</p>
                        <p className="text-lg text-red-300">Despesas: R$ {tUsers.totalExpenses}</p>
                        <p className="text-lg text-green-600">Receitas: R$ {tUsers.totalRevenues}</p>
                        <p
                            className={`text-lg font-medium ${tUsers.balance >= 0 ? "text-green-700" : "text-red-500"
                                }`}
                        >
                            Saldo: R$ {tUsers.balance}
                        </p>
                    </div>
                ))}
            </div>
        </div>

    );
}

