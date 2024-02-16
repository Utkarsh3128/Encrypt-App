import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Result from "./Components/Result.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { ResultProvider } from "./Components/resultContext.jsx";

const router = createBrowserRouter([
  {
    path: "/Encrypt-App/",
    element: <App />,
  },
  {
    path: "/result",
    element: <Result />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResultProvider>
      <RouterProvider router={router}>
        <Routes>
          <Route path="/Encrypt-App/" element={<App />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </RouterProvider>
    </ResultProvider>
  </React.StrictMode>
);
