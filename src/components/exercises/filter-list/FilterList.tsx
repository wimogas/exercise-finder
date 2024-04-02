import React, {useContext, useEffect, useState} from 'react'

import {Block} from "react-barebones-ts";
import Filter from "../filter/Filter";
import ExerciseContext from "../../../contexts/exercise-context";
import exercise from "../exercise/Exercise";

type FilterListProps = {
    filters: any,
    setFilters: any
}

type Filter = {
    ref: string,
    name: string,
    selected: any,
    options: any[]
}

const FilterList = ({filters, setFilters} : FilterListProps) => {

    const {exercises} = useContext(ExerciseContext)

    const [filterList, setFilterList] = useState<Filter[]>([
        {
            ref: "type",
            name: "All Types",
            selected: filters.type,
            options: []
        },
        {
            ref: "bodyPart",
            name: "All Target Areas",
            selected: filters.bodyPart,
            options: []
        },
        {
            ref: "equipment",
            name: "All Equipment",
            selected: filters.equipment,
            options: []
        },
        {
            ref: "level",
            name: "All Levels",
            selected: filters.level,
            options: []
        }
    ])

    const getFilters = () => {
        let types: Set<string> = new Set()
        let bodyParts: Set<string> = new Set()
        let equipments: Set<string> = new Set()
        let levels: Set<string> = new Set()
        exercises.map(exercise => {
            types.add(exercise.type)
            bodyParts.add(exercise.bodyPart)
            equipments.add(exercise.equipment)
            levels.add(exercise.level)
        })
        setFilterList((filterList) => {
            filterList.map(filter => {
                switch (filter.ref) {
                    case 'type':
                        filter.options = Array.from(types)
                        break;
                    case 'bodyPart':
                        filter.options = Array.from(bodyParts)
                        break;
                    case 'equipment':
                        filter.options = Array.from(equipments)
                        break;
                    case 'level':
                        filter.options = Array.from(levels)
                        break;
                }
            })
            return filterList
        })
    }

    useEffect(() => {
        if (exercise.length > 0) {
            getFilters()
        }
    }, [exercises]);

    return (
        <Block classes={"bb-gap-300 bb-wrap"}>
            {filterList.map(filter => <Filter
                key={filter.ref}
                filter={filter.ref}
                name={filter.name}
                setSelected={setFilters}
                filters={filters}
                options={filter.options}
            />)}
        </Block>
    )
}

export default FilterList;