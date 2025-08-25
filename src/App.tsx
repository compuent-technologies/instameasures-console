import {
  RouterProvider,
} from "react-router-dom";
import AppProvider from "./store/provider";
import { Toaster } from "./components/ui/sonner";
import { router } from "./router";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      <Toaster
        position="top-center"
        duration={5000}
        toastOptions={{ className: "text-sm" }}
        richColors
      />
    </AppProvider>
  );
}

export default App;