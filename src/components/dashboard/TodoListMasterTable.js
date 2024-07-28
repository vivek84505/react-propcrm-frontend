import { useState } from 'react';
import { Card, CardBody, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
 
const TodoListMasterTable = (props) => {

  const todolist = props.todolist || [];
  const handleChangeStatus = props.handleChangeStatus;
  const openEditForm = props.openEditForm;
    
  //  const completedTodoList = todolist.map((todo)=> {
  //   if(todo.status == "1"){
  //     return todo;
  //   }
  //  });

   const completedTodoList = todolist.filter(todo => todo.status == "1");
   const pendingTodoList = todolist.filter(todo => todo.status == "0");

    
  const changeStatus = (todoid,newstatus)=>{
    handleChangeStatus(todoid,newstatus)
  } 
  
  return (
    <div>
      <Card>
        <CardBody>
          

          <CardTitle tag="h5">Pending Todo List</CardTitle>
          

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Todo ID</th>
                <th>Todo Name</th>
                <th>status</th>
                
              </tr>
            </thead>
            <tbody>
              {pendingTodoList.map((todo, index) => (
                <tr key={index} className="border-top">
                    
                  <td> <span className="text-muted">{todo.todoid}</span></td>
                  <td> <span className="text-muted">{todo.todoname}</span></td>
                  
                  {
                    todo.status == 1 ? (
                      <td>   <button onClick={()=>changeStatus(todo.todoid,0)} className="btn btn btn-success">Completed  </button></td>
                    ):(
                      <td><button  onClick={()=>changeStatus(todo.todoid,1)} className="btn btn btn-danger">Mark Completed  </button></td>
                    )
                  }
                 
                  
                  
                </tr>
              ))}
            </tbody>
          </Table>


          <CardTitle tag="h5"> Completed Todo List</CardTitle>
          

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Todo ID</th>
                <th>Todo Name</th>
                <th>status</th>
                
              </tr>
            </thead>
            <tbody>
              
              {completedTodoList.map((todo, index) => (
                <tr key={todo.todoid} className="border-top">
                    
                  <td> <span className="text-muted">{todo.todoid}</span></td>
                  <td> <span className="text-muted">{todo.todoname}</span></td>
                  
                  {
                    todo.status == 1 ? (
                      <td>   <button onClick={()=>changeStatus(todo.todoid,0)} className="btn btn btn-success">Completed  </button></td>
                    ):(
                      <td><button  onClick={()=>changeStatus(todo.todoid,1)} className="btn btn btn-danger">Mark Completed  </button></td>
                    )
                  }
                 
                  
                  
                </tr>
              ))}
            </tbody>
          </Table>

        </CardBody>
      </Card>
    </div>
  );
};

export default TodoListMasterTable;
