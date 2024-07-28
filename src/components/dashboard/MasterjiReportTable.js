  import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import ReactPaginate from 'react-paginate';

import './pagination.css'

import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
import { useState } from "react";
const MasterjiReportTable = (props) => {

const {reportData,handleStatusChange,openEditForm} = props;
  

const [currentPage,setCurrentPage] = useState(0);
const itemsPerPage = 10;
const indexOfLastItem = (currentPage + 1) * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

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
          <CardTitle tag="h5">Masterji Report</CardTitle>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Sizechart	</th>
                <th>Age From	</th>               
                <th>Age To</th>
                <th>Measurement Status</th>
                <th>Source</th>
                <th>Brandid</th>
                <th>Subcatid</th>
                <th>Lastmodified By</th>
                <th>Lastmodified Date</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((record, index) => (
                
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.productid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.uniqueid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.agefrom}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.ageto}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.measurementstatus}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.source}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.brandid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.subcatid}</span> 
                    </div>
                  </td>

                  <td>
                    <div className="d-flex align-items-center p-2">                       
                      <span className="text-muted">{record.lastmodifiedby}</span> 
                    </div>
                  </td>
 
                  
                   
                    <td> <span className="text-muted">{new Date(record.createddate).toLocaleDateString()}</span></td>

                    
                  
                </tr>
              ))}
            </tbody>
          </Table>

          <ReactPaginate
  pageCount={Math.ceil(reportData.length / itemsPerPage)}
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

export default MasterjiReportTable;
