import React, {FunctionComponent} from 'react';

import {ReactComponent as Cube} from '../../assets/KUBUS.svg';
import Button from './Button';

export const HeroTitle: FunctionComponent<{ children: any }> = (props) => {

    return (
        <h1 className={'hero__title'}>
            { props.children }
        </h1>
    );
};

export const HeroText: FunctionComponent<{ children?: any, text?: string }> = (props) => {

    return (
        <h2 className={'hero__text'} dangerouslySetInnerHTML={props.text ? { __html: props.text } : undefined}>{ props.children }</h2>
    );
};

export const HeroButton: FunctionComponent<{ children: any, onClick: () => void }> = (props) => {
    return (
        <Button onClick={props.onClick} className={'hero__button'}>{ props.children }</Button>
    );
};

interface Props {
    children?: any;
    title?: string;
    text?: string;

}

const Hero: FunctionComponent<Props> = (props) => {

    return (
        <div className={'hero'}>
            <div className={'hero__left'}>
                { props.title &&
                    <HeroTitle>
                        { props.title }
                    </HeroTitle>
                }

                { props.text &&
                    <HeroText>
                        <span dangerouslySetInnerHTML={{ __html: props.text }} />
                    </HeroText>
                }

                { props.children }

            </div>

            <div className={'hero__right'}>
                <Cube className={'hero__cube'} />
            </div>
        </div>
    );
};

export default Hero;
