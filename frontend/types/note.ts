export interface Note {
    id?: number;
    title: string;
    description: string;
    reminderTime: string;
    status: 'PENDING' | 'DONE' | 'CANCELLED';
}
