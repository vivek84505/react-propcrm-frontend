import ProjectTables from "../../components/dashboard/ProjectTable";
import { Form, Row, Col, Table, Card, CardTitle, CardBody, Alert, Button, Input } from "reactstrap";
import CategoryMasterTable from "../../components/dashboard/CategoryMasterTable";
import { useEffect, useRef, useState } from "react";
import Loader from "../common/Loader";
import axios from "axios";
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Import Alertify CSS
import 'alertifyjs/build/css/themes/default.css'; // Import Alertify theme CSS
import SearchMasterjiForm from "./Forms/SearchMasterjiForm";

const ProductList = () => {
  const [reportData, setReportData] = useState([]);
  
  const [productlist,setProductList] = useState([]); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const myFormRef = useRef();
  const [formData,setFormData] = useState({
    productids:''
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';

    let headers = {
      'x-access-token': token // Include token in Authorization header
    };

    const productIdsArray = formData.productids.split(',');

    try {
      setLoading(true);
      
      for (let productId of productIdsArray) {
        const data = { productid: productId.trim(), dbclientid: "1" };

        try {
          const response = await axios.post("http://65.0.57.28:8481/content/ContentPendingproductInfo/ContentPendingproductInfoGetAll", data, { headers });

          if (response.data.returnmsg.toLowerCase() === 'successful') {
              setProductList(...productlist,response.data.returnvalue);
          }  
        } catch (error) {
          console.error(error);
         }
      }
      alertify.success("Process Completed");
      setLoading(false);

    } catch (error) {
      console.error(error);
      alertify.error('An error occurred while fetching the report.');
      setLoading(false);
    }
  }
  

  return (
  
    <Card>
      {productlist}
      {loading && <Loader />}
      <CardBody>
        <CardTitle tag="h5">Product List</CardTitle>
        <Form ref={myFormRef} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm="12">
              <label htmlFor="productids">Product Ids</label>
              <Input type="text"   onChange={handleInputChange} value={formData.productids} name="productids" id="productids" />
            </Col>
             
          </Row>
           
          <Row>
            <Col className="text-end">
              <Button color="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>

        
    
      </CardBody>
    </Card>
 
   
  );
};

export default ProductList;
