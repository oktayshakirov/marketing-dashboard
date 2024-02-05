import { Button, Flex, Heading, Image, Input, VStack, Wrap } from "@chakra-ui/react";
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
    ) => Promise<void>;
    logout: () => void;
}

const defaultContext: ContextProps = {
    user: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
};

export const UserContext = createContext<ContextProps>(defaultContext);

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

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (method: string) => {
        if (method === "email") {
            // ...
        } else if (method === "google") {
            // ...
        } else if (method === "fake") {
            // ...
        }
    };

    return (
        <Flex direction="column" w={"100%"} h="100vh" alignItems={"center"} bgSize="cover" pt="30px">
            <VStack>
                <Image src="/ogno.svg" alt="Ogno Logo" />
                <VStack mt={2}>
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        w={"85%"}
                        mt={2}
                        variant="solid"
                        bg={"brand.gray.50"}
                        color={"brand.gray.400"}
                        borderRadius={"9999px"}
                        borderColor="brand.gray.900"
                        borderWidth="2px"
                        size="lg"
                        onClick={() => handleLogin("email")}
                    >
                        Login
                    </Button>
                    <Heading color={"brand.gray.500"} size="lg" pb={2}>
                        or
                    </Heading>
                    <Button
                        w={"85%"}
                        mb={2}
                        variant="solid"
                        bg={"brand.gray.50"}
                        color={"brand.gray.400"}
                        borderRadius={"9999px"}
                        borderColor="brand.gray.900"
                        borderWidth="2px"
                        size="lg"
                        onClick={() => handleLogin("google")}
                    >
                        Connect with Google
                    </Button>
                    {import.meta.env.DEV && (
                        <Button
                            w={"85%"}
                            mb={2}
                            variant="solid"
                            bg={"brand.gray.50"}
                            color={"brand.gray.400"}
                            borderRadius={"9999px"}
                            borderColor="brand.gray.900"
                            borderWidth="2px"
                            size="lg"
                            onClick={() => handleLogin("fake")}
                        >
                            Fake Login
                        </Button>
                    )}
                    <Wrap
                        fontSize={"xs"}
                        color={"brand.gray.500"}
                        justify={"center"}
                        spacing={0}
                        lineHeight={"125%"}
                        m={2}
                    >
                        By signing up, you agree to the Terms of Service and Privacy Policy, including cookie use.
                    </Wrap>
                </VStack>
            </VStack>
        </Flex>
    );
};

export default Login;
