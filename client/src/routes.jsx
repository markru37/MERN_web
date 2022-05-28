import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import CreatePage from './components/CreatePage/CreatePage';
import Auth from './components/Auth/Auth';

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/create" element={<CreatePage />} ></Route>
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
