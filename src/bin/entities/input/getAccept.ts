import { Accept, Extension } from './types';
import { extensions, DocumentTypes } from '../document';

function getAccept(accept: Accept, extension: Extension<any> | undefined) {
    if (extension) {
        return extension.join(',');
    }
    return accept === 'document' ? extensions.join(',') : `${accept}/*`;
}

export default getAccept;
