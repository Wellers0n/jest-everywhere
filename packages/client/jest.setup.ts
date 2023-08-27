import 'whatwg-fetch'
import { server } from './src/test/server'
import '@testing-library/jest-dom';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.testing' });

jest.mock('next/navigation', () => require('next-router-mock'))
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('next/dist/client/router', () => require('next-router-mock'))

beforeAll(() => server.listen())
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
