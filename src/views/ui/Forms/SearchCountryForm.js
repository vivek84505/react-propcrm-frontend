import React, { useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle } from "reactstrap";


const SearchCountryForm = ({onSubmit,onCancel}) => {
    const [formdata ,setFormdata] = useState({
      countryname:'',
      countrycode:'',
      isocodes:''     
    })

    const [formError,setFormError] = useState('');

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
     
        if(formdata.countryname == '' && formdata.countrycode == '' && formdata.isocodes == ''){
          setFormError("At least one filter is required.");
          return false;
        }
        else{
          setFormError("");
        }

        onSubmit(formdata);
        setFormdata({
            countryname:'',
            countrycode:'',
            isocodes:''   
        })

    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Search Country</CardTitle>
        
       
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Country Name</Form.Label>
          <Form.Control type="text" placeholder="Country Name" onChange={handleInputChange} value={formdata.countryname} name="countryname"   id="countryname"/>
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>Country Code</Form.Label>
          <Form.Control type="text" placeholder="Country Code" onChange={handleInputChange} value={formdata.countrycode} name="countrycode" id="countrycode" />
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>ISO Code</Form.Label>
          <Form.Control type="text" placeholder="ISO Code" onChange={handleInputChange} value={formdata.isocodes} name="isocodes"  id="isocodes" />
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

export default SearchCountryForm;
