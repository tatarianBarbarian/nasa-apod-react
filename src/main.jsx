import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

async function prepare() {
  if (import.meta.env.MODE === 'development') {
    const { worker } = await import('./mock/serverMock');
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
