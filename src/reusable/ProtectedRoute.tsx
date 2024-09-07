import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {user} = useAuth()
    if(!user) return <Navigate to='/login' />

    return (
        <>
           {children}
        </>
    )
}

export default ProtectedRoute;