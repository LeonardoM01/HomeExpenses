export const CategoryTypeOptions = [
    { value: 'Revenue', label: 'RECEITA' },
    { value: 'Expense', label: 'DESPESA' },
    { value: 'Both', label: 'AMBAS' },
] as const;

export type CategoryType =
    typeof CategoryTypeOptions[number]['value'];

export interface Category {
    id: number;
    description: string;
    categoryType: CategoryType;
}

