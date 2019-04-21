export interface PaperStruct {
    id: string,
    title: string;
    abstract: string;
    content: string;
    created_at: number;
    edited_at: number;
}

export const EmptyPaper: PaperStruct = {
    id: "",
    title: "",
    abstract: "",
    content: "",
    created_at: 0,
    edited_at: 0
}

export const TokenKey = "LeoBlogToken"

export function GetApi(): string {
    if (process.env.NODE_ENV !== 'production') {
        return `http://localhost:7777`
    }
    return ''
}