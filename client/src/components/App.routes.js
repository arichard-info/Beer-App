import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Forgot from "./pages/Login/Forgot";
import Reset from "./pages/Login/Reset";
import Signup from "./pages/Signup";
import CompleteProfile from "./pages/Signup/CompleteProfile";
import AddDrink from "./pages/AddDrink";

export default [
  { path: "/", exact: true, rights: "loggedOut", component: Login },
  {
    path: "/signup",
    exact: true,
    rights: "loggedOut",
    component: Signup
  },
  {
    path: "/login/reset/:token",
    exact: false,
    rights: "loggedOut",
    component: Reset
  },
  {
    path: "/login/forgot",
    exact: true,
    rights: "loggedOut",
    component: Forgot
  },
  {
    path: "/complete-profile",
    exact: true,
    rights: "toComplete",
    component: CompleteProfile
  },
  {
    path: "/home",
    exact: true,
    rights: "private",
    component: Calendar
  },
  {
    path: "/add-drink",
    exact: true,
    rights: "private",
    component: AddDrink
  },
  {
    path: "/profile",
    exact: true,
    rights: "private",
    component: Profile
  },
  {
    path: "/settings",
    exact: true,
    rights: "private",
    component: Settings
  }
];
