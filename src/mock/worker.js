import { setupWorker } from "msw";
import { handler } from "./serverMock";

export const worker = setupWorker(handler);
