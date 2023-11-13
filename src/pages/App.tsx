import ErrorBoundary from "@components/ErrorBoundary";
import FullscreenLoader from "@components/FullscreenLoader";
import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LandingPage from "./Landing";
import MainLayout from "./MainLayout";

const App: React.FC = () => {
    const router = createBrowserRouter([
        {
            id: "root",
            path: "/",
            element: (
                <Suspense fallback={<FullscreenLoader />}>
                    <MainLayout />
                </Suspense>
            ),
            errorElement: <ErrorBoundary navigateTo="/" />,
            children: [
                {
                    index: true,
                    Component: LandingPage,
                },
            ],
        },
    ]);
    return <RouterProvider router={router} fallbackElement={<FullscreenLoader />} />;
};

export default App;
