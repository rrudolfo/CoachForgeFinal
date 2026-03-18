import { RouterProvider } from "react-router";
import { router } from "./routes";
import { EditorProvider } from "./components/editor/EditorProvider";

export default function App() {
  return (
    <EditorProvider>
      <RouterProvider router={router} />
    </EditorProvider>
  );
}
