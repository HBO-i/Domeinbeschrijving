import React, {FunctionComponent} from 'react';

import {ReactComponent as CapIcon} from '../../../assets/icons/academic-cap.svg';
import {University} from '../../../data/factory/UniversityFactory';

interface Props {
    university: University;
}

const UniversityCard: FunctionComponent<Props> = (props) => {

    return (
        <div className={'university-card'} onClick={() => window.open(props.university.websiteURL, '_blank')}>
            <div className={'university-card__icon-container'}>
                <div className={'university-card__cap'}>
                    <CapIcon className={'university-card__icon'} />
                </div>
            </div>

            <img className={'university-card__image'} src={props.university.image} />

            {/*<span className={'university-card__title'}>{ props.university.name }</span>*/}
        </div>
    );
};

export default UniversityCard;
