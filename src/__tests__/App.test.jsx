import { describe } from 'vitest';
import App from '../App';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { setupServer } from 'msw/node';
import { handler } from '../mock/handler';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event'
import { API_URL } from '../api';

const server = setupServer(handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

setLogger({
    error: () => {},
    warn: console.warn,
    log: console.log,
})

const Wrapped = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
};

describe('App', () => {
    it('should render spinner while fetching data', async () => {
        render(<Wrapped />);

        const spinner = screen.getByTestId('spinner')
        expect(spinner).toBeInTheDocument();
        expect(spinner).toBeVisible();
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

    it('should display pic info when asked', async () => {
        render(<Wrapped />)

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'));
        await userEvent.click(screen.getByTestId('aboutBtn'))

        expect(screen.getByText(/today's pic/i)).toBeInTheDocument()
        expect(screen.getByText(/today's pic/i)).toBeVisible()
    })

    it('should display error messages from api', async () => {
        const errorMessage = 'Error happened!';

        server.use(rest.get(API_URL, async (req, res, ctx) => {
            return res(ctx.json({msg: errorMessage, code: 400}))
        }))

        render(<Wrapped />)

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))

        const message = screen.getByText(new RegExp(errorMessage, 'i'))

        expect(message).toBeInTheDocument()
        expect(message).toBeVisible()
        expect(message.textContent).toMatchInlineSnapshot('"Error 400: Error happened!"')
    })

    it('should load previous day picture when clicked on prev button', async () => {
        const {container} = render(<Wrapped />)

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
        await userEvent.click(screen.getByTestId('prevBtn'))
        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))

        expect(container).toMatchSnapshot()
    })

    it.todo('displays disabled previous day button if date is today')

    it('should load next day picture when clicked on next button', async () => {
        const {container} = render(<Wrapped />)

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
        await userEvent.click(screen.getByTestId('prevBtn'))
        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
        await userEvent.click(screen.getByTestId('nextBtn'))

        expect(container).toMatchSnapshot()
    })

    it.todo('displays disabled next day button if date is today')

    it('[flaky]should display today photo if today button clicked', async () => {
        const {container} = render(<Wrapped />)

        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
        await userEvent.click(screen.getByTestId('prevBtn'))
        await waitForElementToBeRemoved(() => screen.getByTestId('spinner'))
        await userEvent.click(screen.getByTestId('todayBtn'))

        expect(container).toMatchSnapshot()
    })

    it('should display application info if about button clicked', async () => {
        render(<Wrapped />)
        
        await userEvent.click(screen.getByTestId('appInfoBtn'))
        const info = screen.getByTestId('appInfo')
        
        expect(info).toMatchSnapshot()
    })
})
