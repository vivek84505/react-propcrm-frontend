import TodoListMasterTable from "../../components/dashboard/TodoListMasterTable";
import { Row, Col } from "reactstrap";
import { useEffect, useState } from "react";



import {
  Alert  
} from "reactstrap";

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import axios from "axios";
import AddCountryForm from "./Forms/AddCountryForm";
import SearchCountryForm from "./Forms/SearchCountryForm";
import Loader from "../common/Loader";
import EditCountryForm from "./Forms/EditCountryForm";
import TodoForm from "./Forms/TodoForm";
const TodoList = () => {
  
  const [todoData, setTodoData] = useState([
    {
      todoid: "1",
      todoname: "workout",
      status: "1"
    },
    {
      todoid: "2",
      todoname: "meditation",
      status: "1"
    },

  ]); 
  const [showform,setShowForm] = useState(false);
   
  const handleChangeStatus = (todoid,newstatus)=>{ 

      const updatedTodoList = todoData.map((todo)=>todo.todoid === todoid ? {...todo,status:newstatus}:todo);
      setTodoData(updatedTodoList);


  }

  const handleSubmit = (formData)=>{
    
    
    const newTodo = {
      todoid: Math.floor(Math.random() * 1000000),
      todoname: formData.todoname,
      status: "0"
    }

    setTodoData([...todoData,newTodo]);
    
    console.log("todoData after =======>",todoData);


  }

  const formDisplay = () =>{
    setShowForm(!showform);
  }


  return (
    <Row>
       
      <Col lg="12"> 
     
    

      <div className="d-flex justify-content-end mb-3">
          <button onClick={formDisplay}className="btn btn btn-primary btn-lg me-2" >Add Todo</button>
        </div>
        
        {
        showform && (  <TodoForm handleSubmit={handleSubmit}></TodoForm>)
      }
      <TodoListMasterTable  handleChangeStatus={handleChangeStatus}  todolist={todoData} />
      </Col>
       
    </Row>
  );
};

export default TodoList;
