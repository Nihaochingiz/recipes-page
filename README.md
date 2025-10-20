# Healthy Recipes Website

A clean and responsive website for displaying healthy recipes using Flexbox layout. The website loads recipe data from a Markdown file and displays it in an attractive card-based interface.

## Features

- **Responsive Design**: Built with CSS Flexbox for optimal viewing on all devices
- **Markdown Data Source**: Recipes are stored in a simple Markdown format
- **No External Dependencies**: Pure HTML, CSS, and JavaScript
- **Theme Support**: Multiple color themes including black & white
- **Fast Loading**: Lightweight and optimized for performance

## File Structure

```
project-folder/
│
├── index.html          # Main HTML file
├── style.css           # Styles with CSS variables
├── script.js           # JavaScript functionality
├── recipes.md          # Recipe data in Markdown format
└── README.md           # This file
```

## Installation

1. Clone or download the project files
2. Ensure all files are in the same directory:
   - `index.html`
   - `style.css` 
   - `script.js`
   - `recipes.md`

3. Run using a local server (required for file loading):

### Option 1: VS Code Live Server
- Install the "Live Server" extension
- Right-click `index.html` and select "Open with Live Server"

### Option 2: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

### Option 3: Node.js Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server
```

4. Open your browser and navigate to:
   - `http://localhost:8000` (Python/Node.js) or
   - The URL provided by Live Server

## Recipe Format

Recipes are stored in `recipes.md` using this Markdown structure:

```markdown
# Recipe Title
Date: YYYY-MM-DD

## Ingredients:
- Ingredient 1
- Ingredient 2
- Ingredient 3

## Instructions:
1. Step 1
2. Step 2
3. Step 3

---
```

Each recipe is separated by `---` (three dashes).

## Customization

### Adding New Recipes
Simply add new recipes to `recipes.md` following the format above.

### Changing Colors
Modify CSS variables in `style.css`:

```css
:root {
    --primary-color: #4CAF50;    /* Main theme color */
    --bg-color: #f9f9f9;         /* Background color */
    --text-primary: #333333;     /* Main text color */
    /* ... other variables */
}
```

### Available Themes
- **Green** (Default) - Clean, healthy appearance
- **Blue** - Calm and professional
- **Purple** - Creative and modern  
- **Orange** - Warm and energetic
- **Black & White** - Minimalist and elegant

Switch themes using the theme selector in the top-right corner.

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Technical Details

- **CSS**: Flexbox layout with CSS custom properties
- **JavaScript**: ES6+ with async/await
- **Data Loading**: Fetch API for Markdown file
- **No Build Process**: Works directly in modern browsers

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the project
2. Add your recipes to `recipes.md`
3. Ensure the Markdown format is correct
4. Test with a local server
5. Submit a pull request

## Troubleshooting

**Recipes not loading?**
- Ensure you're using a local server (not opening HTML file directly)
- Check that `recipes.md` exists in the same directory
- Verify the Markdown format is correct

**Theme not saving?**
- Themes are saved in browser localStorage
- Clear browser data if themes aren't persisting

**Layout issues?**
- Ensure your browser supports CSS Flexbox
- Check console for JavaScript errors