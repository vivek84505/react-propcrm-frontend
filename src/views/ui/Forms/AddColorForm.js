import React, { useRef, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const AddColorForm = ({onSubmit,onCancel}) => {
    
    const [colorname_error,setcolornameError] = useState('');
    const [isactive_error,setisactiveError] = useState('');
    const [hexcode_error,sethexcodeError] = useState('');

   const myFormRef = useRef();

    const [formdata,setformdata] = useState({
      colorname:'',
      isactive:'',
      hexcode:''
    })

    const handleSubmit = (e)=>{
      e.preventDefault();

      let iserror = false;

      if(formdata.colorname === ''){
        setcolornameError('colorname is required');
        iserror = true;
      }
      else{
        setcolornameError('');
        iserror = false;
      }

      if(formdata.hexcode === ''){
        sethexcodeError('Hexa code is required');
        iserror = true;
      }
      else{
        sethexcodeError('');
        iserror = false;
      }

      if(formdata.isactive === ''){
        setisactiveError('status is required');
        iserror = true;
      }
      else{
        setisactiveError('');
        iserror = false;
      }

      if(iserror){
        return false;
      }


      onSubmit(formdata);

      setformdata({
        colorname : '',
        isactive:'',
        hexcode:''  
     })

     myFormRef.current.reset();

    }

    const handleInputChange = (e)=>{
      const {name,value} = e.target;
      setformdata({...formdata,[name]:value})
    }

    
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Add Color</CardTitle>
        
       
    <Form ref={ myFormRef} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Color Name</Form.Label>
          <Form.Control type="text" placeholder="Color Name" onChange={handleInputChange} value={formdata.colorname} name="colorname"   id="colorname"/>
          <span className='form-error'>{colorname_error}</span>
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>Hex Code</Form.Label>
          <Form.Control type="text" placeholder="Hex Code" onChange={handleInputChange} value={formdata.hexcode} name="hexcode" id="hexcode" />
          <span className='form-error'>{hexcode_error}</span>
        </Form.Group>

        <Form.Group as={Col} sm="3">
          <Form.Label>Status</Form.Label>
          <Input name="isactive" id="isactive" onChange={handleInputChange} value={formdata.isactive} type="select">
                  <option value=''>Select Status</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>      
                <span className='form-error'>{isactive_error}</span>

        </Form.Group>
      </Row>

      <Row>
        <Col className="text-end">
          <Button variant="primary" type="submit">
            Submit
          </Button>
         
        </Col>

        
      </Row>
    </Form>
    </CardBody>
    </Card>
  );
};

export default AddColorForm;
