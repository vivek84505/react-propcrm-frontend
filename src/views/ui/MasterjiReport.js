import ProjectTables from "../../components/dashboard/ProjectTable";
 import { Form,Row, Col, Table, Card, CardTitle, CardBody,Alert, Button,Input } from "reactstrap";
import CategoryMasterTable from "../../components/dashboard/CategoryMasterTable";
import { useEffect, useRef, useState } from "react";
import Loader from "../common/Loader";
import axios from "axios";

 
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Import Alertify CSS
import 'alertifyjs/build/css/themes/default.css'; // Import Alertify theme CSS
 
import MasterjiReportTable from "../../components/dashboard/MasterjiReportTable";
import SearchMasterjiForm from "./Forms/SearchMasterjiForm";



const MasterjiReport = () => {
      
     const [reportData, setReportData] = useState([]) 
     const [formData,setFormData] = useState({
      sourcecountry:'',
      dest_country:'',
      fromdate:'',
      todate:'',
      productid:'',
      batchid:''
     })

     const [successMessage,setsuccessMessage] = useState('');
     const [errorMessage,setErrorMessage] = useState('')
     const [loading,setLoading] = useState(false);


     let myFormRef = useRef();


     const handleSubmit = (formData) =>{
      // /content/masterjimeasurementreport/GetAll


      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      formData.dbclientid = "1";

      axios.post("http://localhost:8481/content/masterjimeasurementreport/GetAll",formData,{headers:headers}).then((response)=>{

        if(response.data.returnmsg.toLowerCase() == 'successful'){
          console.log('response.data.returnvalue',response.data.returnvalue);
          setReportData(response.data.returnvalue);
        }
        else{
          setReportData([]);
        }

      }).catch((error) => {

      })

      console.log('formData=========>',formData);

     }
 
      

      

      

     

      

     
     
     

    return (
   
    
      <Row>
         {
            loading ? (<Loader/>):''
          }
        
          {
            successMessage && (
              <Alert color="success" className="mb-3">{successMessage}</Alert>
            )
          }
  
          {
            errorMessage && (
              <Alert color="danger" className="mb-3">{errorMessage}</Alert>
  
            )
          }
        <SearchMasterjiForm onSubmit={handleSubmit}></SearchMasterjiForm>
        {(reportData.length > 0) ? 
        <MasterjiReportTable reportData={reportData}></MasterjiReportTable>:''
        }
      </Row>
    );
};

export default MasterjiReport;
