import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";

import createModal from "../createModal";

type MockedRoot = Root & {
  render: jest.Mock;
  unmount: jest.Mock;
};

const createRootMock = createRoot as jest.MockedFunction<typeof createRoot>;

jest.mock("react-dom/client");

describe("createModal", () => {
  let mockComponent: jest.Mock;
  let mockProps: { show: boolean; isLoading: boolean; close: jest.Mock; abort: jest.Mock };
  let mockRoot: MockedRoot;

  beforeEach(() => {
    mockComponent = jest.fn();
    mockProps = {
      show: true,
      isLoading: false,
      close: jest.fn(),
      abort: jest.fn(),
    };
    mockComponent.mockReturnValue(createElement("div", mockProps));

    mockRoot = {
      render: jest.fn(),
      unmount: jest.fn(),
    };

    createRootMock.mockReturnValue(mockRoot);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal component", () => {
    const options = {
      component: mockComponent,
      proceed: jest.fn(),
      beforeClose: jest.fn(),
    };

    const { open, close } = createModal(options);

    open();

    expect(createRootMock).toHaveBeenCalledWith(document.createElement("modal-root"));
    expect(mockRoot.render).toHaveBeenCalledWith(
      createElement(mockComponent, {
        close: expect.any(Function),
        abort: expect.any(Function),
        isLoading: false,
        proceed: expect.any(Function),
        show: true,
      }),
    );

    close(); //close modal at the end of the test
  });

  it("should close the modal", () => {
    const options = {
      component: mockComponent,
    };

    const { open, close } = createModal(options);
    open();
    close();

    expect(mockRoot.unmount).toHaveBeenCalled();
  });

  it("should call beforeClose when abort is used to close the modal", () => {
    const options = {
      component: mockComponent,
      beforeClose: jest.fn(),
    };

    const { open, abort } = createModal(options);
    open();
    abort();

    expect(mockRoot.unmount).toHaveBeenCalled();
    expect(options.beforeClose).toHaveBeenCalled();
  });

  it("should set isLoading flag and render the modal", () => {
    const options = {
      component: mockComponent,
    };

    const { setIsLoading, open } = createModal(options);
    open();
    setIsLoading(true);

    const updatedModalProps = {
      show: true,
      isLoading: true,
      abort: expect.any(Function),
      close: expect.any(Function),
    };

    expect(mockRoot.render).toHaveBeenCalledWith(createElement(mockComponent, updatedModalProps));
  });

  it("should throw an error for invalid component", () => {
    const options = {
      component: undefined,
    };

    // @ts-ignore
    expect(() => createModal(options)).toThrow("A valid component must be provided.");
  });
});
