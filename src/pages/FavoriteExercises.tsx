import React, {useContext, useEffect, useState} from 'react'
import {Block} from "react-barebones-ts";
import AppWrapper from "../layout/AppWrapper";
import UserContext from "../contexts/user-context";
import ExerciseContext, {ExerciseType} from "../contexts/exercise-context";
import Spinner from "../components/spinner/Spinner";
import ExerciseList from "../components/exercises/exercise-list/ExerciseList";
import SearchForm from "../components/exercises/search-form/SearchForm";

const FavoriteExercises = () => {

    const {exercises, loadingExercises} = useContext(ExerciseContext)
    const {user, loadFavorites} = useContext(UserContext)

    const [favorites, setFavorites] = useState<ExerciseType[]|null>(null)

    useEffect(() => {
        if (exercises.length > 0 && user.favorites.length > 0) {
            setFavorites(loadFavorites())

        } else {
            setFavorites([])
        }

    }, [exercises, user.favorites]);

    return (
        <AppWrapper>
            <Block column classes="bb-gap-300">
                {loadingExercises ? <Spinner/> :
                    <>
                        {favorites &&
                            <>
                                <SearchForm data={favorites} setData={setFavorites}/>
                                <ExerciseList data={favorites}/>
                            </>
                        }
                    </>
                }
            </Block>
        </AppWrapper>
    );
}

export default FavoriteExercises;