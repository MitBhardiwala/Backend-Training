import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import handleSearchAndDeleteFunctions from "../helperFunctions/handleSearchAndDeleteFunctions";



const CommonDialogBox = ({
  open,
  setOpen,
  formData,
  title = "Form",
  filterId,
  setData,
}) => {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (formData) {
      const initialForm = {};
      Object.keys(formData).forEach((key) => {
        initialForm[formData[key].name] = "";
      });
      setForm(initialForm);
    }
  }, [formData]);

  const handleClose = () => {
    setOpen(false);
    setForm({});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    await handleSearchAndDeleteFunctions(filterId,setData,form);


    handleClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!formData) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <form  onSubmit={handleSubmit}>
          {Object.keys(formData).map((fieldKey, index) => {
            const field = formData[fieldKey];
            return (
              <TextField
                key={fieldKey}
                autoFocus={index === 0}
                required={field.required}
                margin="dense"
                fullWidth
                variant="standard"
                type={field.type}
                name={field.name}
                label={field.label}
                value={form[field.name] || ""}
                onChange={handleChange}
              />
            );
          })}
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialogBox;
