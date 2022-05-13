import { describe } from "vitest";
import { fetchApodData } from "../api";
import { setupServer } from 'msw/node';
import { handler } from '../mock/handler';
import { rest } from 'msw';
import { API_URL } from "../api";

const server = setupServer(handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('api', () => {
    it('should return data if service returns it', async () => {
        const data = await fetchApodData('2022-05-13');

        expect(JSON.stringify(data)).toMatchSnapshot()
    })

    it('should throw an error if service returns data with error', async () => {
        server.use(rest.get(API_URL, async (req, res, ctx) => {
            return res(ctx.json({msg: errorMessage, code: 400}))
        }))

        expect(fetchApodData('2022-05-13')).rejects.toThrowErrorMatchingSnapshot();
    })

    it('should throw an error if network error occured', () => {
        server.use(rest.get(API_URL, async (req, res, ctx) => {
            return res.networkError('Network error occured!');
        }))

        expect(fetchApodData('2022-05-13')).rejects.toThrowError();
    })
})
