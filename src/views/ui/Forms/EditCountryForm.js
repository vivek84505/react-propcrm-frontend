import React, { useEffect, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle } from "reactstrap";


const EditCountryForm = ({onEditSubmit,onEditCancel,countryData}) => {
   
  // console.log('countryData in Edit Form======>',countryData);

 

  console.log('countryData.countryname======>',countryData.countryname);
  console.log('countryData.countrycode======>',countryData.countrycode);
  console.log('countryData.isocodes======>',countryData.isocodes);
  console.log('countryData.countrymasterid======>',countryData.countrymasterid);

  const [formdata, setFormdata] = useState({
    countryname: '',
    countrycode:  '',
    isocodes:  '',
    countrymasterid: ''
  });
  
  console.log('formdata in Edit Form======>', formdata);
  console.log('formdata.countryname======>', formdata.countryname);
  console.log('formdata.countrycode======>', formdata.countrycode);
  console.log('formdata.isocodes======>', formdata.isocodes);

    useEffect(()=>{
      if(countryData){
        setFormdata({
          countryname:countryData.countryname,
          countrycode:countryData.countrycode,
          isocodes:countryData.isocodes,
          countrymasterid:countryData.countrymasterid
        })
      }
    },[countryData])

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        onEditSubmit(formdata);
        setFormdata({
            countryname:'',
            countrycode:'',
            isocodes:''   
        })

    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Edit Country</CardTitle>
        
       
    <Form onSubmit={handleEditSubmit}>
      <input type="hidden" name="countrymasterid" id="countrymasterid" value={formdata.countrymasterid}></input>
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
            Update
          </Button>
         
        </Col>

        
      </Row>
    </Form>
    </CardBody>
    </Card>
  );
};

export default EditCountryForm;
