import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useForm, Form } from "./Form";
import { Grid } from "@material-ui/core";
import Input from "./Input";
import FormButton from "./FormButton";
import { setTimeout } from "timers";
import axios from "axios";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
const initialFValues = {
  id: 0,
  fullname: "",
  email: "",
  mobile: "",
};

export default function Visitor({ waitBeforeShow = 3000 }) {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const addorEdit = (user, resetForm) => {
    resetForm();
    setRecordForEdit(null);
  };
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required.";
    if ("email" in fieldValues)
      (temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.") ||
        (temp.email = fieldValues.email ? "" : "This field is required.");
    if ("mobile" in fieldValues)
      temp.mobile =
        fieldValues.mobile.length > 9 ? "" : "Minimum 10 digits required.";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every(x => x == "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);
  const handleClose = () => {
    setShow(false);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      addorEdit(values, resetForm);
      setShow(false);
      const data = {
        fullname: values.fullname,
        email: values.email,
        mobile: values.mobile,
      };
      axios.post(`${global.config.backendURL}/visitors`, data);
    }
  };
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);
  return (
    <>
      <Modal style={{ marginTop: 200 }} show={show} id="modal">
        <Modal.Header>
          <Modal.Title style={{ fontFamily: "Averia Serif Libre" }}>
            <strong> Enbuild </strong>
          </Modal.Title>
          <IconButton style={{ outline: "none" }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Grid align="center">
              <Grid align="center" item xs={10}>
                <Input
                  name="fullname"
                  label="Full Name*"
                  value={values.fullname}
                  onChange={handleInputChange}
                  error={errors.fullname}
                />
                <Input
                  name="email"
                  label="Email*"
                  value={values.email}
                  onChange={handleInputChange}
                  error={errors.email}
                />
                <Input
                  name="mobile"
                  label="Mobile Number*"
                  value={values.mobile}
                  onChange={handleInputChange}
                  error={errors.mobile}
                />
                <div>
                  <Button type="submit" style={{ margin: "10px" }} size="large">
                    <strong>Submit</strong>
                  </Button>
                  <Button
                    color="default"
                    onClick={resetForm}
                    style={{ margin: "10px" }}
                    size="large"
                  >
                    <strong>Reset</strong>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
