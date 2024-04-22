import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import { getUserById, updateUser } from "../../functions/users";
import UserForm from "../Users/UserForm";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseAlert, setResponseAlert] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  let { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await getUserById(token, userId);
        setUser(response);
        setLoading(false);
      } catch (error) {
        setResponseAlert({
          show: true,
          title: "User Retrieval Failed",
          message: error?.response?.data?.error || "Please try again.",
          success: false,
        });
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  const updateSelectedUser = async (data) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateUser(token, userId, data);
      setResponseAlert({
        show: true,
        title: "User Updated",
        message: response.message || "You have successfully updated a user.",
        success: true,
      });
      setLoading(false);
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

  return (
    <div className="Profile">
      {loading && <Spinner animation="border" variant="primary" />}
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}
      <h1>Profile</h1>
      <UserForm user={user} handleSubmit={updateSelectedUser} />
    </div>
  );
}
