import React, { useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const SearchColorForm = ({handleSearchFormSubmit,onCancel}) => {
    const [formdata,setFormdata] = useState({
      colorname:'',
      hexcode:'',
      isactive:''  
    })
    const [formError,setformError] = useState('');
     

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
       

        if(formdata.colorname == '' && formdata.hexcode == '' && formdata.isactive == ''){
          setformError('At least one Filter is Required.');
          return false;
        }
        else{
          setformError('');
        }


     
        handleSearchFormSubmit(formdata);
        setFormdata({
          colorname:'',
          hexcode:'',
          isactive:'' 
        })

    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Search Color</CardTitle>
        
       
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Color Name</Form.Label>
          <Form.Control type="text" placeholder="Color Name" onChange={handleInputChange} value={formdata.colorname} name="colorname"   id="colorname"/>
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>Hexa Code</Form.Label>
          <Form.Control type="text" placeholder="Hexa Code" onChange={handleInputChange} value={formdata.hexcode} name="hexcode" id="hexcode" />
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>Status</Form.Label>
          <Input name="isactive" id="isactive" value={formdata.isactive} onChange={handleInputChange} type="select">
                  <option value=''>Select Status</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>      
               
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
    <span className='form-error'>{formError}</span>  
    </CardBody>
    </Card>
  );
};

export default SearchColorForm;
