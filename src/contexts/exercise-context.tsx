import React, {createContext, useEffect, useState} from "react";
import exerciseDataset from '../assets/dataset/exercisesdataset.json'
import exercise from "../components/exercises/exercise/Exercise";

export type ExerciseType = {
    id: string,
    title: string,
    desc: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
}

type ExerciseCont = {
    exercises: ExerciseType[],
    page: number,
    paginate: any,
    limit: number,
    filterExercises: any,
    query: any,
    saveQuery: any
    getMeta: any,
    types: any,
    bodyParts: any,
    equipments: any,
    levels: any
}

interface Query {
    title: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
}

const ExerciseContext = createContext<ExerciseCont>(
    {
        exercises: [],
        page: 1,
        paginate: () => {},
        limit: 20,
        filterExercises: () => {},
        query: {},
        saveQuery: (query: Query) => {},
        getMeta: () => {},
        types: null,
        bodyParts: null,
        equipments: null,
        levels: null
    },
);

export const ExerciseContextProvider = (props: any) => {

    const [exercises, setExercises] = useState<ExerciseType[]>([])
    const [limit, setLimit] = useState<number>(20)
    const [page, setPage] = useState<number>(1)
    const [query, setQuery] = useState<Query|{}>({})
    const [types, setTypes] = useState<Set<any>|null>()
    const [bodyParts, setBodyParts] = useState<Set<any>|null>()
    const [equipments, setEquipments] = useState<Set<any>|null>()
    const [levels, setLevels] = useState<Set<any>|null>()

    const paginate = () => {
        setPage(page+1)
    }

    const initExercises = (exercises: any) => {
        setExercises(exercises)
    }

    const filterExercises = (query: Query) => {
        return exercises.filter(item =>
            Object.entries(query)
                .every(([key, value]) => item[key as keyof Query].toLowerCase().includes(value.toLowerCase()))
        );
    }

    const saveQuery = (query: Query) => {
        setQuery(query)
    }

    useEffect(() => {
        initExercises(exerciseDataset)
    }, []);

    const getMeta = () => {
        let types = new Set()
        let bodyParts = new Set()
        let equipments = new Set()
        let levels = new Set()
        exercises.map(exercise => {
            types.add(exercise.type)
            bodyParts.add(exercise.bodyPart)
            equipments.add(exercise.equipment)
            levels.add(exercise.level)
        })
        setTypes(types)
        setBodyParts(bodyParts)
        setEquipments(equipments)
        setLevels(levels)
    }

    const context: ExerciseCont = {
        exercises,
        page,
        paginate,
        limit,
        filterExercises,
        query,
        saveQuery,
        getMeta,
        types,
        bodyParts,
        equipments,
        levels
    }

    return (
        <ExerciseContext.Provider value={context}>
            {props.children}
        </ExerciseContext.Provider>
    );
};

export default ExerciseContext;
