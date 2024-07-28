import React, { useRef, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const SearchCategoryForm = (props) => {
    
  
  const {handleSearchSubmit,handleFormDisplay} = props;

  const [formdata,setFormdata] = useState({
      categoryname : '',
      isactive:'',
      sitetype:'',
    })
  const [formerror, setFormError] = useState('')  
  const myFormRef  = useRef(); 
    
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const clearSearchForm = () => {
      handleFormDisplay('all')
      myFormRef.current.reset();
      setFormdata({
        categoryname : '',
        isactive:'',
        sitetype:'',
      })
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if(formdata.categoryname == '' && formdata.isactive == '' && formdata.sitetype == '' ){
          setFormError('At least One search Filter is required.')
          return false;
        }

        handleSearchSubmit(formdata);
        setFormdata({
          categoryname : '',
          isactive:'',
          sitetype:'',
        })

    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Search Category</CardTitle>
        
       
    <Form ref={myFormRef} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Category Name</Form.Label>
          <Form.Control type="text" placeholder="Category Name" onChange={handleInputChange} value={formdata.categoryname} name="categoryname"   id="categoryname"/>
        </Form.Group>

        <Form.Group as={Col} sm="3">
          <Form.Label>Site Type</Form.Label>
          <Input name="sitetype" id="sitetype" onChange={handleInputChange} value={formdata.sitetype} type="select">
                  <option value=''>Select Site Type</option>
                  <option value='0'>Firstcry</option>
                  <option value='3'>Goodlife</option>
                  <option value='4'>IntelliSkills/intelli Business</option>
                  <option value='9'>FC site</option>
                  
                </Input>  
                
        </Form.Group>

        <Form.Group as={Col} sm="3">
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
          
          <Button onClick={()=>clearSearchForm()}style={{ marginRight: '5px' }} variant="danger" >
            Cancel
          </Button>

          
          <Button variant="primary" type="submit">
            Search
          </Button>
         
        </Col>

        
      </Row>
    </Form>
    <span className='form-error'>{formerror}</span>  
    </CardBody>
    </Card>
  );
};

export default SearchCategoryForm;
