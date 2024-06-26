import React, {useContext, useEffect, useState} from "react";
import {Badge, Block, Button, Text} from 'react-barebones-ts'
import UserContext from "../../../contexts/user-context";

import UnHeartIcon from '../../../assets/icons/heart-fill.svg'
import HeartIcon from '../../../assets/icons/heart-line.svg'

type ExerciseProps = {
    data?: any,
}
const Exercise = ({data}: ExerciseProps) => {

    const {user, addFavorite, removeFavorite, setNewFavorites} = useContext(UserContext)

    const [isFavorite, setIsFavorite] = useState(false)

    const handleAddToFavorites = () => {
        if (isFavorite) {
            removeFavorite(data.id)
            setIsFavorite(false)
            setNewFavorites(false)
        } else {
            addFavorite(data.id)
            setIsFavorite(true)
        }
    }
    useEffect(() => {
        if (user.favorites.some((fav: any) => fav === data.id)) {
            setIsFavorite(true)
        }
    }, [user.favorites]);

    return (
        <Block column classes={"wopl-exercise"}>
            <Block stretch justify={"space-between"} classes={"bb-gap-300"}>
                <Text type="h3" text={data.title}/>
                <Block justify={"flex-end"}>
                    <Button
                        classes="wopl-button-icon"
                        disabled={user.email === ''}
                        action={() => handleAddToFavorites()}
                        icon={isFavorite ? <UnHeartIcon/> : <HeartIcon/>}
                        iconSize={20}>
                    </Button>
                </Block>
            </Block>

            <Text classes="bb-secondary-400" type="p" text={data.desc}/>
            <Block align="center" justify={"space-between"}>
                <Block classes="bb-wrap bb-gap-300">
                    <Badge classes="wopl-badge">{data.type}</Badge>
                    <Badge classes="wopl-badge">{data.bodyPart}</Badge>
                    <Badge classes="wopl-badge">{data.equipment}</Badge>
                    <Badge classes="wopl-badge">{data.level}</Badge>
                </Block>
            </Block>
        </Block>
    )
}

export default Exercise;