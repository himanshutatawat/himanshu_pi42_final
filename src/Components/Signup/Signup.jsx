import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from "../../firebase";
import { toast } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

import styles from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "", // Added state for confirm password
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmission = () => {
    if (!values.name || !values.email || !values.pass || values.pass !== values.confirmPass) {
      toast.error("Please fill all fields and make sure passwords match.");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });
        toast.success('Account created successfully!');
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Signup</h1>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '100%', marginBottom: "15px" }, // Uniform margin for all text fields
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange('name')}
            placeholder="Enter your name"
            fullWidth
            InputLabelProps={{
              style: { color: 'black' }, // Change label color to black
            }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderColor: 'black', // Change border color to black
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Change hover border color to black
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'red', // Border color when input is focused
                },
              },
              inputProps: {
                style: { color: 'black' }, // Change text color to black
                placeholderTextColor: 'gray', // Change placeholder text color to gray
              },
            }}
            sx={{
              '& .MuiInputBase-input': { color: 'black' }, // Changes the input text color to black
            }}
          />
          {/* Other input fields remain the same */}
        </Box>
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            {submitButtonDisabled ? (
              <CircularProgress size={24} style={{ color: 'white' }} />
            ) : (
              "Signup"
            )}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
