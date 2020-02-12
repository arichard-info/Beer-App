import Grid from "./Grid";
import AddBeer from "./AddBeer";

export default [
  {
    path: "/home",
    rights: "private",
    component: Grid,
    exact: true
  },
  {
    path: "/home/add-beer",
    rights: "private",
    component: AddBeer,
    exact: true
  }
];
