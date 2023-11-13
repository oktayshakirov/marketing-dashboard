import { useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Navigate, useRouteError } from "react-router-dom";

export type ErrorBoundaryProps = {
    navigateTo?: string;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
    const error = useRouteError();
    const toast = useToast();

    useEffect(() => {
        toast({
            title: "ERROR",
            description: (error as Error)?.message ? (error as Error).message : "Something went wrong",
            status: "error",
            isClosable: true,
        });
    }, [error, toast]);
    return props.navigateTo ? <Navigate to={props.navigateTo} replace={true} /> : null;
};

export default ErrorBoundary;
