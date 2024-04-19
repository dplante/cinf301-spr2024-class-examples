import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import PropTypes from 'prop-types';
import Entry from '../Entry/Entry';

export default function Entries(props) {
  console.log(props);
  const range = [...Array(props.number).keys()].map(x => x + 1);
  console.log(`range = ${JSON.stringify(range)}`);
  return (
    <div>
      <Container fluid>
        <Row className="justify-content-md-center">
          {range.map(entry => (
            <Col key={entry}>
              <Entry row={entry} />
            </Col>
          ))}
        </Row>
      </Container>
    </div >
  );
}

Entries.propTypes = {
  number: PropTypes.number
}
