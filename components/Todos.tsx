"use client"

import { TodosType } from "@/types";
import { FormEvent, useEffect, useState } from "react"
import Input from "./Input";
import { Edit } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";

const Todos = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<TodosType[]>([]);
    const [title, setTitle] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editId, setEditId] = useState('');
    const handleGetTodos = async () => {
        const res = await axios.get('/api/server-action/todos')
        setTodos(res.data.data)
    }
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (title) {
            const res= await axios.post('/api/server-action/todos', { title })
            if (res.data) {
                setTodos(previous => [...previous, res.data[0]])
                setTitle('');
            }
        }
    }

    const handleDeleteTodo = async (id: string) => {
        const res = await axios.delete('/api/server-action/todos', { data: { id } })
        setTodos(previous => previous.filter((todo) => todo.id !== res.data.id))
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
    return (
        <>
            <div className="flex flex-col gap-y-2 mb-3">
                {todos?.length > 0 && (
                    todos.map((todo) => {
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
            <form onSubmit={onSubmit}>
                <div className="flex flex-col flex-1">
                    <label htmlFor="todo" className="text-3xl">Todo</label>
                    <Input id="todo" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="w-full flex justify-center items-center">
                    <button className="bg-indigo-300 mt-5 rounded-md text-white text-xl w-1/5 m-auto">Send</button>
                </div>
            </form>
            <div className="flex w-full mt-3">
                <button className="ml-auto bg-red-400 p-3 text-white rounded-md" onClick={handleSignOut}>Sign out</button>
            </div>
        </>
    )
}

export default Todos