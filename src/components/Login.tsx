import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { login, logingoogle } = useAuth();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await login(user)
            navigate('/')
        } catch (err:any) {
            setError(err?.message)
        }
    }

    const handleGoogleLogin = async () => {
        await logingoogle()
        navigate('/login')
    }

    return (
        <>
            <h1>Login</h1>
            {error && (<p>{error}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youremail@company.com" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />

                <button>Login</button>
            </form>
            <button onClick={handleGoogleLogin}>Google login</button>
        </>
    )
}

export default Login;