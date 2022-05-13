import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

console.log(import.meta.env);

async function prepare() {
  if (import.meta.env.DEV && !import.meta.env.TEST) {
    const { worker } = await import('./mock/worker');
    return worker.start()
  }
  return Promise.resolve()
}

const queyClient = new QueryClient();

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queyClient}>
      <App />
    </QueryClientProvider>
  )
})
