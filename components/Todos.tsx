"use client"

import { TodosType } from "@/types";
import { FormEvent, useEffect, useState } from "react"
import Input from "./Input";
import { Edit } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react'
import clsx from "clsx";

const Todos = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const handleGetTodos = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/server-action/todos')
            setTodos(res.data.data)
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (title) {
            try {
                setLoading(true)
                const res = await axios.post('/api/server-action/todos', { title })
                if (res.data) {
                    setTodos(previous => [...previous, res.data[0]])
                    setTitle('');
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
    }

    const handleDeleteTodo = async (id: string) => {
        try {
            setLoading(true)
            const res = await axios.delete('/api/server-action/todos', { data: { id } })
            setTodos(previous => previous.filter((todo) => todo.id !== res.data.id))
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const editClick = (id: string, title: string) => {
        setEditId(id);
        setEditTitle(title)
    }

    const handleEditTodo = async (e: FormEvent) => {
        e.preventDefault();
        if (!editId || !editTitle) return
        const res = await axios.patch('/api/server-action/todos', { title: editTitle, id: editId })
        if (res.data) {
            const oldData = todos.filter((todo) => todo.id !== res.data[0].id);
            setTodos([...oldData, res.data[0]])
            setEditId('');
        }
    }

    const handleSignOut = async () => {
        const res = await axios.get('/api/sign-out');
        if (!res.data.error) {
            router.push('/signin');
        }
    }
    useEffect(() => {
        handleGetTodos()
    }, [])
    const splices = [...todos];
    const pages = [];
    for (let i = 1; i <= Math.ceil(splices.length / 5); i++) {
        pages.push(i);
    }
    const splice = splices.slice((page) * 5, (page + 1) * 5);
    
    return (
        <>
            <div className="flex w-full mt-3">
                <button onClick={handleGetTodos}><Loader2 className={clsx("h-6 w-6", loading && 'animate-spin')} /></button>
                <button className="ml-auto bg-red-400 p-3 text-white rounded-md" onClick={handleSignOut}>Sign out</button>
            </div>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col flex-1">
                    <label htmlFor="todo" className="text-3xl">Todo</label>
                    <Input id="todo" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="w-full flex justify-center items-center">
                    <button className="bg-indigo-300 mt-5 rounded-md text-white text-xl w-1/5 m-auto flex p-3 justify-center" disabled={loading}>
                        <span>Send</span>
                        {loading && (<Loader2 className="ml-1 h-6 w-6 animate-spin" />)}
                    </button>
                </div>
            </form>
            <div className="flex flex-col gap-y-2 mt-5">
                {splice?.length > 0 && (
                    splice.map((todo) => {
                        return (
                            <div className="flex p-3 bg-rose-500 rounded-md w-full relative" key={todo.id}>
                                {
                                    editId !== todo.id ? (
                                        <>
                                            ✅
                                            <span className="text-white text-xl ml-2 capitalize">{todo.title}</span>
                                        </>
                                    )
                                        : (
                                            <form className="absolute top-[-19px] flex items-center" onSubmit={handleEditTodo}>
                                                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} className="capitalize" />
                                                <button type="button" className="ml-2 text-white bg-indigo-300 mt-5 p-2 rounded-md"
                                                    onClick={() => setEditId('')}
                                                >Cancel</button>
                                            </form>
                                        )
                                }
                                <div className="flex ml-auto gap-x-3">
                                    <Edit className="h-5 w-5 cursor-pointer text-white" onClick={() => editClick(todo.id, todo.title)} />
                                    <span className="text-white text-xl cursor-pointer" onClick={() => handleDeleteTodo(todo.id)}>X</span>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            {
                pages.length >= 1 && (
                    <ul className="flex gap-x-2 mt-3 justify-center">
                        {pages.map((item) => (
                            <li key={item} className="bg-slate-300 p-1 rounded-md text-white cursor-pointer" onClick={() => setPage(item-1)}>{item}</li>
                        ))}
                    </ul>
                )
            }
        </>
    )
}

export default Todos