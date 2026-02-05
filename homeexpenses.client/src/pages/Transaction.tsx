import type { Transaction, TransactionType } from '../models/transaction';
import { TransactionTypeOptions } from '../models/transaction';
import { useState, useEffect } from 'react';
import type { Category } from '../models/category';
import type { User } from '../models/user';

export default function Transaction() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [users, setUsers] = useState<User[]>([]);

    const [formData, setFormData] = useState({
        description: '',
        value: 0,
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
            value: formData.value,
            transactionType: formData.transactionType,
            categoryId: formData.categoryId,
            userId: formData.userId,
        };

        try {
            console.log(newTransaction)
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
    const handleTransactionTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (isTransactionType(value)) {
            setFormData(prev => ({
                ...prev,
                transactionType: value
            }));
        }
    };

  return (
      <div>
          <h2>Criar Nova Transação</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="description">Descrição:</label>
              <input type="text" id="description" name="description" required value={formData.description} onChange={handleInputChange} />

              <label htmlFor="value">Valor:</label>
              <input type="number" id="value" name="value" required value={formData.value} onChange={handleInputChange} />

              <label htmlFor="transactionType">Tipo de Transação:</label>
              <select id="transactionType" name="categoryType"
                  value={formData.transactionType}
                  onChange={handleTransactionTypeSelect}
              >
                  {TransactionTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                          {opt.label}
                      </option>
                  ))}
              </select>

              <label htmlFor="categoryType">Categoria:</label>              
              <select id="categoryType" name="categoryType"
                  value={formData.categoryId}
                  onChange={e =>
                      setFormData(prev => ({
                          ...prev,
                          categoryId: Number(e.target.value),
                      }))
                  }
              >
                  <option>Selecione</option>
                  {categories.map(c => (
                      <option key={c.id} value={c.id}>
                          {c.description}
                      </option>
                  ))}
              </select>

              <label htmlFor="TransUser">Usuário</label>              
              <select id="TransUser" name="TransUser"
                  value={formData.userId}
                  onChange={e =>
                      setFormData(prev => ({
                          ...prev,
                          userId: Number(e.target.value),
                      }))
                  }
              >
                  <option>Selecione</option>
                  {users.map(c => (
                      <option key={c.id} value={c.id}>
                          {c.name}
                      </option>
                  ))}
              </select>

              <button type="submit">
                  Adicionar Transação
              </button>
          </form>


          <div >
              {transactions.map(trs => (
                  <div key={trs.id} >
                      <div >
                          <span>{trs.description}</span>
                          <span>Idade: {trs.transactionType}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );
}
