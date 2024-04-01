import React, {useContext, useEffect, useState} from 'react'
import {Block, Icon} from "react-barebones-ts";

import SearchBar from "../search-bar/SearchBar";

import Filter from "../filter/Filter";
import ExerciseContext from "../../../contexts/exercise-context";
import SearchIcon from "../../../assets/icons/search-line.svg";
import FilterIcon from "../../../assets/icons/filter.svg";

type SearchFormProps = {
    setData: any
}

const SearchForm = ({setData} : SearchFormProps) => {

    const {filterExercises, saveQuery} = useContext(ExerciseContext)

    const [query, setQuery] = useState({})
    const [searchField, setSearchField] = useState('')
    const [type, setType] = useState('')
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [level, setLevel] = useState('')

    interface Query {
        [k: string]: string
    }
    useEffect(() => {
        let q: Query = {}
        if (searchField != '') {
            q["title"] = searchField
        }
        if (type != '') {
            q["type"] = type
        }
        if (bodyPart != '') {
            q["bodyPart"] = bodyPart
        }
        if (equipment != '') {
            q["equipment"] = equipment
        }
        if (level != '') {
            q["level"] = level
        }
        setQuery(q)
    }, [searchField, type, bodyPart, equipment, level]);

    useEffect(() => {
        saveQuery(query)
        setData(filterExercises(query))
    }, [query]);

    const filters = [
        {
            name: "All Types",
            selected: type,
            setSelected: setType,
            options: ["Strength", "Cardio"]
        },
        {
            name: "All Target Areas",
            selected: bodyPart,
            setSelected: setBodyPart,
            options: ["Biceps", "Quadriceps"]
        },
        {
            name: "All Equipment",
            selected: equipment,
            setSelected: setEquipment,
            options: ["Barbell", "Dumbbell"]
        },
        {
            name: "All Levels",
            selected: level,
            setSelected: setLevel,
            options: ["Beginner", "Intermediate"]
        }
    ]

    return (
        <Block classes="bb-bg-neutral-800 bb-secondary-300 bb-p-500 bb-border-radius-300 bb-wrap" style={{"gap" : "24px"}}>
            <Block align={"center"} classes={"bb-gap-300"}>
                <Block>
                    <Icon icon={<SearchIcon/>} size={24}/>
                </Block>
                <Block>
                    <SearchBar setSearchField={setSearchField}/>
                </Block>
            </Block>

            <Block align={"center"} classes="bb-gap-300">
                <Block>
                    <Icon icon={<FilterIcon/>} size={24}/>
                </Block>
                <Block classes={"bb-gap-300 bb-wrap"}>
                    {filters.map(filter => <Filter
                        key={filter.name}
                        name={filter.name}
                        setSelected={filter.setSelected}
                        selected={filter.selected}
                        options={filter.options}
                    />)}
                </Block>


            </Block>
        </Block>
    )
}

export default SearchForm;