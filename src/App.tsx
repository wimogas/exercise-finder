import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './style.scss';

import {UserContextProvider} from "./store/user-context";
import {ThemeContextProvider} from "./store/theme-context";
import {ExerciseContextProvider} from "./store/exercise-context";

import Exercises from "./pages/Exercises";
import SearchExercises from "./pages/SearchExercises";
import FavoriteExercises from "./pages/FavoriteExercises";

const App = () => {

    return (
        <UserContextProvider>
            <ExerciseContextProvider>
                <ThemeContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Exercises/>}/>
                            <Route path="/search" element={<SearchExercises/>}/>
                            <Route path="/favorites" element={<FavoriteExercises/>}/>
                        </Routes>
                    </BrowserRouter>
                </ThemeContextProvider>
            </ExerciseContextProvider>
        </UserContextProvider>

    );
};

export default App;
