import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import React from "react";
import { fetchAuthMe, selectIsAuth } from './redux/slices/auth'
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/posts/:id" element={<FullPost />} />
          <Route exact path="/add-post" element={<AddPost />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;