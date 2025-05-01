# HealMate

HealMate is a healthcare AI project that leverages a T5-based generative AI model to predict diagnoses and tailor treatment plans based on user-provided symptoms. The project consists of a backend API powered by Flask and Hugging Face transformers, and a modern React frontend built with Vite.

## Project Structure

- `backend/`  
  Contains the backend Flask application and the trained T5 disease treatment model.  
  - `app.py`: Main Flask app exposing a `/predict` API endpoint.  
  - `t5_disease_treatment_model/`: Directory containing the trained T5 model files and tokenizer configuration.

- `frontend/`  
  Contains the React frontend application built with Vite.  
  - `src/`: React source code including components, pages, and assets.  
  - `public/`: Static assets served by the frontend.  
  - Configuration and dependency files such as `package.json`, `vite.config.js`, and ESLint config.

## Backend

- Built with **Flask**, a lightweight Python web framework.  
- Uses **Flask-CORS** to enable cross-origin requests from the frontend.  
- Integrates the **Hugging Face Transformers** library to load a pretrained **T5** model for disease treatment prediction.  
- Exposes a REST API endpoint `/predict` that accepts POST requests with symptoms and returns predicted treatment plans.

## Frontend

- Built with **React** (version 19) using **Vite** as the build tool for fast development and optimized builds.  
- Uses **Tailwind CSS** for utility-first styling.  
- Implements routing with **React Router DOM**.  
- Adds animations and transitions with **Framer Motion**.  
- Uses **axios** for HTTP requests to the backend API.  
- Includes iconography with **lucide-react**.  
- Linting and code quality enforced with **ESLint** and React-specific plugins.

## How to Run

### Backend

1. Ensure Python and required packages (`flask`, `flask-cors`, `transformers`, `torch`) are installed.  
2. Run the backend server:
   ```bash
   python backend/app.py
   ```
3. The backend will be available at `http://localhost:5000`.

### Frontend

1. Navigate to the `frontend` directory.  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. The frontend will be available at the URL shown in the terminal (usually `http://localhost:5173`).

## Dependencies

### Backend

- Flask
- Flask-CORS
- transformers (Hugging Face)
- torch (PyTorch)

### Frontend

- react
- react-dom
- react-router-dom
- tailwindcss
- framer-motion
- axios
- lucide-react
- vite
- eslint and related plugins

---

This README provides an overview of the HealMate project structure and the main technologies used in both backend and frontend.
