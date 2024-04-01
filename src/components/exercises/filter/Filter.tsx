import React, {useContext} from "react";

import {Block, Button, Dropdown, Icon, Text} from 'react-barebones-ts'
import ThemeContext from "../../../contexts/theme-context";
import ArrowDownIcon from '../../../assets/icons/arrow-down-s-line.svg'

type FilterProps = {
    name: string,
    selected: string,
    options: any,
    setSelected: any,
}

const Filter = ({name, selected, options, setSelected}: FilterProps) => {

    const {dark} = useContext(ThemeContext);

    const menuOptions = options.map((option: any) =>
            <Button
                classes={`bb-mx-300 wopl-button-${selected === option ? 'primary' : 'secondary'}${dark ? '-dark' : ''}`}
                key={option}
                disabled={option === name}
                action={() => setSelected((prevState: any) => prevState === option ? '' : option)}>
                {option}
            </Button>
        )

    return (
        <Block align={"center"} classes="bb-gap-300">
            <Dropdown
                buttonClasses={`wopl-button-${selected ? 'primary' : 'secondary'}${dark ? '-dark' : ''}`}
                buttonChildren={<>
                    {selected || name}
                    <Icon icon={<ArrowDownIcon/>}/>
                </>}
                menuClasses={"wopl-dropdown-dark"}
                buttonStyle={{"minWidth": "70px"}}
                direction={"right"}
                items={menuOptions}/>
        </Block>
    )
}

export default Filter;