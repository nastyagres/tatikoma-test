import React, {memo, FC} from 'react';
// @ts-ignore
import cn from 'classnames';
import classes from './Button.module.css';

interface ButtonProps {
    className?: string;
    onClick?: (param: any) => void;
    children?: any;
}

const Button: FC<ButtonProps> = ({ className, children, ...rest }) => {
    return <div className={cn(classes.root, className)} {...rest}>{children}</div>
};

export default memo(Button)
