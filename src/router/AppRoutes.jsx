import {Routes, Route, Navigate} from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthLayout from "../layouts/AuthLayout.jsx";
import {LoginPage} from "../pages/LoginPage.jsx";
import UrlInfoPage from "../pages/UrlInfoPage.jsx";
import {AboutPage} from "../pages/AboutPage.jsx";
import ShortUrlsPage from "../pages/ShortUrlsPage.jsx";
import useAuthHook from "../hooks/useAuthHook.js";

const AppRoutes = () => {
const {isAuthenticated, userId, role}=useAuthHook();
console.log(isAuthenticated, userId, role)
    const ProtectedRoute = ({element}) => {
        return isAuthenticated ? element : <Navigate to={'/login'}/>
    }

    return (
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path={'/login'} element={<LoginPage/> }/>
            </Route>

            <Route element={<MainLayout/>}>
                <Route path="/" element={<ShortUrlsPage/>}/>
                <Route
                    path="/url/:id"
                    element={<ProtectedRoute element={<UrlInfoPage/>}/>}
                />
                <Route path="/about" element={<AboutPage/>}/>
            </Route>
        </Routes>
    );
};

export default AppRoutes;