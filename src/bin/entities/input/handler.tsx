import React, { useEffect, useRef } from 'react';

import getAccept from './getAccept';
import { Input } from './types';

type WrapperProps = {
    onChange: (data: any) => void;
    options: Input<any>;
    clickedFileInput: () => void;
};

const Wrapper = (props: WrapperProps) => {
    const { options, onChange, clickedFileInput } = props;
    const { accept, multiple, extension } = options;

    const inputRef = useRef<HTMLInputElement>(null);

    function Input() {
        return <input ref={inputRef} style={{ display: 'none' }} type="file" accept={getAccept(accept, extension)} multiple={multiple} onChange={onChange} />;
    }

    return function ({ children }: any) {
        return (
            <div
                onClick={() => {
                    inputRef?.current?.click();
                    clickedFileInput();
                }}
            >
                {children}
                <Input />
            </div>
        );
    };
};

export default Wrapper;
