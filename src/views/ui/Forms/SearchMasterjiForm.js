import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Form,  Button } from 'react-bootstrap';
import { Card, CardBody, CardTitle,Input } from "reactstrap";

import Loader from '../../common/Loader';
const SearchMasterjiForm = ({onSubmit,onCancel}) => {
    
   const [brandList,setBrandList] = useState([]); 
   const [loading,setLoading] = useState(false);
   const [formError,setformError] = useState('');
   const myFormRef = useRef();

   const [formData,setFormData] = useState({
        fromdate:'',
        todate:'',
        productids:'',
        measurementstatus:'',
        product_source:'',
        brandid:''
   })

    const handleSubmit = (e)=>{
      e.preventDefault();  
      onSubmit(formData);

      if(formData.fromdate == '' && formData.todate == '' && formData.productids == '' && formData.measurementstatus == '' && formData.product_source == '' && formData.brandid == ''  )
      {
       
        setformError('At least one filter is required');
        return false;
      }
      else{
        setformError('');
      }

      setFormData({
        fromdate:'',
        todate:'',
        productids:'',
        measurementstatus:'',
        product_source:'',
        brandid:''
     })

     myFormRef.current.reset();

    }

    const handleInputChange = (e)=>{
      const {name,value} = e.target;
      setFormData({...formData,[name]:value})
    }

    const fetchBrandList = ()=>{
      setLoading(true);
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      let payload = {
        dbclientid : '1',
        isactive : '1',
        paginationallow : 'yes',
        limit : '100'
      }
      
      
      axios.post("http://65.0.57.28:8481/content/BrandMaster/GetAll",payload,{headers:headers}).then((response)=>{

      console.log('response.data.returnmsg===>',response.data.returnmsg);
      console.log('response.data.returnvalue===>',response.data.returnvalue);
        if(response.data.returnmsg.toLowerCase() == 'successful'){
           setBrandList(response.data.returnvalue);

        }
        console.log('BrandList======>',brandList);
      }).catch((error)=>{

      });

      setLoading(false);
    }
    useEffect(()=>{

      fetchBrandList();

    },[])
    
  return (
   
    <Card>
      {
      loading ? (<Loader/>):''
     }
        <CardBody>
        <CardTitle tag="h5">Masterji Report</CardTitle>
        
   
    <Form ref={ myFormRef} onSubmit={handleSubmit}>
    <Row className="mb-3">
    <Form.Group as={Col} sm="4">
          <Form.Label>Product Ids</Form.Label>
          <Form.Control type="text"  placeholder="Product Ids" onChange={handleInputChange} value={formData.productids} name="productids" id="productids"/>
         
        </Form.Group>

      <Form.Group as={Col} sm="4">
          <Form.Label>Source</Form.Label>
          <Input name="product_source" id="product_source" onChange={handleInputChange} value={formData.product_source} type="select">
                            <option value=""> Select Source </option>
                            <option value="all"> ALL </option>
                            <option value="automation"> Automation </option>
                            <option value="manual"> Manual  </option>
                            <option value="grn"> GRN  </option>
                            <option value="singleentry"> Single Entry Page </option>
                            <option value="groupentry"> Group Entry Page </option>
                </Input>      
               
      </Form.Group>

      <Form.Group as={Col} sm="4">
          <Form.Label>Brand</Form.Label>
          <Input name="brandid" id="brandid" type="select" onChange={handleInputChange} value={formData.brandid} >
        <option value=''>Select Brand</option>
        
        
        {brandList && brandList.length > 0 && (
          brandList.map((brand, index) => (
            <option key={index} value={brand.brandid}>
              {brand.brandname}
            </option>
          ))
        )}
      </Input> 
           
        </Form.Group>

      </Row>

      <Row className="mb-3">

      <Form.Group as={Col} sm="4">
          <Form.Label>From Date</Form.Label>
          <Form.Control type="date" placeholder="From Date" onChange={handleInputChange} value={formData.fromdate} name="fromdate" id="fromdate"/>
           
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>To Date</Form.Label>
          <Form.Control type="date" placeholder="To Date" onChange={handleInputChange} value={formData.todate} name="todate" id="todate"/>
         
        </Form.Group>

        <Form.Group as={Col} sm="4">
          <Form.Label>Measurement Status</Form.Label>
          <Input name="measurementstatus" id="measurementstatus" onChange={handleInputChange} value={formData.measurementstatus} type="select">
                  <option value=''>Select Status</option>
                  <option value='measurementpending'>Measurement Pending</option>
                  <option value='measurementdone'>Measurement Done</option>
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
      <span className='form-error'>{formError}</span>

    </Form>
    </CardBody>
    </Card>
  );
};

export default SearchMasterjiForm;
