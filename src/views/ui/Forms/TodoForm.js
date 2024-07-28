import React, { useRef, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const TodoForm = ({handleSubmit}) => {
    
   
   const myFormRef = useRef();

   const [todo_error,setTodoError] = useState('');

    const [formdata,setformdata] = useState({
      todoname:''      
            
    })

    const onSubmit = (e) =>{
     e.preventDefault();
     
     if(formdata.todoname == ''){
        setTodoError('Enter Todo Name');
        return false;
     }
     else{
      setTodoError('');

     }


      handleSubmit(formdata);
      setformdata({
        todoname:''     
      })
      myFormRef.current.reset();
    }
     

    const handleInputChange = (e)=>{
      const {name,value} = e.target;
      if(value != ''){
        setTodoError('');
      }
      setformdata({...formdata,[name]:value})
    }

    
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Add Todo</CardTitle>
        
       
    <Form ref={ myFormRef} onSubmit={onSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          
          <Form.Control type="text" placeholder="Todo name" onChange={handleInputChange} value={formdata.todoname} name="todoname"   id="todoname"/>
          <span className='form-error'>{todo_error}</span>
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label> </Form.Label>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
 
      </Row>

      
    </Form>
    </CardBody>
    </Card>
  );
};

export default TodoForm;
