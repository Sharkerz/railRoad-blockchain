import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from "react";
import { Home, Cards } from './Views';
import { Header } from './Components';
import { AuthProvider } from "./Contexts/AuthContext";

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
