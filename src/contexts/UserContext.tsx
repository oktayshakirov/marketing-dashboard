import axios from "axios";
import { ReactNode, createContext, useState } from "react";

interface User {
    name: string;
    role: string;
}

interface ContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (
        name: string,
        role: string,
        email: string,
        location: string,
        status: string,
        tel: string,
        createdAt: string,
    ) => void;
    logout: () => void;
}

export const UserContext = createContext<Partial<ContextProps>>({});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { email, password });
            setUser(response.data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const register = async (
        name: string,
        role: string,
        email: string,
        location: string,
        status: string,
        tel: string,
        createdAt: string,
    ) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                name,
                role,
                email,
                location,
                status,
                tel,
                createdAt,
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error registering:", error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return <UserContext.Provider value={{ user, login, register, logout }}>{children}</UserContext.Provider>;
};
