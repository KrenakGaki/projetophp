import {Navigate} from "react-router-dom";

export default function PrivateRoute({children}) {
    const user = localStorage.getItem("token");


    //Se não estiver com usuario logado volta para o login

    if (!user) {
        return <Navigate to="/" replace />;

    }

    // Para o contrário
    return children;
}