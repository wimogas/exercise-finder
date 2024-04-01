import React, {createContext, useEffect, useState} from "react";
import exerciseDataset from '../assets/dataset/exercisesdataset.json'

export type ExerciseType = {
    id: string,
    title: string,
    desc: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
}

export type Query = {
    title: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
}

type ExerciseCont = {
    exercises: ExerciseType[],
    filterExercises: any,
    page: number,
    paginate: any,
    limit: number
}

const ExerciseContext = createContext<ExerciseCont>(
    {
        exercises: [],
        filterExercises: (query: any) => {},
        page: 1,
        paginate: () => {},
        limit: 20,
    },
);

export const ExerciseContextProvider = (props: any) => {

    const [exercises, setExercises] = useState<ExerciseType[]>([])
    const [limit, setLimit] = useState<number>(20)
    const [page, setPage] = useState<number>(1)

    const filterExercises = (query: Query) => {
        const filteredExercises = exercises.filter(exercise => exercise.title.includes(query.title))
        setExercises(filteredExercises)
    }

    const paginate = () => {
        setPage(page+1)
    }

    const initExercises = (exercises: any) => {
        setExercises(exercises)
    }

    useEffect(() => {
        initExercises(exerciseDataset)
    }, []);

    const context: ExerciseCont = {
        exercises,
        filterExercises,
        page,
        paginate,
        limit
    }

    return (
        <ExerciseContext.Provider value={context}>
            {props.children}
        </ExerciseContext.Provider>
    );
};

export default ExerciseContext;
