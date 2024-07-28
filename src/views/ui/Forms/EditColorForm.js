import React, { useEffect, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const EditColorForm = (props) => {

  const {onEditSubmit,onEditCancel,editColorData} = props;
 
 
 


  const [formData, setFormdata] = useState({
    colorid:'',
    colorname:'',
    hexcode:'',
    isactive:'' 
  });
  
  const [colorname_error,setccolorname_error] = useState('')
  const [isactive_error,setisactive_error] = useState('')
  const [hexa_error,sethexa_error] = useState('')
 
    useEffect(()=>{
      if(editColorData){
        setFormdata({
          colorid:editColorData.colorid,
          colorname:editColorData.colorname,
          isactive:editColorData.isactive,
          hexcode:editColorData.hexcode          
        })
      }

        console.log('formData received======>',formData);


    },[editColorData])

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formData,
            [name]:value
        })
    }
    
    const handleEditSubmit = (e) => {
        e.preventDefault();
        let iserror = false; 
        
        if(formData.colorname == ''){
          setccolorname_error('required')
          iserror  = true;
        }
        else{
          setccolorname_error('')
        }

        if(formData.isactive == ''){
          setisactive_error('required');
          iserror  = true;
        }
        else{
          setisactive_error('')
        }

        if(formData.hexcode == ''){
          sethexa_error('required');
          iserror  = true;
        }
        else{
          sethexa_error('')
        }

       


        if(iserror){
          return false;
        }

        onEditSubmit(formData);
        setFormdata({
          colorid:'',
          colorname:'',
          isactive:'',
          hexcode:''      
        })

    }

    const editCancel = () => {
      onEditCancel();
    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Edit Color</CardTitle>
        
       
    <Form onSubmit={handleEditSubmit}>
      <input type="hidden" name="colorid" id="colorid" value={formData.colorid}></input>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Color Name</Form.Label>
          
          <Form.Control type="text" placeholder="Color Name" onChange={handleInputChange} value={formData.colorname} name="colorname"   id="colorname"/>
            <span className='form-error'>{colorname_error}</span>
          </Form.Group>

          <Form.Group as={Col} sm="4">
          <Form.Label>Hexa Code</Form.Label>          
          <Form.Control type="text" placeholder="Hexa Code" onChange={handleInputChange} value={formData.hexcode} name="hexcode"   id="hexcode"/>
            <span className='form-error'>{hexa_error}</span>
          </Form.Group>


           

        <Form.Group as={Col} sm="3">
          <Form.Label>Status</Form.Label>
          <Input name="isactive" id="isactive"  value={formData.isactive} onChange={handleInputChange} type="select">
                  <option value=''>Select Status</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>      
                <span className='form-error'>{isactive_error}</span>  
        </Form.Group>

        

      </Row>

      <Row>
        <Col className="text-end">

        <Button variant="primary" style={{ marginRight: '5px' }} type="submit">
            Update
          </Button>

        <Button onClick={()=>editCancel()} variant="danger" >
            Cancel
          </Button>

        
         
        </Col>

        
      </Row>
    </Form>
    </CardBody>
    </Card>
  );
};

export default EditColorForm;
