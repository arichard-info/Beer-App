import CompleteProfile from "@/components/pages/Signup/CompleteProfile";
import Forgot from "@/components/pages/Login/Forgot";
import AddDrink from "@/components/pages/AddDrink";
import Reset from "@/components/pages/Login/Reset";
import Calendar from "@/components/pages/Calendar";
import Settings from "@/components/pages/Settings";
import Profile from "@/components/pages/Profile";
import Signup from "@/components/pages/Signup";
import Login from "@/components/pages/Login";

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
