import { useState, useRef } from "react";
import { Button, Form, Spinner, Col, Row } from "react-bootstrap";
import "./Signup.css";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import { signup } from "../../functions/auth";

export default function Signup() {
  // Create a signup form using react-bootstrap
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseAlert, setResponseAlert] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const phoneRef = useRef("");
  const streetRef = useRef("");
  const cityRef = useRef("");
  const stateRef = useRef("");
  const zipRef = useRef("");

  const signupUser = async (data) => {
    try {
      const response = await signup(data);
      setResponseAlert({
        show: true,
        title: "Signup Successful",
        message: "You have successfully signed up.",
        success: true,
      });
      setLoading(false);

      // Store the token in local storage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.id);

      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setResponseAlert({
        show: true,
        title: "Signup Failed",
        message: error?.response?.data?.error || "Error signing up.",
        success: false,
      });
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    if (form.checkValidity() === false) {
      return;
    }

    // Send the form data to the server for signup
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
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
    setLoading(true);
    signupUser(data);
  };

  return (
    <div>
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}
      <div className="form-container">
        <h1>Signup</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Form.Group
              as={Col}
              md="4"
              className="form-group"
              controlId="formBasicEmail"
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                ref={emailRef}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              className="form-group"
              controlId="formBasicPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                required
                ref={passwordRef}
              />
            </Form.Group>

            <Form.Group
              as={Col}
              md="4"
              className="form-group"
              controlId="formBasicConfirmPassword"
            >
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                required
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
                required
                ref={zipRef}
              />
            </Form.Group>
          </Row>
          <div className="form-actions">
            <Button variant="primary" type="submit" disabled={loading}>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className={loading ? "" : "visually-hidden"}
              />
              <span className={loading ? "visually-hidden" : ""}>Submit</span>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
