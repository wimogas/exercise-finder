import React, {useContext, useState} from 'react'

import {Block, Button, Text} from "react-barebones-ts";
import SearchQuery from "../components/exercises/search-query/SearchQuery";
import ExerciseContext from "../contexts/exercise-context";

import {useNavigate} from "react-router-dom";
import ThemeContext from "../contexts/theme-context";
import AppWrapper from "../layout/AppWrapper";
import SearchLine from "../assets/icons/search-line.svg";
import Exercise from "../components/exercises/exercise/Exercise";
import EmptyState from "../components/exercises/empty-state/EmptyState";

const Exercises = () => {

    const navigate = useNavigate()

    const exerciseCtx = useContext(ExerciseContext)
    const themeCtx = useContext(ThemeContext)

    const [showMore, setShowMore] = useState(true)

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                <Block>
                    <Text classes={`${themeCtx.dark ? "bb-secondary-300" : "bb-neutral-900"}`} type="h1" text={"Exercises"}/>
                </Block>
                {exerciseCtx.exercises.length > 0 ?
                    <>
                        <SearchQuery/>
                        {exerciseCtx.exercises.map(exercise => <Exercise key={exercise.title} data={exercise}/>)}
                        {showMore &&
                            <Button
                                classes={`bb-block-row-center wopl-button-secondary${themeCtx.dark ? '-dark' : ''}`}
                                action={async () => {
                                    const found = await exerciseCtx.getMoreExercises()
                                    if (found === 0) {
                                        setShowMore(false)
                                    }
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