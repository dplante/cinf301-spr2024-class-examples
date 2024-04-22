import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import { getAllUsers, updateUser, deleteUser } from "../../functions/users";
import User from "./User";
import UserForm from "./UserForm";
import "./Users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [refreshUsers, setRefreshUsers] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [responseAlert, setResponseAlert] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  useEffect(() => {
    if (!refreshUsers) {
      return;
    }

    const getUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getAllUsers(token);
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setResponseAlert({
          show: true,
          title: "Users Retrieval Failed",
          message: error?.response?.data?.error || "Please try again.",
          success: false,
        });
        setLoading(false);
      }
    };
    getUsers();
    setRefreshUsers(false);
  }, [refreshUsers]);

  const updateSelectedUser = async (data) => {
    const selectedUserId = selectedUser._id;
    setShowForm(false);
    setSelectedUser(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateUser(token, selectedUserId, data);
      setResponseAlert({
        show: true,
        title: "User Updated",
        message: response.message || "You have successfully updated a user.",
        success: true,
      });
      setRefreshUsers(true);
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "User Update Failed",
        message: error?.response?.data?.error || "Please try again.",
        success: false,
      });
      setLoading(false);
    }
  };

  const deleteSelectedUser = async (user) => {
    const selectedUserId = user._id;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await deleteUser(token, selectedUserId);
      setResponseAlert({
        show: true,
        title: "User Deleted",
        message: response.message || "You have successfully deleted a user.",
        success: true,
      });
      setRefreshUsers(true);
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "User Deletion Failed",
        message: error?.response?.data?.error || "Please try again.",
        success: false,
      });
      setLoading(false);
    }
  };

  const editUser = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  return (
    <div className="Users">
      {loading && <Spinner animation="border" variant="primary" />}
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}
      <h1>Users</h1>
      {showForm ? (
        <UserForm user={selectedUser} handleSubmit={updateSelectedUser} />
      ) : (
        <Row xs={1} md={4} className="g-4">
          {users?.map((user) => (
            <Col key={user._id}>
              <User
                user={user}
                onEdit={editUser}
                onDelete={deleteSelectedUser}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
