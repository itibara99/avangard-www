import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AvangardPage from './pages/AvangardPage.tsx';
import './index.css';
import CeilingPage from "./pages/CeilingPage.tsx";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { RouteTracker } from './components/RouteTracker';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <RouteTracker />
            <Routes>
                <Route path="/" element={<AvangardPage />} />
                <Route path="/ceiling" element={<CeilingPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
