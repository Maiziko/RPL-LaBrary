import Sidebar from "@src/components/Sidebar";
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


// Mock the next/router module
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: () => ({ push: jest.fn() }),
}));

// Mock the supabase module
jest.mock('../../supabase', () => ({
  supabase: {
    from: (tableName: string) => ({
      select: jest.fn().mockResolvedValue({
        data: {
          full_name: 'John Doe',
          email: 'john.doe@example.com',
          avatar_url: '/images/ProfilePictureSideMenu.svg',
        },
        error: null,
      }),
    }),
    auth: {
      signOut: jest.fn().mockResolvedValue({ error: null }),
    },
  },
}));

describe('Sidebar component', () => {
  it('renders without crashing', async () => {
    render(<Sidebar />);
    // Check if the component renders without crashing
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('fetches profile data on mount', async () => {
    render(<Sidebar />);
    // Check if the component fetches profile data on mount
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
  });

  it('handles logout click', async () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByText('Log Out'));

    // Check if the logout click triggers the supabase.auth.signOut function
    expect((await screen.findByText('User logged out successfully'))).toBeInTheDocument();
  });

  // Add more tests as needed
});
