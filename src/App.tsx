import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './style.scss';

import {UserContextProvider} from "./contexts/user-context";
import {ThemeContextProvider} from "./contexts/theme-context";
import {ExerciseContextProvider} from "./contexts/exercise-context";

import Exercises from "./pages/Exercises";
import FavoriteExercises from "./pages/FavoriteExercises";

const App = () => {

    return (
        <ExerciseContextProvider>
            <UserContextProvider>
                    <ThemeContextProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route path="/" element={<Exercises/>}/>
                                <Route path="/favorites" element={<FavoriteExercises/>}/>
                            </Routes>
                        </BrowserRouter>
                    </ThemeContextProvider>
            </UserContextProvider>
        </ExerciseContextProvider>

    );
};

export default App;
