import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Form from './pages/Form';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/upload/' element={<Form />} />
            </Routes>
        </Router>
    );
}

export default App;
