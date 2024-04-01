import React, {useContext, useEffect, useState} from 'react'

import {Block, Button, Text} from "react-barebones-ts";

import {Navigate, useNavigate} from "react-router-dom";
import ThemeContext from "../contexts/theme-context";
import AppWrapper from "../layout/AppWrapper";
import SearchLine from "../assets/icons/search-line.svg";
import UserContext from "../contexts/user-context";
import Exercise from "../components/exercises/exercise/Exercise";
import EmptyState from "../components/exercises/empty-state/EmptyState";
import exercises from "./Exercises";
import ExerciseContext, {ExerciseType} from "../contexts/exercise-context";
import exerciseContext from "../contexts/exercise-context";
import {set} from "js-cookie";

const FavoriteExercises = () => {
    const {exercises} = useContext(ExerciseContext)
    const {newFavorites, setNewFavorites, user} = useContext(UserContext)
    const {dark} = useContext(ThemeContext)

    const [isAuth, setIsAuth] = useState(user.email !== '')

    const [list, setList] = useState<ExerciseType[]>([])

    useEffect(() => {
        if(newFavorites) {
            setNewFavorites(false)
        }
    }, [newFavorites]);

    useEffect(() => {
        if (exercises.length > 0 && user.favorites.length > 0) {
            let foundFavorites:ExerciseType[] = []
            user.favorites.map(fav => {
                const found = exercises.find(ex => ex.id === fav)
                if (found) {
                    foundFavorites.push(found)
                }
            })
            setList(foundFavorites)
        } else {
            setList([])
        }

    }, [exercises, user.favorites]);

    useEffect(() => {
        if (user.email !== '') {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [user])

    if (!isAuth) {
        return <Navigate to={'/'}/>
    }

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                <Block>
                    <Text classes={`${dark ? "bb-secondary-300" : "bb-neutral-900"}`} type="h1" text={"Favorite Exercises"}/>
                </Block>
                {list.length > 0 ?
                    <div className={"wopl-grid"}>
                        {list.map((exercise: any) =>
                                <Exercise key={exercise.title} data={exercise}/>).reverse()}
                    </div>
                    :
                    <EmptyState message={"No favorites found."}/>
                }
            </Block>
        </AppWrapper>
    );
}

export default FavoriteExercises;