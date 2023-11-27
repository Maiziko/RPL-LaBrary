import App from "../../../pages/_app";
import { render, screen } from '@testing-library/react';

test('renders Next.js App component', () => {
  render(<App Component={() => <div>Hello, Jest!</div>} pageProps={{}} />);
  const linkElement = screen.getByText(/Hello, Jest!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Next.js App component with custom component and pageProps', () => {
  const CustomComponent = () => <div>Custom Component</div>;
  render(<App Component={CustomComponent} pageProps={{ customProp: 'Custom Prop' }} />);
  const customComponentElement = screen.getByText(/Custom Component/i);
  const customPropElement = screen.getByText(/Custom Prop/i);
  expect(customComponentElement).toBeInTheDocument();
  expect(customPropElement).toBeInTheDocument();
});

// Contoh menggunakan jest.mock untuk memalsukan pemanggilan API
jest.mock('../services/api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ data: 'mocked data' })),
}));

test('fetches data and renders it', async () => {
  render(<App Component={() => <div>Loading...</div>} pageProps={{}} />);
  // Tunggu pemanggilan API selesai
  await screen.findByText(/mocked data/i);
  // Lakukan pengujian setelah pemanggilan API selesai
  const dataElement = screen.getByText(/mocked data/i);
  expect(dataElement).toBeInTheDocument();
});
