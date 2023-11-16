import React, { ReactNode, HTMLAttributes, forwardRef, RefObject } from 'react';

type WrapperProps = {
    inputOnChange: (e: any) => void;
};

type Container = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Wrapper = (props: WrapperProps) => {
    const { inputOnChange } = props;

    return forwardRef((containerProps: Container, ref: any) => {
        const { children, ...other } = containerProps;

        const onDropHandler = (e: any) => {
            e.preventDefault();
            inputOnChange(e);
        };

        return (
            <div ref={ref} {...other} onDragStart={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropHandler(e)}>
                {children}
            </div>
        );
    });
};

export default Wrapper;
