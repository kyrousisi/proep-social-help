import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Card className="text-center" text="white" expand="lg" id="footer">
      <Row md={3} className="g-4">
        <Col>
          <Card.Body>
            <Card.Title>CONTACT US</Card.Title>
            <br />
            <Card.Text style={{ marginLeft: "210px" }}>
              +31 (0) 30 274 5286
            </Card.Text>
            <Card.Text style={{ marginLeft: "260px" }}>
              contact@stubble.company
            </Card.Text>
            <Link
              to="contact"
              className="nav-link"
              style={{ color: "white", marginLeft: "150px" }}
            >
              Contact us
            </Link>
            <Link
              to="faqs"
              className="nav-link"
              style={{ color: "white", marginLeft: "110px" }}
            >
              FAQs
            </Link>
          </Card.Body>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>INFORMATION</Card.Title>
            <br />
            <Link
              to="privacypolicy"
              className="nav-link"
              style={{ color: "white", marginLeft: "180px" }}
            >
              Privacy Policy
            </Link>
            <Link
              to="termsandconditions"
              className="nav-link"
              style={{ color: "white", marginLeft: "240px" }}
            >
              Terms and Conditions
            </Link>
          </Card.Body>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>FOLLOW US</Card.Title>
            <br />
            <a href="https://facebook.com">
              <Card.Img
                style={{ height: "4rem", width: "4rem" }}
                variant="bottom"
                src="fb.png"
              />
            </a>
            <a href="https://instagram.com">
              <Card.Img
                style={{ height: "2rem", width: "2rem" }}
                variant="bottom"
                src="insta.png"
              />
            </a>
            <a href="https://twitter.com">
              <Card.Img
                style={{ height: "3rem", width: "3rem", marginLeft: "12px" }}
                variant="bottom"
                src="twitter.jpg"
              />
            </a>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
export default Footer;
