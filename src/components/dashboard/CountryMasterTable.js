import { useState } from 'react';
import { Card, CardBody, CardTitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
 
const CountryMasterTable = (props) => {

  const countryList = props.countrylist || [];
  const handleChangeStatus = props.handleChangeStatus;
  const openEditForm = props.openEditForm;
    
  const edit = (countrymasterid) => {

    openEditForm(countrymasterid);
  }
  const changeStatus = (countrymasterid,newstatus)=>{
  
    handleChangeStatus(countrymasterid,newstatus)
   }
  
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Country List</CardTitle>
          

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Country ID</th>
                <th>Country Name</th>
                <th>Country Code</th>
                <th>ISO Code</th>
                <th>Status</th>
               
                <th>Lastmodifiedby</th>
                <th>Lastmodifieddate</th> 
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {countryList.map((country, index) => (
                <tr key={index} className="border-top">
                  <td> 
                      <div className="ms-3">
                      <span className="text-muted">{country.countrymasterid}</span> 
                      </div> 
                  </td>
  

                  <td> <span className="text-muted">{country.countryname}</span></td>
                  <td> <span className="text-muted">{country.countrycode}</span></td>
                  <td> <span className="text-muted">{country.isocodes}</span></td>
                  {
                    country.isactive == 1 ? (
                      <td>   <button onClick={()=>changeStatus(country.countrymasterid,0)} className="btn btn btn-success">Active  </button></td>
                    ):(
                      <td><button  onClick={()=>changeStatus(country.countrymasterid,1)} className="btn btn btn-danger">InActive  </button></td>
                    )
                  }
                
                 
 
                   
                  <td> <span className="text-muted">{country.lastmodifiedby}</span></td>
                  <td> <span className="text-muted">{new Date(country.lastmodifieddate).toLocaleDateString()}</span></td>
                  <td> <button onClick= {() => edit(country.countrymasterid)} className="btn btn btn-primary"> Edit </button></td>

                  
                  
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default CountryMasterTable;
