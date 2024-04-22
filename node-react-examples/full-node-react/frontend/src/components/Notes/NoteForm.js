import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./NoteForm.css";

export default function NoteForm(props) {
  const titleRef = useRef(props.note?.title);
  const contentRef = useRef(props.note?.content);
  const emailRef = useRef(props.note?.email);

  const [validated, setValidated] = useState(false);

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
      title: titleRef.current.value,
      content: contentRef.current.value,
      email: emailRef.current.value,
    };
    props.handleSubmit(data);
  };

  return (
    <div className="form-container">
      {/* Show form to edit or input note details */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="form-group" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            defaultValue={props.note?.title}
            ref={titleRef}
            required
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter Content"
            defaultValue={props.note?.content}
            ref={contentRef}
            required
          />
        </Form.Group>
        <Form.Group className="form-group" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Email"
            defaultValue={props.note?.email}
            ref={emailRef}
            required
          />
        </Form.Group>
        <div className="form-actions">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
