import React, {useContext, useEffect, useState} from 'react'
import {Block, Icon} from "react-barebones-ts";

import SearchBar from "../search-bar/SearchBar";

import Filter from "../filter/Filter";
import ExerciseContext from "../../../contexts/exercise-context";
import SearchIcon from "../../../assets/icons/search-line.svg";
import FilterIcon from "../../../assets/icons/filter.svg";
import Spinner from "../../spinner/Spinner";

type SearchFormProps = {
    setData: any
}

const SearchForm = ({setData} : SearchFormProps) => {

    const {filterExercises, saveQuery, types, bodyParts, equipments, levels, loadingExercises } = useContext(ExerciseContext)

    const [query, setQuery] = useState({})
    const [searchField, setSearchField] = useState('')
    const [type, setType] = useState('')
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [level, setLevel] = useState('')
    const [loading, setLoading] = useState(true)
    const [meta, setMeta] = useState<any>()

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

    useEffect(() => {
        if(types && bodyParts && equipments && levels) {
            setMeta({
                types,
                bodyParts,
                equipments,
                levels
            })
            setLoading(false)
        }
    }, [types, bodyParts, equipments, levels]);

    let filters = [
        {
            ref: "types",
            name: "All Types",
            selected: type,
            setSelected: setType,
        },
        {
            ref: "bodyParts",
            name: "All Target Areas",
            selected: bodyPart,
            setSelected: setBodyPart,
        },
        {
            ref: "equipments",
            name: "All Equipment",
            selected: equipment,
            setSelected: setEquipment,
        },
        {
            ref: "levels",
            name: "All Levels",
            selected: level,
            setSelected: setLevel,
        }
    ]

    return (
        <Block column classes="bb-bg-neutral-800 bb-secondary-300 bb-p-500 bb-border-radius-300 bb-gap-300">
            <Block stretch align={"center"} classes={"bb-gap-300"}>
                <Block style={{"flex": "0"}}>
                    <Icon icon={<SearchIcon/>} size={24}/>
                </Block>
                <Block stretch flex={9}>
                    <SearchBar setSearchField={setSearchField}/>
                </Block>
            </Block>

            <Block align={"center"} classes="bb-gap-300">
                <Block>
                    <Icon icon={<FilterIcon/>} size={24}/>
                </Block>
                <Block classes={"bb-gap-300 bb-wrap"}>
                    {loading && loadingExercises && <Spinner/>}
                    {!loading && !loadingExercises && filters.map(filter => <Filter
                        key={filter.name}
                        name={filter.name}
                        setSelected={filter.setSelected}
                        selected={filter.selected}
                        options={meta && Array.from(meta[filter.ref])}
                    />)}
                </Block>


            </Block>
        </Block>
    )
}

export default SearchForm;