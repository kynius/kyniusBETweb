import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'materialize-css';
import reportWebVitals from './reportWebVitals';
import {Container} from "react-materialize";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./Home";
import LeagueAdminPage from "./LeagueAdminPage";
import LeagueUserPage from "./LeagueUserPage";
import Navbar from "./Components/Navbar";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Navbar/>
    <Container>
        <BrowserRouter>
            <Routes>
            <Route path={"/"} element={Home()}></Route>
            <Route path={`/league/Admin/:id`} element={<LeagueAdminPage/>}></Route>
            <Route path={`/league/User/:id`} element={<LeagueUserPage/>}></Route>
            </Routes>
        </BrowserRouter>
    </Container>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
