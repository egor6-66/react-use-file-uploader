import React, { useEffect, useRef } from 'react';

import getAccept from './getAccept';
import { Input } from './types';

type WrapperProps = {
    options: Input<any>;
    open: () => void;
};

const Wrapper = (props: WrapperProps) => {
    const { options, open } = props;

    return function ({ children }: any) {
        return <div onClick={open}>{children}</div>;
    };
};

export default Wrapper;
