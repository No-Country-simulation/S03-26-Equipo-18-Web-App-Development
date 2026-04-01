"use client"

import { Toaster } from "react-hot-toast";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
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

      </>
  );
}
export default Providers;