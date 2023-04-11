import React, { useRef } from 'react';

import getAccept from './getAccept';
import { Input } from './types';

type WrapperProps = {
    onChange: (data: any) => void;
    options: Input<any>;
};

const Wrapper = (props: WrapperProps) => {
    const { options, onChange } = props;
    const { accept, multiple, extension } = options;
    const inputRef = useRef<HTMLInputElement>(null);

    return function ({ children }: any) {
        return (
            <div onClick={() => inputRef?.current?.click()}>
                {children}
                <input
                    ref={inputRef}
                    style={{ display: 'none' }}
                    type="file"
                    accept={getAccept(accept, extension)}
                    multiple={multiple}
                    maxLength={2}
                    onChange={onChange}
                />
            </div>
        );
    };
};

export default Wrapper;
