import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./preload.tsx"

createRoot(document.getElementById("root")!).render(<App />);
