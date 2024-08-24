# Groq with LangChain

A simple ChatBot using mixtral-8x7b API from Groq with the help of LangChain.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. First, sign up and get a Groq API key from [Groq's website](https://www.groq.com).

2. Create a `.env.local` file in your project root and add your API key:

```bash
VITE_GROQ_API_KEY=your_api_key_here
```

> **Important:** The 'VITE\_' prefix must be appended to the key name, otherwise Vite won't expose it to the client.

3. Install and run the project:

```bash
npm install
npm run dev
```

## Features

List the key features of your project:

- Autoscroll to bottom
- Markdown rendering
- Chat history persistence

## Contributing

Explain how others can contribute to your project. Include guidelines for submitting issues, feature requests, or pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).
