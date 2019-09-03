import React, {useContext, useState} from 'react';
import {ArrowLeft, ArrowRight} from '@material-ui/icons';
import {OrganizerContext} from "../shared/OrganizerProvider";
import './index.scss'

export const Selector = () => {
    const { subject, changeMonth } = useContext<any>(OrganizerContext );
    const [subLabel, setSubLabel] = useState<string>(subject.value.format('MMMM YYYY'));
    const handleSelectorClick = (offset:number) => {
        changeMonth(offset)
        setSubLabel(subject.value.format('MMMM YYYY'))
    }
    return <p>
        <ArrowLeft onClick={() => handleSelectorClick(-1)} />
          <span>{subLabel} </span>
        <ArrowRight onClick={() => handleSelectorClick(1)} />
    </p>
}
