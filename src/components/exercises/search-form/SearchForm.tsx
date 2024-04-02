import React, {useEffect, useRef, useState} from 'react'
import {Block, Icon} from "react-barebones-ts";
import {ExerciseType} from "../../../contexts/exercise-context";

import SearchIcon from "../../../assets/icons/search-line.svg";
import FilterIcon from "../../../assets/icons/filter.svg";

import SearchBar from "../search-bar/SearchBar";
import FilterList from "../filter-list/FilterList";

type SearchFormProps = {
    data: any,
    setData: any,
}

type Obj = {
    [k:string]: string
}

const SearchForm = ({data, setData} : SearchFormProps) => {

    const originalData = useRef<ExerciseType[]>()

    const [query, setQuery] = useState<Obj|null>(null)

    const [searchField, setSearchField] = useState('')
    const [filters, setFilters] = useState<Obj|null>({
        type: '',
        bodyPart: '',
        equipment: '',
        level: ''
    })

    useEffect(() => {
        buildQuery()
    }, [searchField, filters]);

    const buildQuery = () => {
        let q: Obj = {}
        if (searchField != '') {
            q["title"] = searchField
        }
        if (filters) {
            Object.entries(filters)
                .map(([key, value]) => {
                    return key !== '' ? q[key] = value : ''
                })
        }
        if (Object.keys(q).length > 0) {
            setQuery(q)
        } else {
            setQuery(null)
        }
    }

    const filter = (query: Obj) => {
        if (!originalData.current) {
            originalData.current = data
        }
        if(originalData.current) {
            return originalData.current.filter((item: {[x: string]: string; }) =>
                Object.entries(query)
                    .every(([key, value]) => item[key as keyof Obj].toLowerCase().includes(value.toLowerCase()))
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
                <FilterList filters={filters} setFilters={setFilters}/>
            </Block>
        </Block>
    )
}

export default SearchForm;