import React, {useContext, useEffect, useState} from 'react'
import {Block, Button, Text} from "react-barebones-ts";

import SearchBar from "../search-bar/SearchBar";
import SearchLine from '../../../assets/icons/search-line.svg'
import ExerciseContext from "../../../contexts/exercise-context";
import Filter from "../filter/Filter";
import ThemeContext from "../../../contexts/theme-context";
import {useNavigate} from "react-router-dom";
import CloseIcon from '../../../assets/icons/close-fill.svg'
import BackIcon from "../../../assets/icons/arrow-left-s-line.svg";

const SearchForm = () => {

    const navigate = useNavigate();

    const exerciseCtx = useContext(ExerciseContext)
    const themeCtx = useContext(ThemeContext)

    const [invalidSearch, setInvalidSearch] = useState(true)

    const [searchField, setSearchField] = useState('')
    const [type, setType] = useState('')
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [level, setLevel] = useState('')

    useEffect(() => {
        if( searchField.length > 0 || (
            type !== '' || bodyPart !== '' || equipment !== '' || level !== ''
        ) ) {
            setInvalidSearch(false)
        } else {
            setInvalidSearch(true)
        }
    }, [searchField, type, bodyPart, equipment, level]);

    const handleOnSubmit = async () => {
        let query: {[k: string] : string} = {}
        if (searchField !== '') {
            query["title"] = searchField
        }
        if (type !== '') {
            query["type"] = type
        }
        if (bodyPart !== '') {
            query["bodyPart"] = bodyPart
        }
        if (equipment !== '') {
            query["equipment"] = equipment
        }
        if (level !== '') {
            query["level"] = level
        }
        exerciseCtx.filterExercises(query)
        navigate('/')
    }

    return (
        <Block column classes="bb-gap-300">
            <Block stretch>
                <SearchBar setSearchField={setSearchField}/>
            </Block>
            <Block column classes="bb-bg-neutral-800 bb-p-500 bb-border-radius-300">
                <Filter
                    name={"Type"}
                    selected={type}
                    setSelected={setType}
                    options={["Strength", "Cardio"]}/>

                <Filter
                    name={"Target Area"}
                    selected={bodyPart}
                    setSelected={setBodyPart}
                    options={["Biceps", "Quadriceps"]}/>
                <Filter
                    name={"Equipment"}
                    selected={equipment}
                    setSelected={setEquipment}
                    options={["Barbell", "Dumbbell"]}/>
                <Filter
                    name={"Level"}
                    selected={level}
                    setSelected={setLevel}
                    options={["Beginner", "Intermediate"]}/>
            </Block>
            <Block classes="tf-overlay-bottom-bar" justify={"flex-end"}>
                <Button
                    disabled={invalidSearch}
                    classes={`wopl-button-primary${themeCtx.dark ? '-dark' : ''}`}
                    icon={<SearchLine/>}
                    action={handleOnSubmit}>Search
                </Button>
            </Block>
        </Block>
    )
}

export default SearchForm;