# 🛸 Rick and Morty Explorer

A responsive web application for exploring the Rick and Morty universe through its characters, episodes, and locations.

Built with **HTML5, CSS3, JavaScript, and Vite**, using the [Rick and Morty API](https://rickandmortyapi.com/).

This project was developed as part of the **Full Stack Web Development Master's programme at Conquer Blocks**.

## 🌐 Live Demo

**[View Live Website](https://androsne.github.io/rick_and_morty_explorer/)**

**[GitHub Repository](https://github.com/androsne/rick_and_morty_explorer)**

## ✨ Features

### Characters

- Browse characters from the Rick and Morty universe.
- Search characters by name.
- Filter by status, species, and gender.
- Combine multiple filters to refine results.
- Reset all filters with a single button.
- Navigate results using pagination.
- View additional character information in a modal.

### Episodes

- Explore episodes from the series.
- Search episodes by name.
- View episode information and details.

### Locations

- Discover locations across the multiverse.
- Search locations by name.
- Explore location information and details.

### Favourites

- Add or remove characters from your favourites.
- Access saved characters in a dedicated Favourites section.
- Save favourites locally using the browser's `localStorage`.
- Keep your favourites between browser sessions.

### User Interface

- Responsive layout for mobile, tablet, and desktop.
- Dark theme inspired by the Rick and Morty universe.
- Interactive character cards.
- Modal windows for additional information.
- Dynamic content rendered with JavaScript.
- Navigation between sections without full page reloads.
- Loading and error handling for API requests.

## 🛠️ Technologies Used

| Technology        | Purpose                                  |
| ----------------- | ---------------------------------------- |
| HTML5             | Semantic page structure                  |
| CSS3              | Styling and responsive layouts           |
| JavaScript (ES6+) | Application logic and DOM manipulation   |
| Vite              | Development server and production builds |
| Fetch API         | Communication with the external API      |
| LocalStorage      | Persistent favourite characters          |
| Git & GitHub      | Version control and source code hosting  |
| GitHub Pages      | Website deployment                       |

## 📡 API

This application uses the free and public [Rick and Morty API](https://rickandmortyapi.com/).

The API provides information about:

- Characters
- Episodes
- Locations

Official API documentation:

https://rickandmortyapi.com/documentation

## 📁 Project Structure

```text
rick_and_morty_explorer/
├── public/
│   ├── img/
│   │   ├── rick_and_morty.svg
│   │   └── icon_portal.png
│   └── favicon.svg
│
├── src/
│   ├── css/
│   │   └── styles.css
│   │
│   ├── js/
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── favorites.js
│   │   └── ui.js
│   │
│   └── main.js
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

### JavaScript Modules

**`api.js`**  
Handles HTTP requests to the Rick and Morty API.

**`app.js`**  
Controls the application, navigation, events, search, filters, pagination, and modal interactions.

**`ui.js`**  
Handles dynamic rendering of characters, episodes, locations, and pagination.

**`favorites.js`**  
Manages favourite characters using browser localStorage.

**`main.js`**  
Entry point that imports the styles and initializes the application.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/androsne/rick_and_morty_explorer.git
```

**2. Navigate into the project**

```bash
cd rick_and_morty_explorer
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Production Build

Generate the optimized production files:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Vite generates the production files inside the `dist/` directory.

## 🌍 Deployment

The application is intended to be hosted using **GitHub Pages**.

The Vite configuration includes the repository's base path:

```js
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
});
```

Live website:

https://androsne.github.io/rick_and_morty_explorer/

## 🎓 Academic Project

This project was developed as part of the **Full Stack Web Development Master's programme at Conquer Blocks**.

The project provides practical experience with:

- JavaScript fundamentals and ES6+ features.
- Asynchronous programming with `async/await`.
- Consuming REST APIs using `fetch()`.
- DOM manipulation and event handling.
- Dynamic rendering of API data.
- Search, filtering, and pagination.
- Browser localStorage.
- Modular JavaScript architecture.
- Responsive web design.
- Version control with Git and GitHub.
- Building and deploying a web application.

## 👨‍💻 Author

**Andreas Osnes**

Full Stack Web Development Student

GitHub: [@androsne](https://github.com/androsne)

## 🙏 Acknowledgements

- [Rick and Morty API](https://rickandmortyapi.com/) — Character, episode, and location data.
- [Conquer Blocks](https://www.conquerblocks.com/) — Full Stack Web Development training.
- Rick and Morty — The universe that inspired the application's visual design and content.

---

**Disclaimer:** This is an educational, non-commercial project. Rick and Morty characters, images, and related trademarks belong to their respective owners.
