import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "bootstrap/dist/css/bootstrap.css";
import Grid from "@material-ui/core/Grid";

export default function TermsandConditions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div style={{ backgroundColor: "#f3f5f8" }}>
        <Grid container justify="center">
          <Grid item>
            <Button
              onClick={handleShow}
              size="large"
              //variant="contained"
              style={{
                height: "50px",
                width: "250px",
                fontSize: "1em",
              }}
            >
              <strong>Terms and Conditions</strong>
            </Button>
          </Grid>
        </Grid>
        <Modal show={show} onHide={handleClose} style={{ marginTop: "10em" }}>
          <Modal.Header>
            <Modal.Title style={{ fontFamily: "Averia Serif Libre" }}>
              Terms and Conditions
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>hello</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
