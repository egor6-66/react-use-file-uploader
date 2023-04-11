type SizeFormat = 'kb' | 'mb' | 'gb' | 'tb';

function byteConverter(byte: number, format: SizeFormat | undefined): string {
    if (format === 'kb') return (byte / 1024).toFixed(1);
    if (format === 'mb') return (byte / 1048576).toFixed(2);
    if (format === 'gb') return (byte / 1073741824).toFixed(3);
    if (format === 'tb') return (byte / 1099511627776).toFixed(4);
    return String(byte);
}

export type { SizeFormat };
export default byteConverter;
