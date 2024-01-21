import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo } from '../Features/todoSlice'
import { MdDelete, MdDoneOutline ,MdOutlineSend} from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";

const Todolist = () => {

  const [edit, setedit] = useState(false)
  const todos = useSelector((state) => state.todos)
  const dispatch = useDispatch();

  const editHandler=()=>{
    setedit(!edit)
  }
  return (
    <div>
      {/* {
        todos.map((todo) => (
          <div key={todo.id} className=' text-[18px] text-white flex justify-between  bg-[#182445] p-4 w-[40vw] tolist border-r-2 my-2 items-center rounded-[10px 0px 0px 0px]'>
            <h2 className={`${edit?'hidden':'block'} w-full text-center`}>{todo.text}</h2>
            <input type="text" className={` text-black m-2 outline-none ${edit?'block':'hidden'} w-full text-center`} />
            <button className='bg-green-500 m-2 hover:bg-green-700 rounded-full p-2' onClick={() => dispatch(removeTodo(todo.id))}>{<MdDoneOutline />}</button>
            <button className='bg-gray-500 m-2 hover:bg-gray-700 rounded-full p-2' onClick={editHandler}>{edit?<MdOutlineSend />:<HiMiniPencilSquare />}</button>
            <button className='bg-red-500 m-2 hover:bg-red-700 rounded-full p-2' onClick={() => dispatch(removeTodo(todo.id))}><MdDelete /></button>
          </div>
        ))
      } */}
    </div>
  )
}

export default Todolist