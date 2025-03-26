import './App.css'
import {BrowserRouter} from "react-router-dom";
import AppRoutes from "./router/AppRoutes.jsx";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <SnackbarProvider>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
        </SnackbarProvider>
    )
}

export default App
