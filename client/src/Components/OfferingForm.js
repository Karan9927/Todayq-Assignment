import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";

const OfferingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    location: "",
    language: "",
    category: "",
    logo: "",
    websiteurl: "",
    officialEmail: "",
    telegramId: "",
    allowedGambling: false,
    allowedAdultContent: false,
    allowedCrypto: false,
  });

  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      await axios.post("/api/offerings/add", formData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: "Basic Information",
      fields: [
        "category",
        "title",
        "price",
        "description",
        "location",
        "language",
      ],
    },
    {
      label: "Additional Details",
      fields: ["logo", "websiteurl", "officialEmail", "telegramId"],
    },
    {
      label: "Permissions",
      fields: ["allowedGambling", "allowedAdultContent", "allowedCrypto"],
    },
  ];

  const getStepContent = (step) => {
    return (
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {steps[step].fields.map((field) => (
            <React.Fragment key={field}>
              {field === "allowedGambling" ||
              field === "allowedAdultContent" ||
              field === "allowedCrypto" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData[field]}
                      onChange={handleChange}
                      name={field}
                    />
                  }
                  label={field
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                />
              ) : (
                <React.Fragment>
                  {field === "category" ? (
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel id={field}>
                        {field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </InputLabel>
                      <Select
                        labelId={field}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        label={field
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Content Distribution">
                          Content Distribution
                        </MenuItem>
                        <MenuItem value="Ads">Ads</MenuItem>
                        <MenuItem value="Twitter influencers">
                          Twitter influencers
                        </MenuItem>
                        <MenuItem value="Telegram Influencers">
                          Telegram Influencers
                        </MenuItem>
                        <MenuItem value="Youtube Influencers">
                          Youtube Influencers
                        </MenuItem>
                        <MenuItem value="Instagram Influencers">
                          Instagram Influencers
                        </MenuItem>
                        <MenuItem value=">ICO Listing">ICO Listing</MenuItem>
                        <MenuItem value="Exchange Listing">
                          Exchange Listing
                        </MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name={field}
                      label={field
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      type={field === "price" ? "number" : "text"}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ marginTop: 10, marginBottom: 10 }}
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          {activeStep === steps.length ? (
            <Box>
              <Typography>All steps completed</Typography>
              <Button onClick={() => setActiveStep(0)}>Reset</Button>
            </Box>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep === steps.length - 1 ? handleSubmit : handleNext
                  }
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default OfferingForm;
