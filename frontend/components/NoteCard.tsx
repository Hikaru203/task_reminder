import React from 'react';
import { format } from 'date-fns';

interface Note {
    id: number;
    title: string;
    description: string;
    reminderTime: string;
    status: 'PENDING' | 'DONE' | 'CANCELLED';
}

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
    const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        DONE: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{note.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[note.status]}`}>
                    {note.status}
                </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{note.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="mr-2">📅</span>
                {format(new Date(note.reminderTime), 'PPP p')}
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    onClick={() => onEdit(note)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(note.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default NoteCard;
