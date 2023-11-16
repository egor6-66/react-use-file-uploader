import React from 'react';

type WrapperProps = {
    inputOnChange: (e: any) => void;
};

const Wrapper = (props: WrapperProps) => {
    const { inputOnChange } = props;

    return function ({ children }: any) {
        const onDropHandler = (e: any) => {
            e.preventDefault();
            inputOnChange(e);
        };

        return (
            <div onDragStart={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDropHandler(e)}>
                {children}
            </div>
        );
    };
};

export default Wrapper;
