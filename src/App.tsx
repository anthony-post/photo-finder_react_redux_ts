import "./App.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
