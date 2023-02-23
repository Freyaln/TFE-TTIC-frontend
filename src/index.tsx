import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store } from './App';
import { Provider } from 'react-redux';
import IndexRouter from './components/router/Router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <IndexRouter />
        </Provider>
    </React.StrictMode>,
);
