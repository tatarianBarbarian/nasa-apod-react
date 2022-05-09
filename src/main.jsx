import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mock/serverMock');
    return worker.start()
  }
  return Promise.resolve()
}

const queyClient = new QueryClient(); // FIXME: Move to App.js with provider

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queyClient}>
      <App />
    </QueryClientProvider>
  )
})
