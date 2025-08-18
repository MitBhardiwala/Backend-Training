"use client";
import { Field, Form, Formik, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Link from "next/link";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Image from "next/image";
const ReusableForm = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  isUpdate = false,
  className = "container mx-auto w-[40%] flex flex-col justify-center items-center gap-5",
}) => {
  const renderField = (field, formikProps) => {
    const { errors, touched, setFieldValue } = formikProps;
    const isError = touched[field.name] && Boolean(errors[field.name]);
    const helperText = touched[field.name] && errors[field.name];
    switch (field.type) {
      case "select":
        return (
          <div key={field.name}>
            <InputLabel id={`${field.name}-label`}>{field.label}:</InputLabel>
            <Field
              as={Select}
              labelId={`${field.name}-label`}
              name={field.name}
              fullWidth
              error={isError}
            >
              {field.options?.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Field>
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText}
              </div>
            )}
          </div>
        );
      case "file":
        return (
          <div key={field.name}>
            <InputLabel htmlFor={field.name}>{field.label}:</InputLabel>
            <input
              id={field.name}
              name={field.name}
              type="file"
              onChange={(event) => {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  setFieldValue(field.name, event.currentTarget.files[0]);
                }
              }}
              accept={field.accept}
            />
            {initialValues.image && (
              <Image
                src={initialValues.image}
                width={50}
                height={50}
                alt="profile photo"
                className="rounded-full object-cover"
              />
            )}
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText}
              </div>
            )}
          </div>
        );
      case "daterange":
        return (
          <div key={field.name}>
            <InputLabel>{field.label}:</InputLabel>
            <DateRangePicker
              value={formikProps.values[field.name]}
              format={field.format || "MM/dd/yyyy"}
              onChange={(date) => setFieldValue(field.name, date)}
            />
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText}
              </div>
            )}
            {field.showSelected && (
              <p style={{ fontSize: "0.875rem", marginTop: "5px" }}>
                Selected Date Range:{" "}
                {formikProps.values[field.name] &&
                formikProps.values[field.name][0] &&
                formikProps.values[field.name][1]
                  ? `${formikProps.values[
                      field.name
                    ][0]?.toDateString()} - ${formikProps.values[
                      field.name
                    ][1]?.toDateString()}`
                  : "None"}
              </p>
            )}
          </div>
        );
      case "radio":
        return (
          <FormControl key={field.name} component="fieldset" error={isError}>
            <FormLabel component="legend">{field.label}:</FormLabel>
            <Field name={field.name}>
              {({ field: fieldProps }) => (
                <RadioGroup {...fieldProps}>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              )}
            </Field>
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText}
              </div>
            )}
          </FormControl>
        );
      case "label":
        return (
          <label key={field.name} htmlFor={field.targetField}>
            {field.text}
          </label>
        );
      default:
        return (
          <Field
            key={field.name}
            as={TextField}
            name={field.name}
            type={field.type}
            label={field.label}
            variant="outlined"
            fullWidth
            error={isError}
            helperText={helperText}
            disabled={
              isUpdate && (field.name === "email" ||  field.name === "department")
            }
          />
        );
    }
  };
  return (
    <div className={className}>
      <p className="text-3xl">{title}</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form className="flex flex-col gap-3 w-[60%]">
              {fields.map((field) => renderField(field, formikProps))}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {submitButtonText}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
export default ReusableForm;
