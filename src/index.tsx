import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from './styles/theme';
import { grey } from '@mui/material/colors';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const globalStyles = {
    body: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: `100vh`,
        width: '100vw',
        margin: 0,
        background: grey[900]
    }
};

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles styles={globalStyles} />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);