import './globals.css'

import {GetRainbowKitProvider, wagmiConfig} from './rainbowKit';

import ApplyCustomFont from './clientFont';
import { Container } from '@/app/components/bootstrap';
import NavBar from './NavBar'
import css from 'styled-jsx/css';

// import DarkModeToggle from '../components/ui/dark-mode-toggle';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
       <body>
        <ApplyCustomFont />
        {/* <NavBar />  */}
          <main>
              {/* <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
              > */}
                {/* <ModeToggle /> */}
                  <GetRainbowKitProvider wagmiConfig={wagmiConfig}>
                    {children}
                  </GetRainbowKitProvider >
              {/* </ThemeProvider> */}
          </main>
      </body>
    </html>
    </>
  );
}
