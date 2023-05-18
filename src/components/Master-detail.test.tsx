// At the top of your test file or in a setup file
// Add this mock to simulate the window.matchMedia function
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import CategoryBox from './CategoryBox';
import Publishers from '../pages/Publishers';

describe('App', () => {
  test('renders Navbar component', () => {
    render(
          <CategoryBox />
    );
    const navbarElement = screen.getByTestId('master-header');
    expect(navbarElement).toBeInTheDocument();
  });
});