import React, {createContext, useEffect, useState} from "react";
import {getDatasetUrl} from "../firebase";

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
    loadingExercises: boolean,
}

export interface FilterQuery {
    title: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
}

const ExerciseContext = createContext<ExerciseCont>(
    {
        exercises: [],
        loadingExercises: false,
    },
);

export const ExerciseContextProvider = (props: any) => {

    const [exercises, setExercises] = useState<ExerciseType[]>([])
    const [loadingExercises, setLoadingExercises] = useState(false)

    const initExercises = async () => {
        setLoadingExercises(true)
        const url = await getDatasetUrl()
        if (url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    setExercises(data)
                    setLoadingExercises(false)
                });
        }
    }

    useEffect(() => {
        initExercises().catch(console.error)
    }, []);

    const context: ExerciseCont = {
        exercises,
        loadingExercises,
    }

    return (
        <ExerciseContext.Provider value={context}>
            {props.children}
        </ExerciseContext.Provider>
    );
};

export default ExerciseContext;
