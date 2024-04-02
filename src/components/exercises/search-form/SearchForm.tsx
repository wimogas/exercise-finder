import React, {useEffect, useRef, useState} from 'react'
import {Block, Icon} from "react-barebones-ts";
import {ExerciseType} from "../../../contexts/exercise-context";

import SearchIcon from "../../../assets/icons/search-line.svg";
import FilterIcon from "../../../assets/icons/filter.svg";

import SearchBar from "../search-bar/SearchBar";
import Filter from "../filter/Filter";

type SearchFormProps = {
    data: any,
    setData: any,
}

type Query = {
    [k:string]: string
}

const SearchForm = ({data, setData} : SearchFormProps) => {

    const originalData = useRef<ExerciseType[]>()

    const [query, setQuery] = useState<Query|null>(null)

    const [searchField, setSearchField] = useState('')
    const [type, setType] = useState('')
    const [bodyPart, setBodyPart] = useState('')
    const [equipment, setEquipment] = useState('')
    const [level, setLevel] = useState('')

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
        if (Object.keys(q).length > 0) {
            setQuery(q)
        } else {
            setQuery(null)
        }
    }, [searchField, type, bodyPart, equipment, level]);

    const filter = (query: Query) => {
        if (!originalData.current) {
            originalData.current = data
        }
        if(originalData.current) {
            return originalData.current.filter((item: {[x: string]: string; }) =>
                Object.entries(query)
                    .every(([key, value]) => item[key as keyof Query].toLowerCase().includes(value.toLowerCase()))
            );
        }
    }

    useEffect(() => {
        if (query && Object.keys(query).length > 0) {
            setData(filter(query))
        } else if (originalData.current) {
            setData(originalData.current)
        }
    }, [query]);

    let filters = [
        {
            ref: "types",
            name: "All Types",
            selected: type,
            setSelected: setType,
            options: [""]
        },
        {
            ref: "bodyParts",
            name: "All Target Areas",
            selected: bodyPart,
            setSelected: setBodyPart,
            options: [""]
        },
        {
            ref: "equipments",
            name: "All Equipment",
            selected: equipment,
            setSelected: setEquipment,
            options: [""]
        },
        {
            ref: "levels",
            name: "All Levels",
            selected: level,
            setSelected: setLevel,
            options: [""]
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