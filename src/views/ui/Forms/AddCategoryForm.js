import React, { useRef, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const AddCategoryForm = (props) => {
    
   const {handleAddFormSubmit,handleFormDisplay } = props; 

   const [formData,setFormdata] = useState({
      categoryname : '',
      isactive:'',
      sitetype:'',
      showinb2b:''
   })
   const [categoryname_error,setcategorynameError] = useState('');
   const [isactive_error,setisactiveError] = useState('');
   const [sitetype_error,setsitetypeError] = useState('');
   const [showinb2b_error,setshowinb2bError] = useState('');

   const myFormRef = useRef();
   const handleInputChange = (e) => {
      const {name,value} = e.target;
      setFormdata({...formData,[name]:value})
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      let iserror = false;
      
      if(formData.categoryname == '') {
        setcategorynameError('required');
        iserror = true;
      }
      else{
        setcategorynameError('');
      }

      if(formData.isactive == '') {
        setisactiveError('required');
        iserror = true
      }
      else{
        setisactiveError('');
      }

      if(formData.sitetype == '') {
        setsitetypeError('required');
        iserror = true
      }
      else{
        setsitetypeError('');
      }

      if(formData.showinb2b == '') {
        setshowinb2bError('required');
        iserror = true
      }
      else{
        setshowinb2bError('');
      }

      if(iserror){
        return false;    
      }
      
      handleAddFormSubmit(formData)
      setFormdata({
        categoryname : '',
        isactive:'',
        sitetype:'',
        showinb2b:''   
     })
      myFormRef.current.reset();
   }

   const clearSearchForm = () => {
    handleFormDisplay('all')  
    myFormRef.current.reset();
    setFormdata({
      categoryname : '',
      isactive:'',
      sitetype:'',
      showinb2b:'' 
    })
  }
    

   
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Add Category</CardTitle>
        
       
    <Form ref={myFormRef} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm="3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control type="text" placeholder="Category Name" onChange={handleInputChange} value={formData.categoryname} name="categoryname"   id="categoryname"/>
            <span className='form-error'>{categoryname_error}</span>
        </Form.Group>
         

        <Form.Group as={Col} sm="3">
          <Form.Label>Site Type</Form.Label>
          <Input name="sitetype" id="sitetype" onChange={handleInputChange} type="select">
                  <option value=''>Select Site Type</option>
                  <option value='0'>Firstcry</option>
                  <option value='3'>Goodlife</option>
                  <option value='4'>IntelliSkills/intelli Business</option>
                  <option value='9'>FC site</option>
                  
                </Input>  
                <span className='form-error'>{sitetype_error}</span>      
        </Form.Group>


        <Form.Group as={Col} sm="3">
          <Form.Label>Status</Form.Label>
          <Input name="isactive" id="isactive" onChange={handleInputChange} type="select">
                  <option value=''>Select Status</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>      
                <span className='form-error'>{isactive_error}</span>  
        </Form.Group>

        <Form.Group as={Col} sm="3">
          <Form.Label>Showinb2b</Form.Label>
          <Input name="showinb2b" id="showinb2b" onChange={handleInputChange} type="select">
                  <option value="">Select</option>
                  <option value="1">yes</option>
                  <option value="0">No</option>
                </Input>     
                <span className='form-error'>{showinb2b_error}</span>   
        </Form.Group>


      </Row>

      <Row>
        <Col className="text-end">

        <Button style={{ marginRight: '5px' }} onClick={()=>clearSearchForm()} variant="danger"  >
          Cancel
          </Button>

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

export default AddCategoryForm;
