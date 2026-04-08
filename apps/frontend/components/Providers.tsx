"use client";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          success: {
            style: {
              background: "#008F68",
              color: "#fff",
            },
          },
        }}
      />
    </AuthProvider>
  );
};
export default Providers;
