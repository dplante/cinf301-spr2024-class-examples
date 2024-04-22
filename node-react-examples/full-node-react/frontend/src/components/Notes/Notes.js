import { Row, Col } from "react-bootstrap";
import Note from "./Note";
export default function Notes(props) {
  return (
    <Row xs={1} md={4} className="g-4">
      {props.notes?.map((note) => (
        <Col key={note._id}>
          <Note
            movie={note}
            onEdit={props.onEdit}
            onDelete={props.onDelete}
          />
        </Col>
      ))}
    </Row>
  );
}
