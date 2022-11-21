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
import BetsPage from "./BetsPage";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <BrowserRouter>
            <Navbar/>
            <Container>
            <Routes>
            <Route path={"/"} element={Home()}></Route>
            <Route path={`/league/bets/:id`} element={<BetsPage/>}></Route>
            <Route path={`/league/admin/:id`} element={<LeagueAdminPage/>}></Route>
            <Route path={`/league/user/:id`} element={<LeagueUserPage/>}></Route>
            </Routes>
            </Container>
        </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
