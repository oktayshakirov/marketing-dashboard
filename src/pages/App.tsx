import ErrorBoundary from "@components/ErrorBoundary";
import FullscreenLoader from "@components/FullscreenLoader";
import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Analytics from "./Analytics";
import Board from "./Board";
import Calendar from "./Calendar";
import Campaigns from "./Campaigns";
import Chat from "./Chat";
import Files from "./Files";
import LandingPage from "./Landing";
import MainLayout from "./MainLayout";
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
                    element: <LandingPage />,
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
            ],
        },
    ]);
    return <RouterProvider router={router} fallbackElement={<FullscreenLoader />} />;
};

export default App;
