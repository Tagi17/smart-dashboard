"use client";

import '../app/globals.css'

import { Container, Navbar } from "react-bootstrap";

import { BsExclude } from "react-icons/bs";

export default function NavBar() {
    return (
        <Navbar className="py-3" style={{backgroundColor: "#f310e1", fontSize: "1.9rem" }} bg="light" variant="light" sticky="top">
              <Container className="d-flex align-items-center justify-content-center">
             <div className="d-flex align-items-center"> 
                <BsExclude size={24} className="custom-icon mr-2" />
                <Navbar.Brand href="/" className="text-center">DASHBOARD</Navbar.Brand>
            </div>
            </Container>
        </Navbar>
    );
}