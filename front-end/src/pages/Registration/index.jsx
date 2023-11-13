import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from './Login.module.scss';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {register, handleSubmit, formState:{errors, isValid}} = useForm({
    defaultValues: {
      fullName: 'Poco Loco',
      email: 'test@gmail.com',
      password: '121212',
    },
    mode: 'onChange'
  })

  const onSubmit = async (value) =>{
    const data = await dispatch(fetchRegister(value));
  
    if(!data.payload){
      return  alert('Register Failed');
    }
  
   if('token' in data.payload){
    window.localStorage.setItem('token', data.payload.token);
   }
  }
  
  
  if(isAuth){
    return <Navigate to="/"/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName',{ required: " Insert Full Name"})} 
        fullWidth />
      <TextField 
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type='email'
        {...register('email',{ required: " Insert E-mail"})} 
        fullWidth />
      <TextField 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type='password'
        {...register('password',{ required: " Insert Password"})} 
        fullWidth />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        SignUp
      </Button>
      </form>
    </Paper>
  );
};