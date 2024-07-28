import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody,Alert, Button } from "reactstrap";
import CategoryMasterTable from "../../components/dashboard/CategoryMasterTable";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import axios from "axios";

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Import Alertify CSS
import 'alertifyjs/build/css/themes/default.css'; // Import Alertify theme CSS
import ColorMasterTable from "../../components/dashboard/ColorMasterTable";
import AddColorForm from "./Forms/AddColorForm";
import EditColorForm from "./Forms/EditColorForm";
import SearchColorForm from "./Forms/SearchColorForm";



const ColorMaster = () => {
     const [colorList,setcolorList] = useState([]);
     const [loading,setLoading] = useState(false); 
     const [showform,setShowForm] = useState(false);
     const [showsearchform,setsearchShowForm] = useState(false);
     const [showEditForm,setshowEditform] = useState(false);
     const [successMessage,setsuccessMessage] = useState('');
     const [errorMessage,setErrorMessage] = useState('')
     const [editColorData,setEditColorData] = useState({
        colorid:'',
        colorname:'',
        hexcode:'',
        isactive:''
     })
    
     const handleFormDisplay = (action) =>{
      
      setshowEditform(false);

      if(action === 'add'){
        setsearchShowForm(false);
        setShowForm(!showform);
      }
      else if (action === 'search'){
        setShowForm(false);
        setsearchShowForm(!showsearchform);

      }


     }

     const onEditCancel = () => {
      setshowEditform(false);
     }
     const openEditForm = (colorid) => {
      setShowForm(false);
      setsearchShowForm(false);
      
       
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
      let headers = {
      'x-access-token': token
      };

      let payload = {
        dbclientid:"1",
        colorid:colorid
      }

      axios.post("http://65.0.57.28:8481/content/ColorMaster/GetAll",payload,{headers:headers}).then((response) =>{

          if(response.data.returnmsg.toLowerCase() == 'successful'){
            let editColorPayload = {
              colorid:response.data.returnvalue[0].colorid || '',
              colorname:response.data.returnvalue[0].colorname || '',
              hexcode:response.data.returnvalue[0].hexcode || '',
              isactive:response.data.returnvalue[0].isactive || '0'              
            }
            
            
            setEditColorData(editColorPayload);
          }

      }).catch((error) => {

      })

       setshowEditform(true);

     }  

     const handleStatusChange = (colorid,status)=>{
       

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      let payload = {
        colorid:colorid,
        isactive:status,
        lastmodifiedby : 'content.admin@firstcry.com',
        dbclientid : '1'
      }

       

      axios.post("http://65.0.57.28:8481/content/ColorMaster/MarkActiveInactive",payload,{headers:headers}).then((response)=>{
        
         if(response.data.returnmsg.toLowerCase() == 'successful'){
            
            const updatedColorList = colorList.map((color)=>
            color.colorid === colorid ? {...color,isactive:status} : color);            
            setcolorList(updatedColorList);
         }
        

      }).catch((error)=>{
        console.log('error========>',error);

      })

     }

     const handleAddFormSubmit = (formData) =>{
      
      setLoading(true);
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      formData.lastmodifiedby = 'content.admin@firstcry.com';
      formData.dbclientid = '1';
     

      axios.post("http://65.0.57.28:8481/content/ColorMaster/Add",formData,{headers:headers}).then((response)=>{

      console.log('response.data.returnmsg.toLowerCase========>',response.data.returnmsg.toLowerCase);

        if(response.data.returnmsg.toLowerCase() === 'successful'){

          setTimeout(()=>{
            setsuccessMessage('Color Added Succesfully');
            setErrorMessage('');
            fetchData();
  
            setTimeout(()=>{
              setsuccessMessage('')
            },5000)
  
  
          },1000)
          
          setLoading(false);
        }
        else{
          setTimeout(()=>{
            setErrorMessage(response.data.returnmsg);
            setsuccessMessage('');
            
            setTimeout(()=>{
              setErrorMessage('');
            },5000)
          },1000)

          setLoading(false);
        }

      }).catch((error)=>{

      })

     }

     const onEditSubmit = (formData) =>{
      
      console.log('onEditSubmit formData=======>',formData);

      setLoading(true);
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      formData.lastmodifiedby = 'content.admin@firstcry.com';
      formData.dbclientid = '1';
      
      // /content/ColorMaster/Update

      axios.post("http://65.0.57.28:8481/content/ColorMaster/Update",formData,{headers:headers}).then((response)=>{
        
        if(response.data.returnmsg.toLowerCase() == 'successful'){
           
          setcolorList(...colorList,formData);

          setTimeout(()=>{
            setsuccessMessage('Color Updated Succesfully');
            setErrorMessage('');
            fetchData();
    
            setTimeout(()=>{
              setsuccessMessage('')
            },5000)
    
    
          },1000)
        }
        else{
          setTimeout(()=>{
            setErrorMessage(response.data.returnmsg);
            setsuccessMessage('');
            
            setTimeout(()=>{
              setErrorMessage('');
            },5000)
          },1000)
        }
        setLoading(false);
      }).catch((error)=>{
        
      })

    }

     useEffect(()=>{
      fetchData();
     },[]);

     const fetchData = () => {
      setLoading(true);

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
      let headers = {
        'x-access-token': token
      };

      axios.post("http://65.0.57.28:8481/content/ColorMaster/GetAll",{dbclientid:"1"},{headers:headers}).then((response)=>{
        
      

      if(response.data.returnmsg.toLowerCase() == "successful"){
          setcolorList(response.data.returnvalue);
        }
        setLoading(false);
        

      }).catch((error) => {

      });

     }
     
     const handleSearchFormSubmit = (formData) =>{
      setLoading(true);
      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }
      
      formData.dbclientid = "1";

      axios.post("http://65.0.57.28:8481/content/ColorMaster/GetAll",formData,{headers:headers}).then((response)=>{
        
        if(response.data.returnmsg.toLowerCase() == 'successful'){
          
          console.log('response.data.returnvalue[0]',response.data.returnvalue[0]);

           setcolorList(response.data.returnvalue);


          setTimeout(()=>{
            setsuccessMessage('Color Data Found');
            setErrorMessage('');
            // fetchData();
  
            setTimeout(()=>{
              setsuccessMessage('')
            },5000)
  
  
          },1000)
        } 
        else{
          setcolorList([]);
          setTimeout(()=>{
            setErrorMessage(response.data.returnmsg);
            setsuccessMessage('');
            
            setTimeout(()=>{
              setErrorMessage('');
            },5000)
          },1000)
        }
        setLoading(false);
      }).catch((error) => {

      })


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

      {
    
      <div className="d-flex justify-content-end mb-3">
      <button onClick={()=>handleFormDisplay('add')} className="btn btn btn-primary btn-lg me-2">Add Color</button>
      <button onClick={()=>handleFormDisplay('search')} className="btn btn btn-primary btn-lg me-2">Search Color</button>

      </div>

      
      }
       {
        showform ? (<AddColorForm onSubmit={handleAddFormSubmit}></AddColorForm>):''
       }

       {
        showEditForm ? (<EditColorForm onEditSubmit={onEditSubmit} onEditCancel={onEditCancel} editColorData={editColorData}></EditColorForm>) : ''
       }
        {
          showsearchform ? (<SearchColorForm handleSearchFormSubmit={handleSearchFormSubmit}></SearchColorForm>) : ''
        }
      <ColorMasterTable  openEditForm={openEditForm} handleStatusChange={handleStatusChange} colorList={colorList}></ColorMasterTable>
       
    </Row>
  );
};

export default ColorMaster;
