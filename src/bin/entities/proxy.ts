function fileProxy(obj: object & { [key: string]: any; id: number }, removeItem: (id: number) => void) {
    return new Proxy(obj, {
        get(target: any, prop: any, receiver) {
            switch (prop) {
                case 'remove':
                    return () => {
                        removeItem(target.id);
                    };

                default:
                    return target[prop];
            }
        },
    });
}

export default fileProxy;
