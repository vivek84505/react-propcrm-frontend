import { lazy } from "react";
import { Navigate } from "react-router-dom";
import CategoryMaster from "../views/ui/CategoryMaster.js";
import ColorMaster from "../views/ui/ColorMaster.js";
import MasterjiAutomation from "../views/ui/MasterjiAutomation.js";
import MasterjiReport from "../views/ui/MasterjiReport.js";
import ProductList from "../views/ui/ProductList.js";
import TodoList from "../views/ui/TodoList.js";
/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const CountryMaster = lazy(() => import("../views/ui/CountryMaster"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/todolist", exact: true, element: <TodoList /> },
      { path: "/countrymaster", exact: true, element: <CountryMaster /> },
      { path: "/categorymaster", exact: true, element: <CategoryMaster /> },
      { path: "/colormaster", exact: true, element: <ColorMaster /> },
      { path: "/masterjireport", exact: true, element: <MasterjiReport /> },
      { path: "/masterjiautomation", exact: true, element: <MasterjiAutomation /> },
      { path: "/productlist", exact: true, element: <ProductList /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
