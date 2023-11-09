import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
const dispatch = useDispatch();

  const {register, handleSubmit, setError, formState:{errors, isValid}} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  })

const onSubmit = (value) =>{
  dispatch(fetchAuth(value));
}
if(isAuth){
  return <Navigate to="/"/>
}

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        LogIn
      </Typography>
    <form onSubmit={handleSubmit(onSubmit)}>
    <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type='email'
        {...register('email',{ required: " Insert E-mail"})}
        fullWidth
      />
      <TextField 
      className={styles.field} 
      label="password"
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password', {required: " Insert Password"})} 
      fullWidth />
      <Button type="submit" size="large" variant="contained" fullWidth>
        LogIn
      </Button>
    </form>
    </Paper>
  );
};