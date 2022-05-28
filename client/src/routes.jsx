import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import LinksPage from './components/LinksPage/LinksPage';
import CreatePage from './components/CreatePage/CreatePage';
import DetailPage from './components/DetailPage/DetailPage';
import Auth from './components/Auth/Auth';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/links" element={<LinksPage />} ></Route>
                    <Route path="/create" element={<CreatePage />} ></Route>
                    <Route path="/detail/:id" element={<DetailPage />} ></Route>
                </Routes>
                <Navigate to="/create" />
            </BrowserRouter>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} ></Route>
            </Routes>
        </BrowserRouter>
    )
};
