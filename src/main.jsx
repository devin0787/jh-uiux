import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  useParams,
  useLocation,
  Navigate
} from "react-router-dom";
import './index.css'

import App from './App.jsx'
import { AppLocalContextProvider } from './providers/AppProvider.jsx';

import Home from "./pages/Home.jsx";

import Quiz from "./pages/Quiz.jsx";
import VideoIntro from './pages/VideoIntro.jsx';
import InterviewPrep from './pages/InterviewPrep.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import ExpiredPage from './pages/ExpiredPage.jsx';
import { validateInviteParam } from './config/config.jsx';
import { blockedInviteUIDs } from './config/testConfig.js';

const InviteRouter = () => {
  const { param } = useParams();
  const { pathname } = useLocation();

  const inviteUUID = "quick-intro"; // Hardcoded for testing, replace with actual validation logic

  if (inviteUUID == null) {
    return <Navigate to="/404" />;
  }

  if (blockedInviteUIDs.includes(inviteUUID)) {
    return <Navigate to="/expired" />;
  }

  if (pathname == `/invite/${inviteUUID}`) {
    return <Home />;
  } else if (pathname == `/invite/${inviteUUID}/quiz`) {
    return <Quiz />;
  } else if (pathname == `/invite/${inviteUUID}/vintro`) {
    return <VideoIntro />;
  } else if (pathname == `/invite/${inviteUUID}/iprep`) {
    return <InterviewPrep />;
  } else {
    return <Navigate to={`/invite/${inviteUUID}`} />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/invite/:param*",
    element: <InviteRouter />,
  },
  {
    path: "404",
    element: <ErrorPage />
  },
  {
    path: "expired",
    element: <ExpiredPage />
  }
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AppLocalContextProvider>
      <RouterProvider router={router} />
    </AppLocalContextProvider>
  // </StrictMode>,
);