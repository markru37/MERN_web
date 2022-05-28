import { useRoutes } from './routes';
import './App.css';
import 'materialize-css';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';

let App = () => {
    const { token, login, logout, userId } = useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                userId,
                isAuth,
            }}>
            <div className="wrapper_all">
                <div className="_container">{routes}</div>
            </div>
        </AuthContext.Provider>
    );
};

export default App;
