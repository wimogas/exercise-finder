import React, {useContext, useEffect, useState} from 'react'

import {Block, Button, Text} from "react-barebones-ts";
import SearchQuery from "../components/exercises/search-query/SearchQuery";
import ExerciseContext from "../contexts/exercise-context";

import ThemeContext from "../contexts/theme-context";
import AppWrapper from "../layout/AppWrapper";

import Exercise from "../components/exercises/exercise/Exercise";
import EmptyState from "../components/exercises/empty-state/EmptyState";
import {ExerciseType} from '../contexts/exercise-context'
import SearchForm from "../components/exercises/search-form/SearchForm";


const Exercises = () => {

    const {exercises, page, paginate, limit, query} = useContext(ExerciseContext)
    const {dark} = useContext(ThemeContext)

    const [limitedExercises, setLimitedExercises] = useState<ExerciseType[]>([])

    useEffect(() => {
        if (exercises.length > 0) {
            setLimitedExercises(exercises)
        }
    }, [exercises]);

    const [showMore, setShowMore] = useState(true)

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                <SearchForm setData={setLimitedExercises}/>
                <Block>
                    <Text classes={`${dark ? "bb-secondary-300" : "bb-neutral-900"}`} type="h1" text={`Exercises (${limitedExercises.length})`}/>
                </Block>
                {limitedExercises.length > 0 ?
                    <>
                        <SearchQuery/>
                        {limitedExercises.slice(0, page * limit).map(exercise => <Exercise key={exercise.id} data={exercise}/>)}
                        {showMore &&
                            <Button
                                classes={`bb-block-row-center wopl-button-secondary${dark ? '-dark' : ''}`}
                                action={ () => {
                                    paginate()
                                    setLimitedExercises(limitedExercises.slice(0, (page+1) * limit))
                                }}>
                                Load more...
                            </Button>
                        }
                    </> :
                    <EmptyState message={"No exercises found."}/>
                }
            </Block>
        </AppWrapper>
    );
}

export default Exercises;