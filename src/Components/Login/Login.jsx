import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { auth } from "../../firebase";
import { toast } from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      toast.error("Fill all fields");
      return; 
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        toast.success("logged in successfully!")
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        toast.error(err.message || 'Failed to login');
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading} >Login</h1>

        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { width: '100%', marginBottom: "15px" }, // Uniform margin for all text fields
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange('email')}
            placeholder="Enter email address"
            fullWidth
            InputLabelProps={{
              style: { color: 'black' },
            }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderColor: 'black', // Normal border color
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Hover border color
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
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            value={values.pass}
            onChange={handleChange('pass')}
            placeholder="Enter Password"
            fullWidth
            InputLabelProps={{
              style: { color: 'black' },
            }}
            InputProps={{
              sx: {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'red',
                },
              },
              inputProps: {
                style: { color: 'black' },
                placeholderTextColor: 'gray',
              },
            }}
            sx={{
              '& .MuiInputBase-input': { color: 'black' },
            }}
          />
        </Box>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button disabled={submitButtonDisabled} onClick={handleSubmission}>
            {submitButtonDisabled ? (
              <CircularProgress size={24} style={{ color: 'white' }} />
            ) : (
              "Login"
            )}
          </button>
          <p>
            Don't have an account?{" "}
            <span>
              <Link to="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
