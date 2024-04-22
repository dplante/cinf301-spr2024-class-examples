import { useEffect, useState } from "react";
import { Spinner, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AutohideAlert from "../AutohideAlert/AutohideAlert";
import {
  getNotesOfUser,
  createNote,
  updateNote,
  deleteNote,
} from "../../functions/notes";
import Notes from "./Notes";
import NoteForm from "./NoteForm";
import "./MyNotes.css";

export default function MyNotes() {
  const [notes, setNotes] = useState([]);
  const [refreshNotes, setRefreshNotes] = useState(true);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [responseAlert, setResponseAlert] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  let { userId } = useParams();

  const createUserNote = async (data) => {
    setShowForm(false);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await createNote(token, userId, data);
      setResponseAlert({
        show: true,
        title: "Note Created",
        message: response.message || "You have successfully created a note.",
        success: true,
      });
      setRefreshNotes(true);
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "Note Creation Failed",
        message: error?.response?.data?.error || "Please try again.",
        success: false,
      });
      setLoading(false);
    }
  };

  const updateUserNote = async (data) => {
    const selectedNoteId = selectedNote._id;
    setShowForm(false);
    setSelectedNote(null);
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await updateNote(token, userId, selectedNoteId, data);
      setResponseAlert({
        show: true,
        title: "Note Updated",
        message: response.message || "You have successfully updated a note.",
        success: true,
      });
      setRefreshNotes(true);
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "Note Updation Failed",
        message: error?.response?.data?.error || "Please try again.",
        success: false,
      });
      setLoading(false);
    }
  };

  const deleteUserNote = async (note) => {
    const selectedNoteId = note._id;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await deleteNote(token, userId, selectedNoteId);
      setResponseAlert({
        show: true,
        title: "Note Deleted",
        message: response.message || "You have successfully deleted a note.",
        success: true,
      });
      setRefreshNotes(true);
    } catch (error) {
      setResponseAlert({
        show: true,
        title: "Note Deletion Failed",
        message: error?.response?.data?.error || "Please try again.",
        success: false,
      });
      setLoading(false);
    }
  };

  const editNote = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  useEffect(() => {
    if (!refreshNotes) {
      return;
    }

    async function fetchUserNotes() {
      try {
        const token = localStorage.getItem("token");
        const response = await getNotesOfUser(token, userId);
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
    fetchUserNotes();
    setRefreshNotes(false);
  }, [refreshNotes, userId]);

  return (
    <div className="Home">
      {loading && <Spinner animation="border" variant="primary" />}
      {responseAlert.show && (
        <AutohideAlert
          title={responseAlert.title}
          message={responseAlert.message}
          success={responseAlert.success}
          onClose={() => setResponseAlert({ ...responseAlert, show: false })}
        />
      )}

      <Row xs={1} md={2} className="g-4">
        <Col>
          <h1>User Notes</h1>
        </Col>
        <Col>
          {/* Button to create note */}
          <Button
            className="btn-header"
            variant="primary"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Create Note
          </Button>
        </Col>
      </Row>

      {showForm ? (
        <NoteForm
          movie={selectedNote}
          handleSubmit={selectedNote ? updateUserNote : createUserNote}
        />
      ) : (
        <Notes movies={notes} onEdit={editNote} onDelete={deleteUserNote} />
      )}
    </div>
  );
}
