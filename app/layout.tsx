import './globals.css'

import { Container, SSRProvider } from '@/app/components/bootstrap';

import ApplyCustomFont from './clientFont';
import Head from 'next/head';
import NavBar from './NavBar'
import css from 'styled-jsx/css';

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
        <SSRProvider>
        <NavBar /> 
          <main>
            <Container> 
                {children}
              </Container>
          </main>
        </SSRProvider>
      </body>
    </html>
    </>
  );
}
