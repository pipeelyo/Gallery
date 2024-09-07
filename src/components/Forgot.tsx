import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Forgot = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { ForgotPassword } = useAuth();
    const [error, setError] = useState<any>();

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            await ForgotPassword(email)
            navigate('/login')
            setError('Te hemos enviado un email para restablecer la constraseña')
        } catch (err:any) {
            setError(err?.message)
        }
    }

    const handleChange = (e:any) => {
        setEmail(e.target.value)
    };

    return (
        <>
            <h1>Login</h1>
            {error && (<p>{error}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="youremail@company.com" onChange={handleChange} />
                <button>Reset password</button>
            </form>
        </>
    )
}

export default Forgot;