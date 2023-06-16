import { ComponentType, ReactElement, createElement } from "react";
import { createRoot, Root } from "react-dom/client";
import PropTypes from "prop-types";

interface ModalProps {
  show: boolean;
  isLoading: boolean;
  close: () => void;
  proceed?: () => void;
  [key: string]: unknown;
}

interface CreateModalOptions {
  component: ComponentType<ModalProps>;
  proceed?: () => void;
  beforeClose?: () => void;
  [key: string]: unknown;
}

interface CreateModalReturn {
  open: () => void;
  close: () => void;
  setIsLoading: (loading: boolean) => void;
}

let modalRoot: Root | null = null;

const createModal = ({
  component: Component,
  proceed,
  beforeClose,
  ...others
}: CreateModalOptions): CreateModalReturn => {
  let isLoading = false;

  if (!Component || typeof Component !== "function") {
    throw new Error("A valid component must be provided.");
  }

  const unmount = (): void => {
    if (modalRoot) {
      modalRoot.unmount();
      modalRoot = null;
    }
  };

  const closeModal = (): void => {
    if (beforeClose && typeof beforeClose === "function") {
      beforeClose();
    }
    unmount();
  };

  const renderModal = (): void => {
    const props: ModalProps = {
      show: true,
      isLoading,
      close: closeModal,
      proceed,
      ...others,
    };

    const modalComponent: ReactElement = createElement(Component, props);

    if (modalRoot) {
      modalRoot.render(modalComponent);
    } else {
      modalRoot = createRoot(document.createElement("modal-root"));
      modalRoot.render(modalComponent);
    }
  };

  const mount = (): void => {
    renderModal();
  };

  const open = (): void => {
    mount();
  };

  return {
    open,
    close: closeModal,
    setIsLoading: (loading: boolean): void => {
      isLoading = loading;
      renderModal();
    },
  };
};

createModal.propTypes = {
  component: PropTypes.elementType.isRequired,
  proceed: PropTypes.func,
};

export default createModal;
