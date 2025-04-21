import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setDefaultOptions } from 'date-fns';

setDefaultOptions({ weekStartsOn: 1 });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <link rel="stylesheet" href="https://cdn.svar.dev/fonts/wxi/wx-icons.css" />
    <App />
  </StrictMode>
);
