# Resource Manager

My first Electron.js desktop app following [this tutorial](https://www.youtube.com/watch?v=fP-371MN0Ck).

## Features

-   **Language**: TypeScript
-   **Frontend**: React
-   **Backend**: Electron
-   **Bundler**: Vite
-   **Packaging**: Electron-Builder

## Getting Started

1. **Install dependencies (`node_modules`)**:

    ```bash
    npm install
    ```

2. **Transpile electron files (optional)**:

    ```bash
    npm run transpile:electron
    ```

3. **Run development mode (`dev:react`, `dev:electron`, `transpile:electron`)**:
    ```bash
    npm run dev
    ```

## Building for Production

1. **Build the project locally**:

    ```bash
    npm run build
    ```

2. **Create a distributable package** for a specific OS:

    - **Windows**:

        ```bash
        npm run dist-win
        ```

    - **macOS**:

        ```bash
        npm run dist-mac
        ```

    - **Linux**:

        ```bash
        npm run dist-linux
        ```
