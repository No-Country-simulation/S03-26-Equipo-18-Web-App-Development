"use client"

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider> 
        {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 5000,
              success: {
                style: {
                  background: '#008F68',
                  color: '#fff',
                },
              },
            }}
          />
      </SessionProvider>
    </>
  );
}
export default Providers;