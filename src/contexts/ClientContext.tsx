import { createContext } from "react";

export interface Client {
    id: string;
    name: string;
    description?: string;
    phoneNumber?: string;
    email?: string;
}

interface ClientContextType {
    selectedClient: Client | null;
    setSelectedClient: (client: Client | null) => void;
}

export const ClientContext = createContext<ClientContextType | undefined>(undefined);
