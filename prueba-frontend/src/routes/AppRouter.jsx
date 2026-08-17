import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Inventario from "../pages/Inventario";
import Salida from "../pages/Salida";
import Historial from "../pages/Historial";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { Permisos } from "./Permisos";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace/>
            },{
                path: "*",
                element: <NotFound/>
            },{
                path: "/home",
                element: <ProtectedRoute allowedRoles={Permisos.home}><Home/></ProtectedRoute>
            },{
                path: "/inventario",
                element: <ProtectedRoute allowedRoles={Permisos.inventario}><Inventario/></ProtectedRoute>
            },{
                path: "/salida",
                element: <ProtectedRoute allowedRoles={Permisos.salida}><Salida/></ProtectedRoute>
            },{
                path: "/historial",
                element: <ProtectedRoute allowedRoles={Permisos.historico}><Historial/></ProtectedRoute>
            },{
                path: "/login",
                element: <Login/>
            }
        ]
    }
]);

export const AppRouter = () => {
    return <RouterProvider router={router}/>
}