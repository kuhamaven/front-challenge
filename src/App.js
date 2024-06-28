import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CharacterList from './components/CharacterList/CharacterList';
import NavBar from './components/NavBar/NavBar';
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <NavBar />
                <Routes>
                    <Route path="/" element={<CharacterList />} />
                    <Route path="/details/:id" element={<CharacterDetails />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
