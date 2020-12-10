import { lazy } from "react";

// prettier-ignore
const CompleteProfile = lazy(() => import('@/components/Scopes/Signup/CompleteProfile'));
const Forgot = lazy(() => import("@/components/Scopes/Login/Forgot"));
const AddDrink = lazy(() => import("@/components/Scopes/AddDrink"));
const Reset = lazy(() => import("@/components/Scopes/Login/Reset"));
const Calendar = lazy(() => import("@/components/Scopes/Calendar"));
const Settings = lazy(() => import("@/components/Scopes/Settings"));
const Profile = lazy(() => import("@/components/Scopes/Profile"));
const Signup = lazy(() => import("@/components/Scopes/Signup"));
const Login = lazy(() => import("@/components/Scopes/Login"));

export default [
  { path: "/", exact: true, rights: "loggedOut", component: Login },
  {
    path: "/signup",
    exact: true,
    rights: "loggedOut",
    component: Signup,
  },
  {
    path: "/login/reset/:token",
    exact: false,
    rights: "loggedOut",
    component: Reset,
  },
  {
    path: "/login/forgot",
    exact: true,
    rights: "loggedOut",
    component: Forgot,
  },

  {
    path: "/home",
    exact: true,
    rights: "private",
    component: Calendar,
  },
  {
    path: "/add-drink",
    exact: true,
    rights: "private",
    component: AddDrink,
  },
  {
    path: "/profile",
    exact: true,
    rights: "private",
    component: Profile,
  },
  {
    path: "/settings",
    exact: true,
    rights: "private",
    component: Settings,
  },
  {
    path: "/complete-profile",
    exact: true,
    rights: "loggedOut",
    component: CompleteProfile,
  },
];
