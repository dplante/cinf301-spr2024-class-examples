import { Card, Button, Row, Col } from "react-bootstrap";
export default function Note(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{props.movie.title}</Card.Title>
        <Card.Text>{props.movie.content}</Card.Text>
        <Card.Text>{props.movie.email}</Card.Text>
        <Row>
          {props.onEdit && (
            <Col>
              <Button
                variant="primary"
                onClick={() => props.onEdit(props.note)}
              >
                Edit
              </Button>
            </Col>
          )}
          {props.onEdit && (
            <Col>
              <Button
                variant="danger"
                onClick={() => props.onDelete(props.note)}
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
