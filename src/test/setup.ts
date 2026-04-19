import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills necessários para React Router 7
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextEncoder = TextEncoder as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.TextDecoder = TextDecoder as any;

