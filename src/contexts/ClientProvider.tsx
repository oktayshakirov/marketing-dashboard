import React, { ReactNode, useState } from "react";
import { Client, ClientContext } from "./ClientContext"; // Ensure the path is correct

interface ClientProviderProps {
    children: ReactNode;
}

const ClientProvider: React.FC<ClientProviderProps> = ({ children }) => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    return <ClientContext.Provider value={{ selectedClient, setSelectedClient }}>{children}</ClientContext.Provider>;
};

export default ClientProvider;
