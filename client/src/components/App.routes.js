import CompleteProfile from "@/components/Scopes/Signup/CompleteProfile";
import Forgot from "@/components/Scopes/Login/Forgot";
import AddDrink from "@/components/Scopes/AddDrink";
import Reset from "@/components/Scopes/Login/Reset";
import Calendar from "@/components/Scopes/Calendar";
import Settings from "@/components/Scopes/Settings";
import Profile from "@/components/Scopes/Profile";
import Signup from "@/components/Scopes/Signup";
import Login from "@/components/Scopes/Login";

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
  },
  {
    path: "/complete-profile",
    exact: true,
    rights: "loggedOut",
    component: CompleteProfile
  }
];
