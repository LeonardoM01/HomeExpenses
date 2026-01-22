import type { Category, CategoryType } from '../models/category';
import { CategoryTypeOptions } from '../models/category';
import { useEffect, useState } from 'react'; 

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
          <h2>Criar Nova Categoria</h2>
          <form onSubmit={handleSubmit}>
              <label htmlFor="description">Descrição:</label>
              <input type="text" id="nadescriptionme" name="description" required value={formData.description} onChange={handleInputChange} />

              <label htmlFor="age">Finalidade:</label>
              <select
                  value={formData.categoryType}
                  onChange={handleCategoryTypeSelect}
              >                  
                  {CategoryTypeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                          {opt.label}
                      </option>
                  ))}
              </select>

              <button type="submit">
                  Adicionar Categoria
              </button>
          </form>

          <h2>Categorias Cadastrados</h2>
          {categories.length === 0 ? (
              <p>Nenhuma categoria cadastrada ainda.</p>
          ) : (
              <div >
                      {categories.map(category => (
                      <div key={category.id} >
                          <div >
                              <span>{category.description} - </span>
                                  <span>Finalidade: {getCategoryTypeLabel(category.categoryType)}</span>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
  );
}