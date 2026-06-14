# StudyFlow

## Project Overview
StudyFlow is a modern Single Page Application (SPA) designed for students to optimize their study schedules and habits. It is built with React 19, powered by Vite for an exceptionally fast and lean development experience, and styled with Tailwind CSS for an effortlessly customizable UI.

## Architecture & File Structure
The project follows a clean and modular architecture to ensure ease of development and scalability. Here's an overview of the primary folders inside the `src/` directory:

- **`src/components/`**: Contains reusable React components, such as those used on the landing page.
- **`src/views/`**: Includes the implementation of the key feature-specific views: Flashcards, Pomodoro with countdown logic, and Calendar.
- **`src/hooks/`**: Custom React hooks for managing state and shared logic across the application.
- **`src/assets/`**: Assets like images and icons, organized in subfolders.

## Features Implemented
1. **Flashcards**: Create, review, and manage flashcards for effective learning.
2. **Pomodoro Timer**: A countdown timer implementing the Pomodoro technique to enhance focus and productivity.
3. **Calendar**: A fully interactive calendar view, preloaded with the month of June 2026.

## Local Setup & Installation
Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd study-flow
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. To build the project for production:
   ```bash
   npm run build
   ```

## Development Workflow
To maintain a clean codebase and avoid merge conflicts, follow these practices:

1. Create a new feature branch from `development` before starting work:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feat/<your-feature-name>
   ```
2. Work on your respective feature inside the appropriate files.
   - For instance, if you're working on the Flashcards feature, modify files inside `src/views/` and utilize any shared components or hooks from `src/components/` and `src/hooks/`.
3. Regularly pull the latest changes from `development` into your branch to stay updated.
   ```bash
   git pull origin development
   ```
4. Push your changes to the remote repository and create a pull request for review.

Let's keep StudyFlow evolving smoothly!