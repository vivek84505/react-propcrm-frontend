  import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import ReactPaginate from 'react-paginate';

import './pagination.css'

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useState } from "react";
const ColorMasterTable = (props) => {

const {colorList,handleStatusChange,openEditForm} = props;
  

const [currentPage,setCurrentPage] = useState(0);
const itemsPerPage = 10;
const indexOfLastItem = (currentPage + 1) * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = colorList.slice(indexOfFirstItem, indexOfLastItem);

const changeStatus = (colorid,status) =>{
  handleStatusChange(colorid,status)
}

const edit = (colorid) => {
  openEditForm(colorid);
}


  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Color List</CardTitle>
        

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Color Id</th>
                <th>Color Name	</th>

                <th>Hex Code	</th>
               
                <th>Isactive</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((color, index) => (
                
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{color.colorid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{color.colorname}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{color.hexcode}</span> 
                    </div>
                  </td>

 

                   {
                    color.isactive == 1 ? ( <td>   <button onClick={()=>changeStatus(color.colorid,0)} className="btn btn btn-success">Active  </button></td>):(<td><button  onClick={()=>changeStatus(color.colorid,1)} className="btn btn btn-danger">InActive  </button></td>)
                   }
                    <td> <span className="text-muted">{new Date(color.createddate).toLocaleDateString()}</span></td>

                    <td> <span className="text-muted">{new Date(color.lastmodifieddate).toLocaleDateString()}</span></td>
                   <td> <button onClick={() => edit(color.colorid)} className="btn btn btn-primary">Edit</button></td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ReactPaginate
  pageCount={Math.ceil(colorList.length / itemsPerPage)}
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

export default ColorMasterTable;
