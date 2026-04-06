import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfills necessários para React Router 7
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
