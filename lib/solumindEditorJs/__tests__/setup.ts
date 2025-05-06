/**
 * Jest setup file for SolumindEditor tests
 */

// Mock DOM elements for testing
global.document.createElement = jest.fn().mockImplementation((tag) => {
  return {
    style: {},
    getAttribute: jest.fn(),
    setAttribute: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
      contains: jest.fn().mockReturnValue(false),
      toggle: jest.fn(),
    },
    appendChild: jest.fn(),
    querySelector: jest.fn().mockReturnValue({}),
    querySelectorAll: jest.fn().mockReturnValue([]),
    children: [],
  };
});

// Mock window
global.window = {
  ...global.window,
  monaco: undefined,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock console methods
global.console = {
  ...global.console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
