import CountryMasterTable from "../../components/dashboard/CountryMasterTable";
import { Row, Col } from "reactstrap";
import { useEffect, useState } from "react";



import {
  Alert  
} from "reactstrap";

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import axios from "axios";
import AddCountryForm from "./Forms/AddCountryForm";
import SearchCountryForm from "./Forms/SearchCountryForm";
import Loader from "../common/Loader";
import EditCountryForm from "./Forms/EditCountryForm";
const CountryMaster = () => {
  
  const [countrylist ,setCountryList] = useState([]);
  const [showform,setShowForm] = useState(false);
  const [showEditform,setshowEditform] = useState(false);
  const [showsearchform,setsearchShowForm] = useState(false);
  const [loading,setLoading] = useState(false)
  const [successMessage,setsuccessMessage] = useState('');
  const [errorMessage,setErrorMessage] = useState('')
  const [editCountryData,seteditCountryData] =useState({
    countrymasterid:'',
    countryname:'',
    countrycode:'',
    isocodes:''  
  })
  const fetchData = () => {

    setLoading(true);
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
    let headers = {
      'x-access-token': token
    };

    axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterGetAll", { dbclientid: '1' }, { headers: headers })
      .then((response) => {
        if (response.data.returnmsg.toLowerCase() === 'successful') {
          setCountryList(response.data.returnvalue);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('error===>', error);
        setLoading(false);
      });
  }
  useEffect(()=>{
    fetchData();
},[])

const openEditForm = (countrymasterid) =>{
  setShowForm(false);      
  setsearchShowForm(false);
  console.log('openEditForm countrymasterid =====> ',countrymasterid);

  setLoading(true);
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
  let headers = {
    'x-access-token': token
  };

  let payload  = {
    dbclientid:'1',
    countrymasterid:countrymasterid
  }
  axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterGetAll", payload, { headers: headers })
    .then((response) => {
      if (response.data.returnmsg.toLowerCase() === 'successful') {
       
        let editPayload = {
          countrymasterid:response.data.returnvalue[0].countrymasterid || '',
          countryname:response.data.returnvalue[0].countryname || '',
          countrycode:response.data.returnvalue[0].countrycode || '',
          isocodes:response.data.returnvalue[0].isocodes || ''
         
        }
        // console.log('In Edit response.data.returnvalue====>',response.data.returnvalue);
         seteditCountryData(editPayload);
        // console.log('editCountryData after update ======>',editCountryData);
      }
      setLoading(false);
    })
    .catch((error) => {
      console.log('error===>', error);
      setLoading(false);
    });


  setshowEditform(true);

}
const handleChangeStatus = (countrymasterid,newstatus) => {
   

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'
  let headers = {
    'x-access-token':token // Include token in Authorization header
  }
  let payload = {
    countrymasterid:countrymasterid,
    isactive:newstatus,
    lastmodifiedby:'content.admin@firstcry.com',
    dbclientid:'1'
  }

  axios.post("http://65.0.57.28:8481/common/countrymaster/MarkActiveInactive",payload,{headers:headers})
  .then((response)=>{
    if(response.data.returnmsg.toLowerCase() == 'successful'){
      
     

        const updatedCountryList = countrylist.map((country)=>
          country.countrymasterid === countrymasterid ? {...country,isactive:newstatus} : country
        );
        setCountryList(updatedCountryList)

    }
  }).catch()
  


}


const handleEditFormSubmit = (formData) => {
   

  setLoading(true);
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

  let headers = {
    'x-access-token':token // Include token in Authorization header
  }
  formData.lastmodifiedby = 'content.admin@firstcry.com';
  formData.dbclientid = '1';
  formData.isactive = 1;

  axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterUpdate",formData,{headers:headers}).then((response) => {
    if(response.data.returnmsg.toLowerCase() == 'successful'){
      setCountryList([...countrylist,formData])


      setTimeout(()=>{
        setsuccessMessage('Country Updated Succesfully');
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

  // 
}


const handleFormSubmit = (formData) => {
  console.log('formData after submit===>',formData);
  setLoading(true);
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

  let headers = {
    'x-access-token':token // Include token in Authorization header
  }
  formData.isactive = 1;
  formData.lastmodifiedby = 'content.admin@firstcry.com';
  formData.dbclientid = '1';

  axios.post("http://65.0.57.28:8481/common/countrymaster/Add",formData,{headers:headers}).then((response) => {
      if(response.data.returnmsg.toLowerCase() == 'successful'){
        setCountryList([...countrylist,formData])


        setTimeout(()=>{
          setsuccessMessage('Country Added Succesfully');
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


const handleSearchFormSubmit = (formData) => {
  console.log('formData after search submit===>',formData);
  setLoading(true);
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo'

  let headers = {
    'x-access-token':token // Include token in Authorization header
  }
  formData.isactive = 1;
  formData.lastmodifiedby = 'content.admin@firstcry.com';
  formData.dbclientid = '1';

  axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterGetAll",formData,{headers:headers}).then((response) => {
      if(response.data.returnmsg.toLowerCase() == 'successful'){

        setCountryList(response.data.returnvalue);

        // setCountryList([...countrylist,formData])


        setTimeout(()=>{
          setsuccessMessage('Data Found');
          setErrorMessage('');
          // fetchData();

          setTimeout(()=>{
            setsuccessMessage('')
          },5000)


        },1000)
      }
      else{
        setCountryList([]);
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

  const handleFormDisplay = (action) =>{
    
    //Hiding Edit form
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

  return (
    <Row>
       
      <Col lg="12">
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
          <button className="btn btn btn-primary btn-lg me-2" onClick={() => handleFormDisplay('add')}>Add Country</button>

          <button className="btn btn btn-primary btn-lg me-2" onClick={() => handleFormDisplay('search')}>Search Country</button>
        </div>

        
   
      {
        showform ? (
          <AddCountryForm onSubmit={handleFormSubmit} onCancel={()=>setShowForm(false)}></AddCountryForm>
        ): ''
      }

      {
        showsearchform ? (
          <SearchCountryForm onSubmit={handleSearchFormSubmit} onCancel={()=>setsearchShowForm(false)}></SearchCountryForm>
        ): ''
      }
      
      {
        showEditform ? (
          <EditCountryForm onEditSubmit={handleEditFormSubmit} onEditCancel={() => setshowEditform(false)} countryData = {editCountryData} ></EditCountryForm>
        ):''
      }

      <CountryMasterTable openEditForm ={openEditForm} handleChangeStatus = {handleChangeStatus} countrylist={countrylist} />
      </Col>
       
    </Row>
  );
};

export default CountryMaster;
