import React, { createContext, useState } from "react";

export type Exercise = {
    id: string,
    _id: string,
    title: string,
    desc: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string,
    counters?: any,
}

export type LastQuery = {
    title: string,
    type: string,
    bodyPart: string,
    equipment: string,
    level: string
}

type ExerciseCont = {
    exercises: Exercise[],
    getExercises: any,
    getMoreExercises: any,
    saveLastQuery: any,
    lastQuery: LastQuery,
    lastQueryParams: string,
    page: number
}

const ExerciseContext = createContext<ExerciseCont>(
    {
        exercises: [],
        getExercises: (query?: any) => {},
        getMoreExercises: () => {},
        saveLastQuery: (query: any) => {},
        lastQuery: {
            title: '',
            type: '',
            bodyPart: '',
            equipment: '',
            level: ''

        },
        lastQueryParams: '',
        page: 0,
    },
);

export const ExerciseContextProvider = (props: any) => {

    const [exercises, setExercises] = useState<Exercise[]>([])
    const [lastQuery, setLastQuery] = useState<LastQuery>({
        title: '',
        type: '',
        bodyPart: '',
        equipment: '',
        level: ''

    })
    const [lastQueryParams, setLastQueryParams] = useState<string>('')
    const [page, setPage] = useState<number>(0)


    const getExercises = async (query: any) => {
        let q: string = ''

        if(query && Object.keys(query).length > 0) {
            q += '?'
            for (const [key, value] of Object.entries(query)) {
                q +=`${key}=${value}&`
            }
        }

        if (q.length > 0) {
            setLastQueryParams(q)
            setPage(page+1)
            const res = await fetch(
                `${process.env.API_SERVER_URL}/exercises${q}`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )
            const foundExercises = await res.json()
            setExercises(foundExercises.data)
        }
    }

    const getMoreExercises = async () => {

        if (lastQueryParams.length > 0) {
            setPage(page+1)
            const res = await fetch(
                `${process.env.API_SERVER_URL}/exercises${lastQueryParams}skip=${page.toString()}`,{
                    method: "GET",
                    credentials: "include",
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                }
            )
            const foundExercises = await res.json()
            setExercises((prevState) => [...prevState, ...foundExercises.data])
            return foundExercises.data.length
        }
    }

    const saveLastQuery = (query: LastQuery) => {
        setLastQuery(query)
    }

    const context: ExerciseCont = {
        exercises,
        getExercises,
        getMoreExercises,
        saveLastQuery,
        lastQuery,
        lastQueryParams,
        page
    }

    return (
        <ExerciseContext.Provider value={context}>
            {props.children}
        </ExerciseContext.Provider>
    );
};

export default ExerciseContext;
