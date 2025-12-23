# My Personal Portfolio

A lightweight, dark-themed portfolio website built with Vite and Vanilla CSS. Designed for easy deployment to GitHub Pages.

## 🚀 Getting Started

### Prerequisites
- Node.js installed

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development

Start the local development server:
```bash
npm run dev
```

### Build

Build the static site for production:
```bash
npm run build
```
The output will be in the `dist` folder.

## 📝 Customization

### Content
Edit `src/modules/content.js` to update your:
-   Hero details (Name, Title)
-   About Me text
-   Experience / CV items
-   Projects
-   Contact info

### Styling
Edit `src/css/style.css` to change colors, fonts, or layout. Theme variables are at the top of the file.

### Fonts
The project uses 'Outfit' (headings) and 'Inter' (body) from Google Fonts. You can change this in `index.html` and `src/css/style.css`.

## 📦 Deployment to GitHub Pages

1.  Push your code to a GitHub repository.
2.  Go to Settings > Pages.
3.  Select 'GitHub Actions' as the source (or use `gh-pages` branch).
4.  If using a custom workflow or manual deploy, simply upload the contents of the `dist` folder after running `npm run build`.

## 📄 License
MIT
