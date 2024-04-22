import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";
import MyNotes from "../Notes/MyNotes";
import Profile from "../Profile/Profile";
import Signup from "../Signup/Signup";
import Users from "../Users/Users";

export default function App() {
  const token = localStorage.getItem("token");
  const loggedIn = token ? true : false;
  const userId = localStorage.getItem("userId");
  return (
    <Router>
      <div>
        <Navbar bg="dark" expand="sm" variant="dark">
          <Container>
            <Navbar.Brand href="/">Notes</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                {!loggedIn && (
                  <Nav.Link as={Link} to={"/login"}>
                    Login
                  </Nav.Link>
                )}
                {!loggedIn && (
                  <Nav.Link as={Link} to={"/signup"}>
                    signup
                  </Nav.Link>
                )}
                {loggedIn && (
                  <Nav.Link as={Link} to={"/home"}>
                    Home
                  </Nav.Link>
                )}
                {loggedIn && (
                  <Nav.Link as={Link} to={`/users/${userId}/notes`}>
                    My Notes
                  </Nav.Link>
                )}
                {loggedIn && (
                  <Nav.Link as={Link} to={`/users/${userId}`}>
                    My Profile
                  </Nav.Link>
                )}
                {loggedIn && (
                  <Nav.Link as={Link} to={`/logout`}>
                    Logout
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div>
        <Routes>
          <Route exact path="/" element={loggedIn ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:userId/notes" element={<MyNotes />} />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/users" element={<Users />} />
          <Route
            path="/logout"
            element={<Logout />}
          />
        </Routes>
      </div>
    </Router>
  );
}
