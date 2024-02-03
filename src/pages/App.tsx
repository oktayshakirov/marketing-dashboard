import ErrorBoundary from "@components/ErrorBoundary";
import FullscreenLoader from "@components/FullscreenLoader";
import ClientProvider from "@contexts/ClientProvider";
import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Analytics from "./Analytics";
import Board from "./Board";
import Calendar from "./Calendar";
import Campaigns from "./Campaigns";
import Chat from "./Chat";
import Files from "./Files";
import { default as Login, default as Logout } from "./Login";
import MainLayout from "./MainLayout";
import Overview from "./Overview";
import Profile from "./Profile";
import Settings from "./Settings";
import Summary from "./Summary";
import Users from "./Users";
import Videocall from "./Videocall";

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
                    element: <Overview />,
                },
                {
                    path: "analytics",
                    element: <Analytics />,
                },
                {
                    path: "board",
                    element: <Board />,
                },
                {
                    path: "calendar",
                    element: <Calendar />,
                },
                {
                    path: "campaigns",
                    element: <Campaigns />,
                },
                {
                    path: "chat",
                    element: <Chat />,
                },
                {
                    path: "files",
                    element: <Files />,
                },
                {
                    path: "profile",
                    element: <Profile />,
                },
                {
                    path: "settings",
                    element: <Settings />,
                },
                {
                    path: "summary",
                    element: <Summary />,
                },
                {
                    path: "users",
                    element: <Users />,
                },
                {
                    path: "videocall",
                    element: <Videocall />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                {
                    path: "/logout",
                    Component: Logout,
                    errorElement: <ErrorBoundary />,
                },
            ],
        },
    ]);
    return (
        <ClientProvider>
            <RouterProvider router={router} fallbackElement={<FullscreenLoader />} />
        </ClientProvider>
    );
};

export default App;
