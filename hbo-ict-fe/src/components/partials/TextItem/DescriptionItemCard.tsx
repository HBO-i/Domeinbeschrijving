import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import HighlightText from '../HighlightText';
import {useFilter} from '../../contexts/FilterContext';
import {isDesktop} from '../../../utils/MediaQuery';

import {ReactComponent as Chevron} from '../../../assets/icons/chevron-down.svg';

interface Props {
    level: number;
    content: string | string[];
    children?: any;
    closable?: boolean;
    big?: any;
}

const DescriptionItemCard: FunctionComponent<Props> = (props) => {
    const filter = useFilter();

    const childrenRef = useRef<HTMLDivElement>(null);

    const [childrenOpen, setChildrenOpen] = useState(true);

    const type = Array.isArray(props.content) ? 'text' : 'title';

    const closable = !isDesktop() && props.closable;

    useEffect(() => {
        if (props.closable === false)
            return;

        if (!childrenRef.current)
            return;

        childrenRef.current.style.height = childrenOpen
            ? 'auto'
            : '0px';
    }, [childrenOpen]);

    return (
        <div className={`description-item description-item--${props.level}
         description-item--${childrenOpen ? 'open' : 'closed'} 
         description-item--${type}
         ${props.big ? 'description-item--big' : ''}
         `}>
            <div className={'description-item__block'} onClick={closable ? () => setChildrenOpen(!childrenOpen) : undefined}>
                { type === 'title'
                    ?  (
                       <>
                           <span className={'description-item__text'}>{ props.content }</span>
                           { (closable)&&
                               <Chevron className={`description-item__icon ${childrenOpen ? 'description-item__icon--rotated' : ''}`} />
                           }
                       </>
                    )
                    : (
                        <ul>
                            { (props.content as string[]).map((c, i) => (
                                <li key={i}>
                                    <HighlightText highlight={filter.data.search}>{ c }</HighlightText>
                                </li>
                            )) }
                        </ul>
                    )
                }
            </div>

            <div className={'description-item__children'} ref={childrenRef}>
                { props.children }
            </div>
        </div>
    );
};

export default DescriptionItemCard;
