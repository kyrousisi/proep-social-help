import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Row, Col } from "react-bootstrap";
import { Form } from "react-bootstrap";
import FindTherapistCSS from "./FindTherapist.module.css";

const FindTherapist = (props) => {
  return (
    <>
      <Modal
        className={FindTherapistCSS.modal}
        style={{
          overflowY: "visible",
          scrollable: true,
          background: "rgba(45, 86, 97, 0.4)",
        }}
        show={props.show}
        size="lg"
      >
        <ModalHeader
          style={{ background: "#DEF5F2" }}
          closeButton
          onClick={props.onHide}
        >
          <ModalTitle id="contained-modal-title-vcenter">
            Find a Therapist Survey
          </ModalTitle>
        </ModalHeader>
        <ModalBody
          style={{
            background: "#DEF5F2",
            overflow: "auto",
            scrillable: true,
          }}
        >
          <h4>
            Answer these questions to be matched with a proffessional who can
            help you :)
          </h4>
          <br />
          <Row>
            <Form.Label>
              Over the last 2 weeks, how often have you been bothered by little
              interest or pleasure in doing things?
            </Form.Label>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Not at all"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Less than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Half the time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="More than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Almost all the time"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Form.Label>
              Over the last 2 weeks, how often have you been bothered by feeling
              down, depressed, or hopeless?
            </Form.Label>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Not at all"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Less than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Half the time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="More than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Almost all the time"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Form.Label>
              Over the last 2 weeks, how often have you been bothered by feeling
              nervous, anxious, or on edge?
            </Form.Label>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Not at all"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Less than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Half the time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="More than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Almost all the time"
              />
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Form.Label>
              Over the last 2 weeks, how often have you been bothered by not
              being able to stop or control worrying?
            </Form.Label>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Not at all"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Less than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Half the time"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="More than half the time"
              />
            </Col>
            <Col>
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Almost all the time"
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter style={{ background: "#DEF5F2" }}>
          <Button style={{ backgroundColor: "#2D5661" }} onClick={props.onHide}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default FindTherapist;
