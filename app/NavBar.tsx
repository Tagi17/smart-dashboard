"use client";

import { Container, Navbar } from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar bg="light" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
            </Container>
        </Navbar>
    );
}