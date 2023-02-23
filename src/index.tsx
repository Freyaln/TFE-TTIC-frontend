import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './App';
import { Provider } from 'react-redux';
import IndexRouter from './components/router/Router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 1440,
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <IndexRouter />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);
