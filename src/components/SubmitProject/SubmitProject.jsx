/* eslint-disable react/prop-types */
import * as React from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "components/Button/Button";
import Alert from "components/Alert/Alert";

const SubmitProject = ({ state }) => {
  const [show, setShow] = React.useState(false);
  const [repository, setRepository] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [submit, setSubmit] = state;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmit({ ...submit, status: "loading" });

      const body = {
        text: `=================\n*New Submitted Project!*\n=================\n\nRepository: ${repository}\nDescription: ${description}`,
      };

      const {
        data: { status, message, error },
      } = await axios.post("/api/notify", body);

      if (status === 200) {
        setSubmit({
          ...submit,
          status: "success",
          message,
        });

        setRepository("");
        setDescription("");

        handleClose();
      }

      if (status === 500) {
        setSubmit({
          ...submit,
          status: "failed",
          error,
        });
      }
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      console.error(err);

      setSubmit({
        ...submit,
        status: "failed",
        error: err,
      });
    }
  };

  return (
    <>
      <Button onClick={handleShow}>Submit Project</Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Project Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submit.status === "failed" && (
              <Alert className="mb-2">{submit.error}</Alert>
            )}

            <Form.Group>
              <Form.Label>Repository Url</Form.Label>
              <Form.Control
                type="text"
                value={repository}
                onChange={(e) => setRepository(e.target.value)}
                placeholder="https://www.your.com/repository"
                required
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This project is about developing great thing"
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              disabled={
                submit.status === "loading" || !repository || !description
              }
            >
              {submit.status === "loading" ? "Submitting..." : "Submit"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default SubmitProject;
