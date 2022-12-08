import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
// import Web3 from "web3";
// import {useEffect, useState} from "react";
// import contract from "./RailRoad.json";
import React from "react";
import { Home, Cards } from './Views';
import { Header } from './Components';
import { AuthProvider } from "./Contexts/AuthContext";
// import Contract from "./Services/Contract";

// const ganache = 'HTTP://127.0.0.1:7545';
// const web3 = new Web3(ganache);
// const accountToUse = 0;
//const railRoad = new web3.eth.Contract(contract.abi, '0x2fA2B60C8475b491054272119B2124AC30735c0b', {gasPrice: '20000000000', gas: '20000000000'});

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/cards' element={<Cards />} />
                        <Route exact path='/tickets' element={<Cards />} />
                    </Routes>
                </Router>
            </AuthProvider>
        </div>
    );
}

export default App;
