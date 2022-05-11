import { describe } from 'vitest';
import App from '../App';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setupServer } from 'msw/node';
import { handler } from '../mock/handler';

const server = setupServer(handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const Wrapped = () => (
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);

describe('App', () => {
    it('should render spinner while fetching data', async () => {
        render(<Wrapped />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('should disable controls while fetching data', async () => {
        render(<Wrapped />);

        expect(screen.getByTestId('prevBtn')).toBeDisabled();
        expect(screen.getByTestId('nextBtn')).toBeDisabled();
        expect(screen.getByTestId('randomBtn')).toBeDisabled();
        expect(screen.getByTestId('aboutBtn')).toBeDisabled();
        expect(screen.getByTestId('todayBtn')).toBeDisabled();
        expect(screen.getByTestId('datepicker')).toBeDisabled();

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));

        expect(screen.getByTestId('prevBtn')).not.toBeDisabled();
        expect(screen.getByTestId('nextBtn')).not.toBeDisabled();
        expect(screen.getByTestId('randomBtn')).not.toBeDisabled();
        expect(screen.getByTestId('aboutBtn')).not.toBeDisabled();
        expect(screen.getByTestId('todayBtn')).not.toBeDisabled();
        expect(screen.getByTestId('datepicker')).not.toBeDisabled();
    });
})
