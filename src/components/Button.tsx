import React, {memo, FC} from 'react';
// @ts-ignore
import cn from 'classnames';
import classes from './Button.module.css';

interface ButtonProps {
    className: string;
    onClick: () => void;
}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
    return <button className={cn(classes.root, className)} {...rest}>{children}</button>
};

export default memo(Button)
