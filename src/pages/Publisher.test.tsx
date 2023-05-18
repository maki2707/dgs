import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Publishers from './Publishers';

describe('Publishers', () => {
  test('renders publishers table component', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <Publishers />
      </QueryClientProvider>
    );

    const publisherTable = screen.getByTestId('publisherTable');
    expect(publisherTable).toBeInTheDocument();
  });
});
