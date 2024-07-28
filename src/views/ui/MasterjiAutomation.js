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

const MasterjiAutomation = () => {
  const [reportData, setReportData] = useState([]);
  
  const [successCount,setsuccessCount] = useState(0);
  const [failureCount,setfailureCount] = useState(0);
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
      setsuccessCount(0);
      setfailureCount(0);

      for (let productId of productIdsArray) {
        const data = { productid: productId.trim(), dbclientid: "1" };

        try {
          const response = await axios.post("http://65.0.57.28:8481/content/MasterjiAutomation/GetAll", data, { headers });

          if (response.data.returnmsg.toLowerCase() === 'successful') {
            setsuccessCount(prevCount => prevCount + 1);
          } else {
            setfailureCount(prevCount => prevCount + 1);
          }
        } catch (error) {
          console.error(error);
          setfailureCount(prevCount => prevCount + 1);
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
  const handleSubmit_old = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // /content/masterjimeasurementreport/GetAll
  
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
  
    let headers = {
      'x-access-token': token // Include token in Authorization header
    };
    
    const productIdsArray = formData.productids.split(',');
  
    try {
      setLoading(true);
      const responses = await Promise.all(productIdsArray.map(productId => {
        const data = { productid: productId.trim(), dbclientid: "1" };
        return axios.post("http://65.0.57.28:8481/content/MasterjiAutomation/GetAll", data, { headers: headers })
          .then(response => ({ productId, response })); // Include productId with the response
      }));
      
      let successcount = 0;
      let failurecount = 0;
      const aggregatedData = responses.reduce((acc, { productId, response }) => {
        console.log('acc after=======>', acc);
        if (response.data.returnmsg.toLowerCase() === 'successful') {
          successcount += 1;
        
          return [...acc, { productId, message: response.data.returnmsg }];
        } else {
          failurecount +=1
         
          return [...acc, { productId, message: response.data.returnmsg }];
        }
      }, []);
      setsuccessCount(successcount);
      setfailureCount(failurecount);

      console.log('aggregatedData===========>', aggregatedData);
      setLoading(false);
  
    } catch (error) {
      console.error(error);
      alertify.error('An error occurred while fetching the report.');
      setLoading(false);
    }
  };
  

  return (
   <div>
    <Card>
      {loading && <Loader />}
      <CardBody>
        <CardTitle tag="h5">Masterji Automation</CardTitle>
        <Form ref={myFormRef} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm="12">
              <label htmlFor="productids">Product Ids</label>
              <Input type="text" placeholder="Product Ids" onChange={handleInputChange} value={formData.productids} name="productids" id="productids" />
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
     <Card>
      <CardBody>
     <table className="table">
   <tr>
   <th style={{color:'green'}}>Success Count</th>
     <th style={{color:'red'}}>Failure Count</th>
   </tr>
   <tbody>
     <td style={{color:'green'}}>{successCount}</td>
     <td style={{color:'red'}}>{failureCount}</td>
   </tbody>
   </table>
   </CardBody> 
   </Card>  
   
    </div>
   
  );
};

export default MasterjiAutomation;
