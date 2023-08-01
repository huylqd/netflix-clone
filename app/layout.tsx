// 'use client'
import './globals.css'
import Provider from './Provider'
import { QueryClient, QueryClientProvider } from "react-query";
export const metadata = {
  title: 'Netflix',
  description: 'Best OTT platform in the world',
}

// const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {/* <QueryClientProvider client={queryClient}> */}
        <Provider>
          {children}
        </Provider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  )
}
