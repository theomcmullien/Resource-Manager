
# Electron Template

This is a template for building cross-platform desktop applications using Electron, React, and TypeScript.

## Features

-   **Backend**: Electron
-   **Frontend**: React
-   **Frontend and Backend Language**: TypeScript
-   **Bundler**: Vite
-   **Packaging**: Electron-Builder (for macOS, Linux, and Windows)

## Getting Started

1. **Build the project**:
    ```bash
    npm run build
    ```

2. **Transpile Electron files separately (optional)**:

    ```bash
    npm run transpile:electron
    ```

3. **Start development mode (includes transpiling Electron)**:
    ```bash
    npm run dev
    ```

## Building for Production

To create a distributable package for a specific OS, run one of the following commands:

-   **For macOS**:

    ```bash
    npm run dist-mac
    ```

-   **For Windows**:

    ```bash
    npm run dist-win
    ```

-   **For Linux**:
    ```bash
    npm run dist-linux
    ```

## Additional Commands

-   **Lint the project**:

    ```bash
    npm run lint
    ```

-   **Preview the production build**:
    ```bash
    npm run preview
    ```

## Notes

This template leverages Vite for bundling, Electron for the backend, and Electron-Builder for creating OS-specific packages.

```

This version keeps all the content intact and formatted correctly in Markdown. Let me know if any other changes are needed!
```