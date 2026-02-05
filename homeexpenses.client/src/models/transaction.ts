// Interface de Transação para fazer as requisições
export const TransactionTypeOptions = [
    { value: 'Revenue', label: 'RECEITA' },
    { value: 'Expense', label: 'DESPESA' },
] as const;

export type TransactionType =
    typeof TransactionTypeOptions[number]['value'];
export interface Transaction {
    id: number;
    description: string;
    value: number;
    transactionType: TransactionType;
    categoryId: number;
    userId: number;
}

export interface TransactionUserSummary {
    id: number;
    name: string;
    totalExpenses: number;
    totalRevenues: number;
    balance: number;
}