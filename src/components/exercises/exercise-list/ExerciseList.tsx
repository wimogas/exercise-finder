import React, {useContext, useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";

import {Button, Text} from "react-barebones-ts";
import Exercise from "../exercise/Exercise";
import ThemeContext from "../../../contexts/theme-context";
import {ExerciseType} from "../../../contexts/exercise-context";
import EmptyState from "../empty-state/EmptyState";

type ExerciseListProps = {
    data?: any
}

const ExerciseList = ({data}: ExerciseListProps) => {
    const location = useLocation();
    const {pathname} = location;

    const {dark} = useContext(ThemeContext)

    const originalData = useRef<ExerciseType[]|null>()

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(20)

    const [showMore, setShowMore] = useState(true)

    useEffect(() => {
        if (!originalData.current) {
            originalData.current = data
        }
    }, []);

    return (
        <>
            <Text classes={`${dark ? "bb-secondary-300" : "bb-neutral-900"}`} type="h1" text={`${pathname.includes('favorites') ? 'Favorites' : 'Exercises'} (${data.length})`}/>

            {data.length > 0 ?
            <>
                {data.slice(0, page * limit).map((exercise: any) =>
                    <Exercise key={exercise.id} data={exercise}/>
                )}
                {showMore &&
                    <Button
                        classes={`bb-block-row-center wopl-button-secondary${dark ? '-dark' : ''}`}
                        action={ () => {
                            setPage(page+1)
                            setShowMore(data.slice(0, page * limit).length !== (originalData.current && originalData.current.length))
                        }}>
                        Load more...
                    </Button>
                }
            </> :
            <>
                <EmptyState message={"No exercises found"}/>
            </>}

        </>
    )
}

export default ExerciseList;