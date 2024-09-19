import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import FindBuddy from "./FindBuddy";
import { useState } from "react";
import Image from "react-bootstrap/Image";


var isLoggedIn = true;

const FirstHeader = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Social Help App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link
              to="faqs"
              className="nav-link"
              style={{ color: "#091e3f", marginRight: "50px" }}
            >
              FAQ
            </Link>
            <Link
              to="about"
              className="nav-link"
              style={{ color: "#091e3f", marginRight: "50px" }}
            >
              About
            </Link>
            <Link
              to="login"
              className="nav-link"
              style={{ color: "#091e3f", marginRight: "50px" }}
            >
              Log in
            </Link>
            <Link
              className="btn btn-outline-primary"
              role="button"
              to="signup"
              id="navbutton"
            >
              Sign up
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const SecondHeader = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FindBuddy show={showModal} onHide={() => setShowModal(false)} />
      <Navbar
        expand="lg"
        style={{
          paddingTop: "0px",
          paddingBottom: "0px",
          paddingLeft: "100px",
          paddingRight: "15px",
        }}
      >
        <Image src="logo.png" style={{ width: "6rem" }} />
        <Nav className="ms-auto">
          <Link
            onClick={() => setShowModal(true)}
            to="#"
            className="nav-link"
            style={{
              color: "#091e3f",
              marginRight: "50px",
            }}
          >
            Become a buddy
          </Link>
          <Link
            to="#"
            className="nav-link"
            style={{ color: "#091e3f", marginRight: "50px" }}
          >
            Become a licensed professional
          </Link>
          {/*Profile Image was here*/}
        </Nav>
      </Navbar>
    </>
  );
};

const Header = () => {
  return <SecondHeader />;

   //return isLoggedIn ? <FirstHeader /> : <SecondHeader />;
};

export default Header;
