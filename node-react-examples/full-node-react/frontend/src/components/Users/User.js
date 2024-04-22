import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function User(props) {
  const history = useNavigate();
  return (
    <Card>
      <Card.Body>
        {(props.user.firstName || props.user.lastName) && (
          <Card.Title>{`${props.user.firstName} ${props.user.lastName}`}</Card.Title>
        )}
        {props.user.email && (
          <Card.Text>{`Email: ${props.user.email}`}</Card.Text>
        )}
        {props.user.phone && (
          <Card.Text>{`Phone: ${props.user.phone}`}</Card.Text>
        )}
        {props.user.address?.street && (
          <Card.Text>{`Street: ${props.user.address.street}`}</Card.Text>
        )}
        {props.user.address?.city && (
          <Card.Text>{`City: ${props.user.address.city}`}</Card.Text>
        )}
        {props.user.address?.state && (
          <Card.Text>{`State: ${props.user.address.state}`}</Card.Text>
        )}
        {props.user.address?.zip && (
          <Card.Text>{`Zip: ${props.user.address.zip}`}</Card.Text>
        )}
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={() => history.push(`/users/${props.user._id}/movies`)}
            >
              View
            </Button>
          </Col>
          {props.onEdit && (
            <Col>
              <Button
                variant="primary"
                onClick={() => props.onEdit(props.user)}
              >
                Edit
              </Button>
            </Col>
          )}
          {props.onEdit && (
            <Col>
              <Button
                variant="danger"
                onClick={() => props.onDelete(props.user)}
              >
                Delete
              </Button>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
