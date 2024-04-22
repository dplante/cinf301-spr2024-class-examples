import { useRef, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import "./UserForm.css";

export default function UserForm(props) {
  const emailRef = useRef(props.user?.email);
  const firstNameRef = useRef(props.user?.firstName);
  const lastNameRef = useRef(props.user?.lastName);
  const phoneRef = useRef(props.user?.phone);
  const streetRef = useRef(props.user?.address?.street);
  const cityRef = useRef(props.user?.address?.city);
  const stateRef = useRef(props.user?.address?.state);
  const zipRef = useRef(props.user?.address?.zip);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === false) {
      return;
    }

    // Send the form data to the server
    const data = {
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      phone: phoneRef.current.value,
      address: {
        street: streetRef.current.value,
        city: cityRef.current.value,
        state: stateRef.current.value,
        zip: zipRef.current.value,
      },
    };
    props.handleSubmit(data);
  };

  return (
    <div className="form-container">
      <h1>{props.user?.firstName}</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group
            as={Col}
            className="form-group"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              defaultValue={props.user?.email}
              required
              ref={emailRef}
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group
            as={Col}
            md="4"
            className="form-group"
            controlId="formBasicName"
          >
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              defaultValue={props.user?.firstName}
              required
              ref={firstNameRef}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            className="form-group"
            controlId="formBasicName"
          >
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              defaultValue={props.user?.lastName}
              required
              ref={lastNameRef}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="4"
            className="form-group"
            controlId="formBasicPhone"
          >
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              defaultValue={props.user?.phone}
              required
              ref={phoneRef}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group
            as={Col}
            md="3"
            className="form-group"
            controlId="formBasicAddressStreet"
          >
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              defaultValue={props.user?.address?.street}
              required
              ref={streetRef}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            className="form-group"
            controlId="formBasicAddressCity"
          >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              defaultValue={props.user?.address?.city}
              required
              ref={cityRef}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            className="form-group"
            controlId="formBasicAddressState"
          >
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              defaultValue={props.user?.address?.state}
              required
              ref={stateRef}
            />
          </Form.Group>

          <Form.Group
            as={Col}
            md="3"
            className="form-group"
            controlId="formBasicAddressZip"
          >
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip"
              defaultValue={props.user?.address?.zip}
              required
              ref={zipRef}
            />
          </Form.Group>
        </Row>
        <div className="form-actions">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
