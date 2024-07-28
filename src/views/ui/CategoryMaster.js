import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Table, Card, CardTitle, CardBody,Alert } from "reactstrap";
import CategoryMasterTable from "../../components/dashboard/CategoryMasterTable";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import axios from "axios";

import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css'; // Import Alertify CSS
import 'alertifyjs/build/css/themes/default.css'; // Import Alertify theme CSS
import AddCategoryForm from "./Forms/AddCategoryForm";
import SearchCategoryForm from "./Forms/SearchCategoryForm";
import EditCategoryForm from "./Forms/EditCategoryForm";

const CategoryMaster = () => {
    const [categorylist,SetCategoryList] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showform,setShowForm] = useState(false);
    const [showsearchform,setsearchShowForm] = useState(false);
    const [successMessage,setsuccessMessage] = useState('');
    const [errorMessage,setErrorMessage] = useState('')
    const [showEditForm,setshowEditForm] = useState(false);
    const [editCategoryData,seteditCategoryData] = useState({
      categoryname : '',
      isactive:'',
      sitetype:'',
      showinb2b:''
    })


    const fetchData = () =>{
      setLoading(true)

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
      let headers = {
        'x-access-token': token
      };

      axios.post("http://65.0.57.28:8481/content/CategoryMaster/GetAll",{dbclientid:"1"},{headers:headers}).then((response)=>{
        console.log('response.data.returnvalue====>',response.data.returnmsg);
        if(response.data.returnmsg.toLowerCase() === 'successful'){
          SetCategoryList(response.data.returnvalue);
         
        }
        setLoading(false)
      }).catch((error) => {
        console.log('error==>',error);
        setLoading(false)
      })

    }

    const handleChangeStatus = (categoryid,newstatus) => {
      
      

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
  
      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      let payload = {
        categoryid:categoryid,
        isactive:newstatus,
        lastmodifiedby:'content.admin@firstcry.com',
        dbclientid:'1'

      }

    

      axios.post("http://65.0.57.28:8481/content/CategoryMaster/MarkActiveInactive",payload,{headers:headers})
      .then((response)=>{
        if(response.data.returnmsg.toLowerCase() == 'successful'){
          
    
            const updatedCategoryList = categorylist.map((category)=>
            category.productcatid === categoryid ? {...category,isactive:newstatus} : category
            ); 

            SetCategoryList(updatedCategoryList)
             

            alertify.alert('Status Updated');



        }
      }).catch()




    }

    
     useEffect(()=>{
      fetchData();
     },[])

     const handleFormDisplay = (action) =>{
    
      //Hiding Edit form
      setshowEditForm(false);
  
  
      if(action === 'add'){
  
        setsearchShowForm(false);
        setShowForm(!showform);      
         
      }
      else if (action === 'search'){
       
        setShowForm(false);
        setsearchShowForm(!showsearchform);
       
      }
      else if (action === 'all'){
       
        setShowForm(false);
        setsearchShowForm(false);
       
      }
  
    }   

    const handleAddFormSubmit = (formData) =>{
      setLoading(true);

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

       
      formData.lastmodifiedby = 'content.admin@firstcry.com';
      formData.dbclientid = '1';
      formData.productcatid = Math.floor(Math.random() * (10000 - 1200 + 1)) + 1200;
      
      axios.post("http://65.0.57.28:8481/content/CategoryMaster/Add",formData,{headers:headers}).
      then((response) => {
          console.log('ADd category response.data.returnms===>',response.data.returnmsg);
          if(response.data.returnmsg.toLowerCase() === 'successful'){
            // SetCategoryList(...categorylist,formData);

            setTimeout(()=>{
              setsuccessMessage('Category Added Succesfully');
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

      }).catch((error) =>{

      })

    }


    const handleSearchSubmit = (formData) => {
      
      setLoading(true);

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }

      formData.dbclientid = '1';

      axios.post("http://65.0.57.28:8481/content/CategoryMaster/GetAll",formData,{headers:headers}).then((response) =>{

        if(response.data.returnmsg.toLowerCase() === 'successful'){
          SetCategoryList(response.data.returnvalue);
        }
        else{
          SetCategoryList([]);
        }

        setLoading(false);

      }).catch((error) => {

      })
    }

    const openEditForm = (productcatid) =>{
      setShowForm(false);
      setsearchShowForm(false);
      setLoading(true); 

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
      
      let headers = {
        'x-access-token': token
      };

      let payload = {
        productcatid:productcatid,
        dbclientid:'1'
      }

      axios.post("http://65.0.57.28:8481/content/CategoryMaster/GetAll",payload,{headers:headers}).then((response) => {
        if(response.data.returnmsg.toLowerCase() === 'successful'){
          let editPayload = {
            productcatid:response.data.returnvalue[0].productcatid || '',
            categoryname:response.data.returnvalue[0].categoryname || '',
            isactive:response.data.returnvalue[0].isactive || '',
            sitetype:response.data.returnvalue[0].sitetype || '',
            showinb2b:response.data.returnvalue[0].showinb2b || ''
          }
          
          console.log('editPayload========>',editPayload);

          seteditCategoryData(editPayload);
        }
        setLoading(false)
      }).catch((error) => {

      })


      setshowEditForm(true);

    }

    const handleEditSubmit = (formData) => {
      console.log('formData handleEditSubmit========>',formData);

      setLoading(true);

      let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

      let headers = {
        'x-access-token':token // Include token in Authorization header
      }
      formData.lastmodifiedby = 'content.admin@firstcry.com';
      formData.dbclientid = '1';


      axios.post("http://65.0.57.28:8481/content/CategoryMaster/Update",formData,{headers:headers}).then((response)=> {
        if(response.data.returnmsg.toLowerCase() === 'successful'){
          SetCategoryList([...categorylist,formData]);

          setTimeout(()=>{
            setsuccessMessage('Category Updated Succesfully');
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
      }).catch((error) => {
        console.log('error=========>',error);
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
      <div className="d-flex justify-content-end mb-3">
          <button className="btn btn btn-primary btn-lg me-2" onClick={() => handleFormDisplay('add')}>Add Category</button>

          <button className="btn btn btn-primary btn-lg me-2" onClick={() => handleFormDisplay('search')}>Search Category</button>
        </div>
      {
        showform ? (<AddCategoryForm handleFormDisplay = {handleFormDisplay} handleAddFormSubmit={handleAddFormSubmit}></AddCategoryForm>):''
      }
      {
        showsearchform ? (<SearchCategoryForm handleFormDisplay = {handleFormDisplay} handleSearchSubmit={handleSearchSubmit}></SearchCategoryForm>):''
      }
      {
        showEditForm ? (<EditCategoryForm onEditSubmit={handleEditSubmit} onEditCancel = {()=>setshowEditForm(false)} categoryData = {editCategoryData}></EditCategoryForm>):''
      }
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        {
          loading ? (<Loader/>) : ''
        }
        <CategoryMasterTable openEditForm={openEditForm} handleChangeStatus={handleChangeStatus} categorylist = {categorylist} />
      </Col>
     
       
    </Row>
  );
};

export default CategoryMaster;
