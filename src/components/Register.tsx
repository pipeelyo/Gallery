import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }: { target: { name: string, value: string } }) => {
        setUser({ ...user, [name]: value })
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await signup(user.email, user.password)
            navigate('/')
        } catch (err:any) {
            setError(err?.message)
        }
    }

    return (
        <>
            <h1>Register</h1>
            {error && (<p>{error}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youremail@company.com" onChange={handleChange} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} />

                <button>Register</button>
            </form>
        </>
    )
}

export default Register;