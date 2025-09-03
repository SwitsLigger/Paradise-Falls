import { ErrorBoundary } from "@/components/ErrorBoundary";
import Layout from "@/components/Layout";
import Welcome from "@/pages/Welcome";
import PreviewPage from "@/pages/Preview";
import { createBrowserRouter } from "react-router";
import WelcomeFirstScreenProvider from "@/pages/Welcome/FirstStep/Provider";

const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        ErrorBoundary: ErrorBoundary,
        children: [
            {
                index: true,
                Component: WelcomeFirstScreenProvider
            },
            {
                path: "preview",
                Component: PreviewPage
            },
            {
                path: "welcome",
                Component: WelcomeFirstScreenProvider
            },
            {
                path: "welcome/:step",
                Component: Welcome
            },
            {
                path: "preview",
                Component: PreviewPage
            },
            {
                path: "*",
                Component: WelcomeFirstScreenProvider
            }
        ],
    },
]);

export default router;