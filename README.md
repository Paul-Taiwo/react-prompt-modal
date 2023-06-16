# React Prompt Modal

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
import createModal from "react-prompt-modal";

// Define your custom component to be used as the modal content
const CustomModalContent = ({ close }) => {
  return (
    <div>
      <h2>Welcome to the Modal</h2>
      <button onClick={close}>Close</button>
    </div>
  );
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
const { open, close, setIsLoading } = createModal({
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
- `close()`: Closes the modal.
- `setIsLoading(loading: boolean)`: Sets the loading state of the modal. Pass true to show a loading indicator, and false to hide it.

## Examples

### Basic Usage

```jsx
import React from "react";
import createModal from "react-prompt-modal";

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
import createModal from "react-prompt-modal";

const CustomModalContent = ({ close, proceed }) => {
  return (
    <div>
      <h2>Are you sure you want to proceed?</h2>
      <button onClick={proceed}>Proceed</button>
      <button onClick={close}>Cancel</button>
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

## Benefits

- `Simplicity`: React Prompt Modal is designed to be easy to use and integrate into your React applications. It provides a straightforward API for creating and customizing modal dialogs.
- `Flexibility`: The package allows you to create modals with custom content and options tailored to your application's specific needs. You have full control over the modal's behavior and appearance.
- `Lightweight`: React Prompt Modal is a lightweight package with no external dependencies. It won't bloat your project and ensures fast and efficient performance.
- `Customizable Styling`: You can easily customize the styling of the modal component to match your application's design. Apply your own CSS classes or use a CSS-in-JS solution like styled-components.
- `Loading State`: React Prompt Modal supports a loading state, allowing you to indicate progress or data fetching to the user while the modal is open.

## License

This package is licensed under the [MIT License](https://opensource.org/licenses/MIT).

> GitHub [Paul Taiwo](https://github.com/paul-taiwo)