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
          {transactionsUsers.map(tUsers => (
              <div key={tUsers.id} >
                  <div >
                      <p>{tUsers.name}</p>
                      <p>Despesas: R$ {tUsers.totalExpenses}</p>
                      <p>Receitas: R$ {tUsers.totalRevenues}</p>
                      <p>Saldo: R$ {tUsers.balance}</p>
                  </div>
              </div>
          ))}
      </div>
  );
}

