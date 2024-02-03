import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        navigate("/", { replace: true });
    }, [logout, navigate]);

    return null;
};

export default LogoutPage;

function useAuth(): { logout: unknown } {
    throw new Error("Function not implemented.");
}
