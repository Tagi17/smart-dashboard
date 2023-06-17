"use client";

import '../.next/static/css/app/layout.css';

import { Container, Navbar } from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar className="py-3" style={{backgroundColor: "#f310e1" }} bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
            </Container>
        </Navbar>
    );
}