import { useState, useRef } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import "./Login.css";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import { login } from "../../functions/auth";

export default function Login() {
  // Create a login form using react-bootstrap
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

  const loginUser = async (data) => {
    try {
      const response = await login(data);
      setResponseAlert({
        show: true,
        title: "Login Successful",
        message: "You have successfully logged in.",
        success: true,
      });
      setLoading(false);

      // Store the token in local storage
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.id);

      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "Login Failed",
        message:
          error?.response?.data?.error ||
          "Please check your email and password.",
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

    // Send the form data to the server for login
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    setLoading(true);
    loginUser(data);
  };

  return (
    <div className="Login">
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}
      <div className="form-container">
        <h1>Login</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="form-group" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              ref={emailRef}
            />
          </Form.Group>

          <Form.Group className="form-group" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              ref={passwordRef}
            />
          </Form.Group>
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
