  import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import ReactPaginate from 'react-paginate';

import './pagination.css'

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useState } from "react";
const CategoryMasterTable = (props) => {

 

  const {categorylist,handleChangeStatus,openEditForm} = props;

  const [currentPage,setCurrentPage] = useState(0);
  const itemsPerPage = 10;

const indexOfLastItem = (currentPage + 1) * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = categorylist.slice(indexOfFirstItem, indexOfLastItem);


  const changeStatus = (categoryid,newstatus)=>{
    console.log('before categoryid===>',categoryid);
    console.log('before newstatus===>',newstatus);


    handleChangeStatus(categoryid,newstatus)
  }





  const edit = (categoryid)=>{
     
    openEditForm(categoryid);

  }
 
  const getSiteTypeText = (sitetype) => {
    switch(sitetype){

      case 0: return 'Firstcry';
      case 3: return 'Goodlife';
      case 4: return 'IntelliSkills/intelli Business';
      case 9: return 'FC site';
      default :return '--'

    }
  }


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Category List</CardTitle>
        

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Category ID</th>
                <th>Category Name</th>

                <th>Site Type</th>
                <th>Show in B2B</th>
                <th>Isactive</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((category, index) => (
                
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{category.categoryid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{category.categoryname}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{getSiteTypeText(category.sitetype)}</span> 
                    </div>
                  </td>


                  {/* @if ($element['showinb2b'] == 0)
                    <span className="text-danger"><em className="fa fa-times"></em></span>
                    @else
                    <span className="text-success"><em className="fa fa-check"></em></span>
                    @endif</td> */}


                  

                  {
                    category.showinb2b == 1 ? (<td><span href="" className="ms-3 badge bg-success">Yes</span> </td>):( <td><span href="" className="ms-3 badge bg-danger">No</span></td>)
                  }

                   {
                    category.isactive == 1 ? ( <td>   <button onClick={()=>changeStatus(category.productcatid,0)} className="btn btn btn-success">Active  </button></td>):(<td><button  onClick={()=>changeStatus(category.productcatid,1)} className="btn btn btn-danger">InActive  </button></td>)
                   }
                    <td> <span className="text-muted">{new Date(category.createddate).toLocaleDateString()}</span></td>

                    <td> <span className="text-muted">{new Date(category.lastmodifieddate).toLocaleDateString()}</span></td>
                   <td> <button onClick={() => edit(category.productcatid)} className="btn btn btn-primary">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ReactPaginate
  pageCount={Math.ceil(categorylist.length / itemsPerPage)}
  pageRangeDisplayed={5}
  marginPagesDisplayed={2}
  onPageChange={({ selected }) => setCurrentPage(selected)}
  containerClassName={'pagination'}
  activeClassName={'active'}
  style={{
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
  }}
/>
        </CardBody>
      </Card>
    </div>
  );
};

export default CategoryMasterTable;
