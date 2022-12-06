import React from 'react';
import App from './App';
import Context from './Context';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Context>
            <App />
        </Context>
    </React.StrictMode>,
);