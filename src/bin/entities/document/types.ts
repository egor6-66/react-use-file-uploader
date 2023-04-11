export type Document = {
    id: number;
    documentUrl: string;
    name: string;
    size: string;
    file: File;
};

export type DocumentProxy = {
    remove: () => void;
} & Document;

export type Extension = '.txt' | '.rtf' | '.doc' | '.docx' | '.html' | '.pdf' | '.odt' | '.ppt' | '.pptx' | '.xls' | '.xlsx';
