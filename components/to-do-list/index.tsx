import Link from 'next/link'
import { useState, useEffect} from 'react';
import { checkServerIdentity } from 'tls';
import SemesterButton from '@/components/semester-button'



function ToDoList( {user_id, todo_items} ) {
    const [deleteBool, setDelete] = useState(false)
    const [addItem, setAddItem] = useState(false)
    const [item, setItem] = useState("")
    const [items, setItems] = useState(todo_items ? todo_items : [])
    const [submitting, setSubmitting] = useState(false)
    const [addAnother, setAddAnother] = useState('Add')

    function toggleDelete(toggle_delete) {
        if(!toggle_delete){
            setDelete(true)
        } else {
            setDelete(false)
        }
    }

    async function deleteHandler(todo_id) {
        document.getElementById(`${todo_id}`).style.display = "none";
        let res = await fetch(`/api/delete-todo-item?todo_id=${todo_id}`, { method: 'DELETE' })
        let json = await res.json()
        if (!res.ok) throw Error(json.message)
      }

    function toggleAdd(bool){
        if(!bool){
            setAddItem(true)
        } else {
            setAddItem(false)
        }
    }

    async function checkHandler(checked, todo_id){
        var check = checked === false ? 0 : 1

        var updated_todo = [...items]

        for (var i = 0 ; i < items.length ; i++){
            if (items[i].todo_id === todo_id && checked === true) {
                updated_todo[i].complete = 1;
            } else if (items[i].todo_id === todo_id && checked === false){
                updated_todo[i].complete = 0;
            }
        }
        
        setItems(updated_todo)

        const res = await fetch('/api/add-check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                check,
                todo_id
            }),
            })
            
        const json = await res.json()
        if (!res.ok) throw Error(json.message)
        
    }
    

    async function itemHandler() {
        setAddItem(false)
        var u_id =  user_id
        const res = await fetch('/api/add-todo-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               u_id,
                item
            }),
        })
        const json = await res.json()
        setItem("")
        if (!res.ok) throw Error(json.message)

        const res2 = await fetch(`/api/get-todo-items?user_id=${user_id}`, { method: 'GET' })
        const json2 = await res2.json()
        setItem("")
        if (!res2.ok) throw Error(json2.message)
        setItems(json2)
      }


      

    
    if( todo_items && items) {
        return (
            <>
                <div className="mt-12 w-full flex flex-col items-center">
                    <div className="contentCont flex flex-col">
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                                <h3 className="font-bold text-2xl">To-Do List</h3>
                            </div>
                            <div className="flex flex-row h-36px items-center ">
                                <a className="flex items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
                                    <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                                </a>
                                { !addItem &&
                                    <a className="" onClick={() => toggleAdd(addItem)}>
                                        <img src="/add-icon.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/> 
                                    </a>
                                } 
                                { addItem &&
                                    <a className="" onClick={() => toggleAdd(addItem)}>
                                        <img src="/upArrow.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/> 
                                    </a> 
                                }
                            </div>
                        </div>
                        { addItem && 
                            <form className="flex flex-row mt-2 justify-items-start" onSubmit={() => itemHandler()}>
                                <input
                                    id="to-do"
                                    autoFocus
                                    autoComplete="off"
                                    className="border-b border-black pl-1 pr-1 w-full mr-4 mt-2"
                                    name="to-do"
                                    type="text"
                                    placeholder="Add Item"
                                    onChange={(e) => setItem(e.target.value)}
                                />
                                <SemesterButton disabled={submitting} type="submit">
                                    {submitting ? 'Adding ...' : addAnother}
                                </SemesterButton>
                            </form>
                        }
                        <form className='flex flex-col w-full mt-3' >
                            {items.map((e) => (
                                <div className="py-1 w-full flex flex-row justify-between items-center" id={e.todo_id}>
                                    <div className="flex flex-row items-center align-middle ">
                                    <input
                                        className="mr-4 ml-2 mt-1px "
                                        type="checkbox"
                                        checked={e.complete === 1}
                                        onChange={(f) => checkHandler(f.target.checked, e.todo_id)}
                                    />
                                        <p>{e.todo_item}</p>
                                    </div>
                                    <div className="flex flex-row">
                                        { deleteBool &&
                                        <a onClick={() => deleteHandler(e.todo_id)} className="deleteEntry">
                                            <img src="/delete-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                                        </a> 
                                        }
                                    </div>
                                </div>
                            ))}
                        </form>
                    </div> 
                </div>
            </>
        )
    } else {
        return (
            <div className="mt-12 w-full flex flex-col items-center">
                <div className="contentCont flex flex-col">
                    <div className="w-full flex flex-row justify-between items-center">
                        <div className="border-4 rounded-lg border-customBlue px-2 pb-3px">
                            <h3 className="font-bold text-2xl">To-Do List</h3>
                        </div>
                        <div className="flex flex-row h-36px items-center">
                            <a className="flex items-center mr-4" onClick={() => toggleDelete(deleteBool)}>
                                <img src="/edit-icon.svg" style={{ height: 24, width: 20, cursor: 'pointer'}}/>
                            </a>
                            { !addItem &&
                                <a className="" onClick={() => toggleAdd(addItem)}>
                                    <img src="/add-icon.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/> 
                                </a>
                            } 
                            { addItem &&
                                <a className="" onClick={() => toggleAdd(addItem)}>
                                    <img src="/upArrow.svg" style={{ height: "auto", width: 30, cursor: 'pointer'}}/> 
                                </a> 
                            }
                        </div>
                    </div>
                    { addItem && 
                        <div className="flex flex-row justify-items-start">
                            <input
                                id="to-do"
                                autoComplete="off"
                                className="border-b border-black pl-1 pr-1 w-full mr-4 mt-2"
                                name="to-do"
                                type="text"
                                placeholder="Add Item"
                                onChange={(e) => setItem(e.target.value)}
                            />
                            <button onClick={() => itemHandler()}>
                                Add
                            </button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ToDoList