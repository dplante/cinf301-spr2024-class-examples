import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import { getAllNotes } from "../../functions/notes";
import Notes from "../Notes/Notes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseAlert, setResponseAlert] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  useEffect(() => {
    async function fetchAllNotes() {
      try {
        const token = localStorage.getItem("token");
        const response = await getAllNotes(token);
        setNotes(response);
        setLoading(false);
      } catch (error) {
        setResponseAlert({
          show: true,
          title: "Error",
          message: error?.response?.data?.error || "Error fetching notes.",
          success: false,
        });
        setLoading(false);
      }
    }
    fetchAllNotes();
  }, []);

  return (
    <div className="Home">
      <h1>Home</h1>
      {loading && <Spinner animation="border" variant="primary" />}
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}
      <Notes notes={notes} />
    </div>
  );
}
