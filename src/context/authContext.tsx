import { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '../types/User';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextInterface {
    user: IUser | null;
    login: (user: any) => void;
    logout: () => void;
    signup: (email:string, password:string) => void;
    logingoogle: () => void;
    ForgotPassword: (email: any) => void;
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    logingoogle: () => {},
    ForgotPassword: () => {},
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('No enCuentro el provider del login') 
    return context;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);

    const logingoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider);
    }

    const login = async (user: IUser) => {
        const email:any = user?.email;
        const password:any = user?.password;
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        signOut(auth);
        setUser(null);
    };

    const signup = (email:string, password:string) => createUserWithEmailAndPassword(auth, email, password);

    const ForgotPassword = (email:any) => {
        sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
        })
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout, signup, logingoogle, ForgotPassword }}> 
          {children}
        </AuthContext.Provider>
    );
};
