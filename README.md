# React.js Prompt Modal

![GitHub Workflow Status (with branch)](https://img.shields.io/github/actions/workflow/status/Paul-Taiwo/react-prompt-modal/test.yml?branch=main) ![Codecov branch](https://img.shields.io/codecov/c/github/Paul-Taiwo/react-prompt-modal/main?token=AyCugoDQmt) ![NPM](https://img.shields.io/npm/l/react-prompt-modal)

## Features

- Display prompt modals with custom content and options.
- Support for loading state and callback functions.
- Customizable styling and animations.
- Easy integration with React applications.
- Lightweight and dependency-free.

## Installation

Install the package using npm:

```npm install react-prompt-modal```

or using yarn:

```yarn add react-prompt-modal```

## Usage

Import the `createModal` function from the package and use it to create modal instances:


```jsx
import React from "react";
import { createModal } from "react-prompt-modal";
import PropTypes from "prop-types";

// Define your custom component to be used as the modal content
const CustomModalContent = ({ show, isLoading, abort, close, proceed, ...others }) => {
  // Your component code here
};

CustomModalContent.propTypes = {
  show: PropTypes.bool,            // Indicates if the dialog is shown or not (from react-prompt-modal)
  isLoading: PropTypes.bool,       // Indicates whether the modal is in a loading state (from react-prompt-modal)
  abort: PropTypes.func,           // Function to abort and close the modal, triggering any before-close effects if specified (from react-prompt-modal)
  close: PropTypes.func,           // Function to directly close the modal without any additional effects (from react-prompt-modal)
  proceed: PropTypes.func,         // Function to handle the proceed action in the modal (from react-prompt-modal)
};

// Create a modal instance
const { open, close } = createModal({
  component: CustomModalContent,
});

// Trigger the modal
open();
```
You can customize the behavior of the modal by providing additional options:

```jsx
const { open, close, abort, setIsLoading } = createModal({
  component: CustomModalContent,
  proceed: () => {
    // Perform an action when the user clicks "Proceed"
    console.log("Proceed button clicked");
  },
  beforeClose: () => {
    // Perform any necessary cleanup or validation before closing the modal
    console.log("Before closing the modal");
  },
  // Additional options can be provided here
});
```

### API

The `createModal` function accepts the following options:

- `component`: The component to be rendered inside the modal. It should be a valid React component.
- `proceed`: A callback function to be executed when the user clicks the "Proceed" button.
- `beforeClose` (optional): A callback function to be executed before closing the modal.
- Additional options: Any other custom options can be passed and accessed within the modal component.

The `createModal` function returns an object with the following methods:

- `open()`: Opens the modal and displays it to the user.
- `abort()`: Cancels the modal action and closes the modal. If a `beforeClose` callback is provided, it will be executed before closing the modal.
- `close()`: Closes the modal without any additional effects.
- `setIsLoading(loading: boolean)`: Sets the loading state of the modal. Pass true to show a loading indicator, and false to hide it.

## Examples

### Basic Usage

```jsx
import React from "react";
import { createModal } from "react-prompt-modal";

const CustomModalContent = ({ close }) => {
  return (
    <div>
      <h2>Welcome to the Modal</h2>
      <button onClick={close}>Close</button>
    </div>
  );
};

const { open } = createModal({
  component: CustomModalContent,
});

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <button onClick={open}>Open Modal</button>
    </div>
  );
};

export default App;
```

### Customization and Callbacks

```jsx
import React from "react";
import { createModal } from "react-prompt-modal";

const CustomModalContent = ({ abort, proceed }) => {
  return (
    <div>
      <h2>Are you sure you want to proceed?</h2>
      <button onClick={proceed}>Proceed</button>
      <button onClick={abort}>Cancel</button>
    </div>
  );
};

const { open } = createModal({
  component: CustomModalContent,
  proceed: () => {
    console.log("Proceed button clicked");
  },
  beforeClose: () => {
    console.log("Before closing the modal");
  },
});

const App = () => {
  return (
    <div>
      <h1>React App</h1>
      <button onClick={open}>Open Modal</button>
    </div>
  );
};

export default App;
```

You can find examples of how to use the `react-prompt-modal` package in the CodeSandbox demo:

[React Prompt Modal CodeSandbox Bootstrap Examples](https://codesandbox.io/embed/react-prompt-modal-bootstrap-example-grh8pl?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark)

[React Prompt Modal CodeSandbox Chakra UI Examples](https://codesandbox.io/embed/serene-burnell-5h8s7h?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&theme=dark)

## Benefits

- `Simplicity`: React Prompt Modal is designed to be easy to use and integrate into your React applications. It provides a straightforward API for creating and customizing modal dialogs.
- `Flexibility`: The package allows you to create modals with custom content and options tailored to your application's specific needs. You have full control over the modal's behavior and appearance.
- `Lightweight`: React Prompt Modal is a lightweight package with no external dependencies. It won't bloat your project and ensures fast and efficient performance.
- `Customizable Styling`: You can easily customize the styling of the modal component to match your application's design. Apply your own CSS classes or use a CSS-in-JS solution like styled-components.
- `Loading State`: React Prompt Modal supports a loading state, allowing you to indicate progress or data fetching to the user while the modal is open.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## ⭐️ Please Star this Project

If you find this project helpful or valuable, please consider giving it a star on [GitHub](https://github.com/Paul-Taiwo/react-prompt-modal). It's a great way to show your support and it helps the project gain visibility.

Thank you! 🌟

> GitHub [Paul Taiwo](https://github.com/paul-taiwo)