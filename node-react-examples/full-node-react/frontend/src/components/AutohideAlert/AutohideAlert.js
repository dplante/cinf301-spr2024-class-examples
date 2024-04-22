import { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

export default function AutohideAlert(props) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      // Auto hide the alert after 5 seconds
      setTimeout(() => {
        setShow(false);
      }, 5000);
      return;
    }

    // Call onClose when the alert is closed
    if (props.onClose) {
      props.onClose();
    }
  }, [show, props.onClose, props]);

  // Return the alert that can be dismissed
  if (show) {
    return (
      <Alert
        variant={props.success ? "success" : "danger"}
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>{props.title || ""}</Alert.Heading>
        <p>{props.message || ""}</p>
      </Alert>
    );
  }
}
