import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@mui/material/Button';
import './Todo.css';


export default function Todo(){
    let[todo,setTodo]=useState([{task:"",id:uuidv4(),isDone:false}])
    let[newTodo,setNewTodo]=useState("")

    {/*greeting time calculation */}
    const getGreetingTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

  // Count completed tasks
  const completedTasks = todo.filter(todo => todo.isDone).length;
  const totalTasks = todo.filter(todo => todo.id).length;

   {/*greeting message display */}
  const getMotivationalMessage = () => {
    if (completedTasks === 0) {
      return "You havent completed any tasks yet. Keep going!";
    } else if(completedTasks===totalTasks) {
      return "Great job! You've completed all tasks";
    }else{
      return "You're making progress. Keep it up!";
    }
  };
    {/*add new todos */}
    function addNewTask(){
            setTodo((prevTodo)=>{
                return [...prevTodo,{task:newTodo,id:uuidv4()}];
            })
            setNewTodo("")
    }

    function updateTask(event){
        setNewTodo(event.target.value);
    }

     {/*deleting todo */}
    function deleteTodo(id){
          setTodo((prevTodo)=>todo.filter((prevTodo)=>prevTodo.id!=id))
    }

    
    
     {/*mark as completed feature */}
    function marksAsDone(id){
        setTodo((prevTodo)=>
            prevTodo.map((todo)=>{
                if(todo.id==id){
          return{
            ...todo,
            isDone:true        
          }
        }else{
            return todo;
        }
    })
    )
    }
    return(
        <>
        <div className='container'>
        <h1>Enhanced Todo List </h1>
        <h2>Good {getGreetingTime()} User!, {getMotivationalMessage()}</h2>
        <div className='input'>
        <input  value={newTodo} className='input-box' placeholder='add your todos' onChange={updateTask}></input>
        <Button variant="contained" onClick={addNewTask} >Add</Button>
        </div>
         {/*listing out tasks */}
        <h2 >Tasks</h2>
        <div className='todos'>
            {
            todo.map((todo)=>(
               <li key={todo.id} className='todo-item' >
                <span style={todo.isDone?{textDecorationLine:"line-through"}:{}}>{todo.task}</span>
                <Button className='button' variant="text" onClick={()=>deleteTodo(todo.id)}>Delete</Button>
                <Button className='button' variant="text" onClick={()=>marksAsDone(todo.id)}>{todo.isDone?'completed':'complete'}</Button>
               </li>
            ))
             }
        </div>
        </div>
        </>
    )
}

