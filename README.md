# AI Chat App

An interactive AI chat application built with React, Vite, and Clerk authentication.

## Features

- Secure user authentication with Clerk
- Real-time AI chat interface
- Markdown support for AI responses
- Mobile-responsive design with a drawer-style sidebar
- Dark mode UI
- Loading animation for AI responses

## Recent Updates

- Implemented user authentication using Clerk
- Added a sign-in screen for unauthenticated users
- Refactored the main App component to handle authentication state
- Created a separate Sidebar component for better organization
- Improved mobile responsiveness with a drawer-style sidebar
- Added loading animation for AI responses
- Updated styling for better dark mode compatibility
- Integrated Clerk themes for consistent auth UI

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up your environment variables in a `.env.local` file:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_GROQ_API_KEY=your_groq_api_key
   ```
4. Run the development server with `npm run dev`

## Technologies Used

- React
- Vite
- Clerk (for authentication)
- Tailwind CSS
- DaisyUI
- Marked (for Markdown parsing)
- Langchain (for AI integration)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
