import React, {useContext, useEffect} from 'react'

import {Block, Button, Text} from "react-barebones-ts";

import {useNavigate} from "react-router-dom";
import ThemeContext from "../contexts/theme-context";
import AppWrapper from "../layout/AppWrapper";
import SearchLine from "../assets/icons/search-line.svg";
import UserContext from "../contexts/user-context";
import Exercise from "../components/exercises/exercise/Exercise";
import EmptyState from "../components/exercises/empty-state/EmptyState";

const FavoriteExercises = () => {

    const userCtx = useContext(UserContext)
    const themeCtx = useContext(ThemeContext)

    useEffect(() => {
        if(userCtx.newFavorites) {
            userCtx.setNewFavorites(false)
        }
    }, [userCtx.newFavorites]);

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                <Block>
                    <Text classes={`${themeCtx.dark ? "bb-secondary-300" : "bb-neutral-900"}`} type="h1" text={"Favorite Exercises"}/>
                </Block>
                {userCtx.user.favorites && userCtx.user.favorites.length > 0 ?
                    <div className={"wopl-grid"}>
                        {userCtx.user.favorites.map((exercise: any) =>
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