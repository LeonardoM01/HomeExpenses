import type { Category, CategoryType } from '../models/category';
import { CategoryTypeOptions } from '../models/category';
import { useEffect, useState } from 'react'; 
import Nav from '../components/Nav';


export default function Category() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<{
        description: string;
        categoryType: CategoryType;
    }>({
        description: '',
        categoryType: 'Revenue',
    });

    // Função para listar categorias cadastrados no banco.
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category');

                if (!response.ok) return;

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.log('Backend ainda não disponível ' + error);
            }
        };

        fetchCategories();
    }, []);

    const getCategoryTypeLabel = (value: Category['categoryType']) => {
        return CategoryTypeOptions.find(opt => opt.value === value)?.label ?? value;
    };

    // Função para garantir que o valor selecionado é um CategoryType válido
    const isCategoryType = (value: string): value is CategoryType => {
        return CategoryTypeOptions.some(opt => opt.value === value);
    };

    // Manipulador de mudança para o select de CategoryType
    const handleCategoryTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (isCategoryType(value)) {
            setFormData(prev => ({
                ...prev,
                categoryType: value
            }));
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

    // Adicionar nova categoria
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCategory: Category = {
            id: 0,
            description: formData.description.trim(),
            categoryType: formData.categoryType,
        };

        try {
            console.log(newCategory)
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });
            if (response.ok) {
                alert("Categoria Criada com Sucesso!");
                const createdCategory = await response.json();
                console.log(createdCategory)
                setCategories(prev => [...prev, createdCategory]);

            }
        } catch (error) {
            console.error("Erro ao salvar:", error);
        }
        
    }; 

    return (
        <div>
            <Nav />
            <div className="flex justify-center mt-20">
                <form className="flex flex-col w-md" onSubmit={handleSubmit}>
                    <h2 className="mb-4 text-2xl font-bold">Criar Nova Categoria</h2>
                    <div className="flex flex-col items-start mb-4 text-lg">
                        <label htmlFor="description">Descrição</label>
                        <input className="w-full bg-[#393A41] py-1.5 px-3 rounded-md border-1 border-[#3D3E44]" type="text" id="nadescriptionme" name="description" required value={formData.description} onChange={handleInputChange} />
                    </div>

                    <div className="text-lg mb-4">
                        <label className="mb-2.5 text-heading" htmlFor="age">Finalidade</label>
                        <select className="block w-full px-3 py-2.5 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                            value={formData.categoryType}
                            onChange={handleCategoryTypeSelect}
                        >
                            {CategoryTypeOptions.map(opt => (
                                <option className="bg-[#393A41]" key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg hover:bg-slate-700 cursor-pointer" type="submit">
                        Adicionar Categoria
                    </button>
                </form>
            </div>
            <hr className="m-5"></hr>
            <div className="flex flex-col items-center mx-5 my-8">
            <h2 className="text-2xl font-bold mb-4">
                Categorias Cadastradas
            </h2>

            {categories.length === 0 ? (
                <p className="text-gray-500 italic">
                Nenhuma categoria cadastrada ainda.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                {categories.map((category) => (
                    <div
                    key={category.id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                    <div className="text-gray-700">
                        <span className="font-semibold">{category.description}</span>
                        <span className="text-gray-500"> - Finalidade: </span>
                        <span className="text-blue-600 font-medium">
                        {getCategoryTypeLabel(category.categoryType)}
                        </span>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    );
}