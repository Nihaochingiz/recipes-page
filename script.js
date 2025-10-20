async function loadRecipes() {
    try {
        const response = await fetch('recipes.md');
        
        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.status}`);
        }
        
        const markdownData = await response.text();
        return markdownData;
    } catch (error) {
        console.error('Ошибка при загрузке рецептов:', error);
        throw error;
    }
}


function parseRecipes(markdownData) {
    const recipes = [];
    const recipeBlocks = markdownData.split('---').filter(block => block.trim() !== '');
    
    recipeBlocks.forEach(block => {
        const lines = block.trim().split('\n');
        const recipe = {
            title: '',
            date: '',
            ingredients: [],
            instructions: []
        };
        
        let currentSection = '';
        
        lines.forEach(line => {
            line = line.trim();
            
            if (line.startsWith('# ')) {
                recipe.title = line.substring(2);
            } else if (line.startsWith('Дата:')) {
                recipe.date = line.substring(6);
            } else if (line.startsWith('## Ингредиенты:')) {
                currentSection = 'ingredients';
            } else if (line.startsWith('## Способ приготовления:')) {
                currentSection = 'instructions';
            } else if (line.startsWith('- ') && currentSection === 'ingredients') {
                recipe.ingredients.push(line.substring(2));
            } else if (/^\d+\./.test(line) && currentSection === 'instructions') {
                recipe.instructions.push(line.replace(/^\d+\.\s*/, ''));
            }
        });
        
        if (recipe.title) {
            recipes.push(recipe);
        }
    });
    
    return recipes;
}


function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    const ingredientsList = recipe.ingredients.map(ingredient => 
        `<li>${ingredient}</li>`
    ).join('');
    
    const instructionsList = recipe.instructions.map((instruction, index) => 
        `<li>${instruction}</li>`
    ).join('');
    
    card.innerHTML = `
        <div class="recipe-content">
            <h2 class="recipe-title">${recipe.title}</h2>
            <p class="recipe-date">${recipe.date}</p>
            
            <div class="recipe-ingredients">
                <h3>Ингредиенты:</h3>
                <ul>${ingredientsList}</ul>
            </div>
            
            <div class="recipe-instructions">
                <h3>Способ приготовления:</h3>
                <ol>${instructionsList}</ol>
            </div>
        </div>
    `;
    
    return card;
}


function showError(message) {
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    
    loadingElement.style.display = 'none';
    errorElement.style.display = 'block';
    errorElement.textContent = message;
}


function initThemeSwitcher() {
    const themeButtons = document.createElement('div');
    themeButtons.className = 'theme-switcher';
    themeButtons.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        z-index: 1000;
    `;
    
    const themes = [
        { name: 'Зеленая', class: '' },
        { name: 'Синяя', class: 'theme-blue' },
        { name: 'Фиолетовая', class: 'theme-purple' },
        { name: 'Оранжевая', class: 'theme-orange' }
    ];
    
    themes.forEach(theme => {
        const button = document.createElement('button');
        button.textContent = theme.name;
        button.style.cssText = `
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            font-size: 12px;
        `;
        button.onclick = () => {
            document.documentElement.className = theme.class;
        };
        themeButtons.appendChild(button);
    });
    
    document.body.appendChild(themeButtons);
}


async function init() {
    try {
        const markdownData = await loadRecipes();
        const recipes = parseRecipes(markdownData);
        const container = document.getElementById('recipes-container');
        const loadingElement = document.getElementById('loading');
        
        loadingElement.style.display = 'none';
        
        if (recipes.length === 0) {
            showError('Рецепты не найдены в файле recipes.md');
            return;
        }
        
        recipes.forEach(recipe => {
            const card = createRecipeCard(recipe);
            container.appendChild(card);
        });
        
        // Инициализируем переключатель тем
        initThemeSwitcher();
        
    } catch (error) {
        showError(`Не удалось загрузить рецепты: ${error.message}. Убедитесь, что файл recipes.md существует и запущен через локальный сервер.`);
    }
}

// Запуск при загрузке страницы
document.addEventListener('DOMContentLoaded', init);