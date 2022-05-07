import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queyClient = new QueryClient(); // FIXME: Move to App.js with provider

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <QueryClientProvider client={queyClient}>
    <App />
  </QueryClientProvider>
  // </React.StrictMode>
)
