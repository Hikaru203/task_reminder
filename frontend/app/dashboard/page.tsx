"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import api from "@/lib/axios";
import NoteCard from "@/components/NoteCard";
import NoteModal from "@/components/NoteModal";
import Link from "next/link";

interface Note {
    id: number;
    title: string;
    description: string;
    reminderTime: string;
    status: 'PENDING' | 'DONE' | 'CANCELLED';
}

export default function DashboardPage() {
    const { user, logout, loading } = useAuth();
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'DONE' | 'CANCELLED'>('ALL');

    const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            setNotes(res.data);
        } catch (err) {
            console.error("Failed to fetch notes", err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchNotes();
        }
    }, [user]);

    const handleCreate = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this note?")) {
            try {
                await api.delete(`/notes/${id}`);
                fetchNotes();
            } catch (err) {
                console.error("Failed to delete note", err);
            }
        }
    };

    const handleSubmit = async (noteData: Note) => {
        try {
            if (editingNote) {
                await api.put(`/notes/${editingNote.id}`, noteData);
            } else {
                await api.post("/notes", noteData);
            }
            setIsModalOpen(false);
            fetchNotes();
        } catch (err) {
            console.error("Failed to save note", err);
        }
    };

    const filteredNotes = notes.filter((note) => {
        if (filter === 'ALL') return true;
        return note.status === filter;
    });

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-800">Task Reminder</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Welcome, {user?.username}</span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                            {(['ALL', 'PENDING', 'DONE', 'CANCELLED'] as const).map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleCreate}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
                        >
                            + New Note
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>

                    {filteredNotes.length === 0 && (
                        <div className="text-center text-gray-500 mt-10">No notes found.</div>
                    )}
                </div>
            </main>

            <NoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingNote}
            />
        </div>
    );
}
