import React, { ReactNode, HTMLAttributes } from 'react';

type WrapperProps = {
    inputOnChange: (e: any) => void;
};

type Container = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const Wrapper = (props: WrapperProps) => {
    const { inputOnChange } = props;

    return function (containerProps: Container) {
        const { children, ...other } = containerProps;

        const onDropHandler = (e: any) => {
            e.preventDefault();
            inputOnChange(e);
        };

        return (
            <div {...other} onDragStart={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropHandler(e)}>
                {children}
            </div>
        );
    };
};

export default Wrapper;
