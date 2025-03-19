import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthProvider from "./components/providers/AuthProvider";
import RecoilProvider from "./components/providers/RecoilProvider";

createRoot(document.getElementById("root")!).render(
  <RecoilProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </RecoilProvider>
);
