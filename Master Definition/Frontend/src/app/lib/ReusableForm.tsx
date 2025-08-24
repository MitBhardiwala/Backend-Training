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
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import Image from "next/image";

import { FormikHelpers, FormikProps } from "formik";

interface Field {
  name: string;
  type: string;
  label?: string | undefined;
  accept?: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  targetField?: string | undefined;
  text?: string | undefined;
  format?: string;
  showSelected?: boolean;
}

interface ReusableFormProps {
  title: string;
  initialValues: { [key: string]: any };
  validationSchema: any;
  onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void;
  fields: Field[];
  submitButtonText: string;
  disabledFields?: string[];
  className?: string;
  additionalButtons?: {
    text: string;
    link: string;
    variant?: "text" | "outlined" | "contained";
    color?:
      | "inherit"
      | "primary"
      | "secondary"
      | "success"
      | "error"
      | "info"
      | "warning";
  }[];
}

const ReusableForm = ({
  title,
  initialValues,
  validationSchema,
  onSubmit,
  fields,
  submitButtonText,
  disabledFields,
  className = "flex flex-col justify-center items-center gap-5 w-full max-w-2xl",
  additionalButtons,
}: ReusableFormProps) => {
  console.log(initialValues);
  const renderField = (field: Field, formikProps: FormikProps<any>) => {
    const { errors, touched, setFieldValue, values } = formikProps;
    const isError = touched[field.name] && Boolean(errors[field.name]);
    const helperText = touched[field.name] && errors[field.name];
    const isDisabled = disabledFields
      ? disabledFields.includes(field.name)
      : false;

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
              disabled={isDisabled}
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
                {helperText as string}
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
              disabled={isDisabled}
            />
            {values[field.name] && typeof values[field.name] === "string" && (
              <div style={{ marginTop: "10px" }}>
                <p style={{ fontSize: "0.875rem", marginBottom: "5px" }}>
                  Current image:
                </p>
                <Image
                  src={values[field.name] as string}
                  width={100}
                  height={100}
                  alt="Current profile photo"
                  className="rounded-full object-cover"
                />
              </div>
            )}
            {values[field.name] &&
              typeof values[field.name] === "object" &&
              (values[field.name] as File).name && (
                <div style={{ marginTop: "10px" }}>
                  <p style={{ fontSize: "0.875rem", color: "green" }}>
                    New file selected: {(values[field.name] as File).name}
                  </p>
                </div>
              )}
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText as string}
              </div>
            )}
          </div>
        );
      case "daterange":
        return (
          <div key={field.name}>
            <InputLabel>{field.label}:</InputLabel>
            <DateRangePicker
              value={values[field.name]}
              format={field.format || "MM/dd/yyyy"}
              onChange={(date) => setFieldValue(field.name, date)}
              disabled={isDisabled}
            />
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText as string}
              </div>
            )}
            {field.showSelected && (
              <p style={{ fontSize: "0.875rem", marginTop: "5px" }}>
                Selected Date Range:{" "}
                {values[field.name] &&
                values[field.name][0] &&
                values[field.name][1]
                  ? `${values[field.name][0]?.toDateString()} - ${values[
                      field.name
                    ][1]?.toDateString()}`
                  : "None"}
              </p>
            )}
          </div>
        );
      case "radio":
        return (
          <FormControl
            key={field.name}
            component="fieldset"
            error={isError}
            disabled={isDisabled}
          >
            <FormLabel component="legend">{field.label}:</FormLabel>
            <Field name={field.name}>
              {({ field: fieldProps }: { field: any }) => (
                <RadioGroup {...fieldProps}>
                  {field.options?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                      disabled={isDisabled}
                    />
                  ))}
                </RadioGroup>
              )}
            </Field>
            {isError && (
              <div
                style={{ color: "red", fontSize: "0.75rem", marginTop: "3px" }}
              >
                {helperText as string}
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
            helperText={helperText as string}
            disabled={isDisabled}
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
              {additionalButtons &&
                additionalButtons.length > 0 &&
                additionalButtons.map((button) => (
                  <Button
                    key={button.text}
                    variant={button.variant}
                    href={button.link}
                    color={button.color}
                  >
                    {button.text}
                  </Button>
                ))}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ReusableForm;
