import React, {FunctionComponent} from 'react';

interface Props{
    onClick: () => void;
    children: any;

    className?: string;
    secondary?: any;
    disabled?: any;
}

const Button: FunctionComponent<Props> = (props) => {

    const onClick = () => {
        !props.disabled && props.onClick();
    };

    return (
        <div
            className={`button ${props.secondary ? 'button--secondary' : ''} ${props.className ?? ''} ${props.disabled ? 'button--disabled' : ''}`}
             onClick={onClick}>
            { props.children }
        </div>
    );
};

export default Button;
