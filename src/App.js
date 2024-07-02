import React from 'react';
import {BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import './App.css';
import CharacterList from './components/CharacterList/CharacterList';
import NavBar from './components/NavBar/NavBar';
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import FilterBar from "./components/FilterBar/FilterBar";
import {useFilters} from "./hooks/useFilters";

export default function App() {

    const filters = useFilters();

    return (
        <BrowserRouter>
            <div className={'App'}>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <NavBar filterBar={<FilterBar {...filters} />} />
                            <Outlet context={filters} />
                        </div>
                    }>
                        <Route index element={<CharacterList />} />
                    </Route>
                    <Route path="/details/:id" element={
                        <div>
                            <NavBar/>
                            <CharacterDetails />
                        </div>
                    }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}
