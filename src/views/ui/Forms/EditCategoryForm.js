import React, { useEffect, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";


const EditCategoryForm = (props) => {

  const {onEditSubmit,onEditCancel,categoryData} = props;
 
  console.log('categoryData received======>',categoryData);

 


  const [formData, setFormdata] = useState({
    categoryname : '',
    isactive:'',
    sitetype:'',
    showinb2b:''  
  });
  
  const [categoryname_error,setcategoryname_error] = useState('')
  const [isactive_error,setisactive_error] = useState('')
  const [sitetype_error,setsitetype_error] = useState('')
  const [showinb2b_error,setshowinb2b_error] = useState('')

    useEffect(()=>{
      if(categoryData){
        setFormdata({
          productcatid:categoryData.productcatid,
          categoryname:categoryData.categoryname,
          isactive:categoryData.isactive,
          sitetype:categoryData.sitetype,
          showinb2b:categoryData.showinb2b
        })
      }

        console.log('formData received======>',formData);


    },[categoryData])

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

        // const [categoryname_error,setcategoryname_error] = useState('')
        // const [isactive_error,setisactive_error] = useState('')
        // const [sitetype_error,setsitetype_error] = useState('')
        // const [showinb2b_error,setshowinb2b_error] = useState('')
        if(formData.categoryname == ''){
          setcategoryname_error('required')
          iserror  = true;
        }
        else{
          setcategoryname_error('')
        }

        if(formData.isactive == ''){
          setisactive_error('required');
          iserror  = true;
        }
        else{
          setisactive_error('')
        }

        if(formData.showinb2b == ''){
          setshowinb2b_error('required');
          iserror  = true;
        }
        else{
          setshowinb2b_error('')
        }

        if(formData.sitetype == ''){
          setsitetype_error('required')
          iserror  = true;
        }
        else{
          setsitetype_error('')
        }


        if(iserror){
          return false;
        }

        onEditSubmit(formData);
        setFormdata({
          productcatid : '',
          categoryname : '',
          isactive:'',
          sitetype:'',
          showinb2b:''   
        })

    }

    const editCancel = () => {
      onEditCancel();
    }
  return (
    <Card>
        <CardBody>
        <CardTitle tag="h5">Edit Category</CardTitle>
        
       
    <Form onSubmit={handleEditSubmit}>
      <input type="hidden" name="productcatid" id="productcatid" value={formData.productcatid}></input>
      <Row className="mb-3">
        <Form.Group as={Col} sm="4">
          <Form.Label>Country Name</Form.Label>
          
          <Form.Control type="text" placeholder="Category Name" onChange={handleInputChange} value={formData.categoryname} name="categoryname"   id="categoryname"/>
            <span className='form-error'>{categoryname_error}</span>
          </Form.Group>

          <Form.Group as={Col} sm="3">
          <Form.Label>Site Type</Form.Label>
          <Input name="sitetype" id="sitetype"  value={formData.sitetype} onChange={handleInputChange} type="select">
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
          <Input name="isactive" id="isactive"  value={formData.isactive} onChange={handleInputChange} type="select">
                  <option value=''>Select Status</option>
                  <option value='1'>Active</option>
                  <option value='0'>Inactive</option>
                </Input>      
                <span className='form-error'>{isactive_error}</span>  
        </Form.Group>

        <Form.Group as={Col} sm="3">
          <Form.Label>Showinb2b</Form.Label>
          <Input name="showinb2b" id="showinb2b"  value={formData.showinb2b} onChange={handleInputChange} type="select">
                  <option value="">Select</option>
                  <option value="1">yes</option>
                  <option value="0">No</option>
                </Input>     
                <span className='form-error'>{showinb2b_error}</span>   
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

export default EditCategoryForm;
