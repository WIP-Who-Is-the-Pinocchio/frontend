import App from "./App";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
=======
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container); // createRoot(container!) if you use TypeScript

>>>>>>> 86bc5a5b072f7c2f97959a330b09a0b0eb174c41
root.render(<App />);
