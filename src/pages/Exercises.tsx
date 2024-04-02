import React, {useContext, useEffect, useState} from 'react'

import {Block} from "react-barebones-ts";
import ExerciseContext from "../contexts/exercise-context";
import AppWrapper from "../layout/AppWrapper";
import {ExerciseType} from '../contexts/exercise-context'
import ExerciseList from "../components/exercises/exercise-list/ExerciseList";
import Spinner from "../components/spinner/Spinner";
import SearchForm from "../components/exercises/search-form/SearchForm";

const Exercises = () => {

    const {exercises, loadingExercises} = useContext(ExerciseContext)

    const [exercisesList, setExercisesList] = useState<ExerciseType[]|null>(null)

    useEffect(() => {
        if (exercises.length > 0) {
            setExercisesList(exercises)
        }
    }, [exercises]);

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                {loadingExercises ? <Spinner/> :
                    <>
                        {exercisesList &&
                            <>
                                <SearchForm data={exercisesList} setData={setExercisesList}/>
                                <ExerciseList data={exercisesList}/>
                            </>
                        }
                    </>
                }
            </Block>
        </AppWrapper>
    );
}

export default Exercises;