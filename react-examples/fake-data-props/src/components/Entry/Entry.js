import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import React from 'react';
import PropTypes from 'prop-types';
import './Entry.css';

export default function Entry(props) {
  const index = props.row;
  //console.log(`Entry: ${props.row}`);

  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getResults() {
      const results = await axios(`https://jsonplaceholder.typicode.com/users/${index}`);
      setUsers(results.data);
      setLoaded(true);
    }
    getResults();
  }, [index])

  return (
    <div>
      {loaded && (<Card className="float-right mr-3 mb-3" style={{ maxWidth: 200, height: 500 }}>
        <Card.Img variant="top" src="https://via.placeholder.com/600/771796" />
        <Card.Body>
          <Card.Title className="">{users.company.name}</Card.Title>
          <Card.Text>
          </Card.Text>
        </Card.Body>
        <ListGroup className="">
          <ListGroupItem>{users.username}</ListGroupItem>
          <ListGroupItem>{users.email}</ListGroupItem>
          <ListGroupItem>{users.phone}</ListGroupItem>
          <ListGroupItem>{users.website}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link className="" href="https://via.placeholder.com/600/771796">Image Online</Card.Link>
        </Card.Body>
      </Card>)}
    </div>
  );
}

Entry.propTypes = {
  row: PropTypes.number.isRequired
}