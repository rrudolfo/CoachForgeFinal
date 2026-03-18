import { createHashRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { StandardsLibrary } from "./pages/StandardsLibrary";
import { WinningLoop } from "./pages/WinningLoop";
import { CoachPlaybook } from "./pages/CoachPlaybook";
import { TemplatesSources } from "./pages/TemplatesSources";

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "standards-library", Component: StandardsLibrary },
      { path: "winning-loop", Component: WinningLoop },
      { path: "coach-playbook", Component: CoachPlaybook },
      { path: "templates-sources", Component: TemplatesSources },
    ],
  },
]);
