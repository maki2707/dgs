import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Publishers from './Publishers';

const queryClient = new QueryClient();

test('searches for publishers', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <Publishers />
    </QueryClientProvider>
  );


  // Get the search input field
  const searchInput = screen.getByPlaceholderText('Pretraži proizvođače') as HTMLInputElement;

  // Type a search query into the input field
  fireEvent.change(searchInput, { target: { value: 'akc' } });

  // Assert that the search input value has been updated
  expect(searchInput.value).toBe('akc');

  // Get the search results table
  const searchResultsTable = screen.getByTestId('publisherTable');

  // Assert that the search results table is rendered
  expect(searchResultsTable).toBeInTheDocument();

});
