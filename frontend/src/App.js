import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/MainPage";
import PotListPage from "./pages/PotListPage";
import RootLayout from "./pages/Root";
import KidListPage from "./pages/KidListPage";
import PotCreatePage from "./pages/PotCreatePage";
import PotDetailPage from "./pages/PotDetailPage";
import KidCreatePage from "./pages/KidCreatePage";
import KidDetailPage from "./pages/KidDetailPage";
import KidSelectPage from "./pages/KidSelectPage";
import TalkListPage from "./pages/TalkListPage";
import TalkDetailPage from "./pages/TalkDetailPage";
import LandingPage from "./pages/LandingPage";
import CollectionPage from "./pages/CollectionPage";
import KidsModeRootLayout from "./pages/KidsModeRoot";
import KidsModeDetailLayout from "./pages/KidsModeDetail";
import KidsModePotPage from "./pages/KidsModePotPage";
import KidsModeCollectionPage from "./pages/KidsModeCollectionPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <MainPage /> },

      { path: "/kids", element: <KidListPage /> },
      { path: "/kid/create", element: <KidCreatePage /> },
      { path: "/kid/:userId", element: <KidDetailPage /> },

      { path: "/pot", element: <PotListPage /> },
      { path: "/pot/create", element: <PotCreatePage /> },
      { path: "/pot/:potId", element: <PotDetailPage /> },

      { path: "/talk", element: <TalkListPage /> },
      { path: "/talk/:talkId", element: <TalkDetailPage /> },

      { path: "/collection/:userId", element: <CollectionPage /> },
      { path: "/profile", element: <KidDetailPage /> },
    ],
  },
  {
    path: "/kidsmode",
    element: <KidsModeRootLayout />,
    children: [
      {
        index: true,
        element: <KidSelectPage />,
      },
      {
        path: "/kidsmode/:userId",
        element: <KidsModeDetailLayout />,
        children: [
          { index: true, element: <KidsModePotPage /> },
          {
            path: "/kidsmode/:userId/collection",
            element: <KidsModeCollectionPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/hello",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  return (
    <div className="mx-auto min-h-screen max-w-page bg-amber-overlay">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
