import CountryMasterTable from "../../components/dashboard/CountryMasterTable";
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCountryForm from "./Forms/AddCountryForm";
import SearchCountryForm from "./Forms/SearchCountryForm";
import Loader from "../common/Loader";
import EditCountryForm from "./Forms/EditCountryForm";

const CountryMaster = () => {
  const [countrylist, setCountryList] = useState([]);
  const [showform, setShowForm] = useState(false);
  const [showEditform, setshowEditform] = useState(false);
  const [showsearchform, setsearchShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setsuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editCountryData, seteditCountryData] = useState({
    countrymasterid: '',
    countryname: '',
    countrycode: '',
    isocodes: ''
  });
  
  // Modal state
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const fetchData = () => {
    setLoading(true);
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditForm = (countrymasterid) => {
    setShowForm(false);
    setsearchShowForm(false);
    console.log('openEditForm countrymasterid =====> ', countrymasterid);

    setLoading(true);
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
    let headers = {
      'x-access-token': token
    };

    let payload = {
      dbclientid: '1',
      countrymasterid: countrymasterid
    };
    axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterGetAll", payload, { headers: headers })
      .then((response) => {
        if (response.data.returnmsg.toLowerCase() === 'successful') {
          let editPayload = {
            countrymasterid: response.data.returnvalue[0].countrymasterid || '',
            countryname: response.data.returnvalue[0].countryname || '',
            countrycode: response.data.returnvalue[0].countrycode || '',
            isocodes: response.data.returnvalue[0].isocodes || ''
          };
          seteditCountryData(editPayload);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('error===>', error);
        setLoading(false);
      });

    setshowEditform(true);
  };

  const handleChangeStatus = (countrymasterid, newstatus) => {
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
    let headers = {
      'x-access-token': token
    };
    let payload = {
      countrymasterid: countrymasterid,
      isactive: newstatus,
      lastmodifiedby: 'content.admin@firstcry.com',
      dbclientid: '1'
    };

    axios.post("http://65.0.57.28:8481/common/countrymaster/MarkActiveInactive", payload, { headers: headers })
      .then((response) => {
        if (response.data.returnmsg.toLowerCase() == 'successful') {
          const updatedCountryList = countrylist.map((country) =>
            country.countrymasterid === countrymasterid ? { ...country, isactive: newstatus } : country
          );
          setCountryList(updatedCountryList);
        }
      }).catch((error) => {
        console.log('error===>', error);
      });
  };

  const handleEditFormSubmit = (formData) => {
    setLoading(true);
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
    let headers = {
      'x-access-token': token
    };
    formData.lastmodifiedby = 'content.admin@firstcry.com';
    formData.dbclientid = '1';
    formData.isactive = 1;

    axios.post("http://65.0.57.28:8481/common/countrymaster/countrymasterUpdate", formData, { headers: headers }).then((response) => {
      if (response.data.returnmsg.toLowerCase() == 'successful') {
        setCountryList([...countrylist, formData]);

        setTimeout(() => {
          setsuccessMessage('Country Updated Succesfully');
          setErrorMessage('');
          fetchData();

          setTimeout(() => {
            setsuccessMessage('');
          }, 5000);
        }, 1000);
      } else {
        setTimeout(() => {
          setErrorMessage(response.data.returnmsg);
          setsuccessMessage('');

          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }, 1000);
      }
      setLoading(false);
    }).catch((error) => {
      console.log('error===>', error);
      setLoading(false);
    });
  };

  const handleFormSubmit = (formData) => {
    setLoading(true);
    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNyb25AZmlyc3RjcnkuY29tIiwiaXAiOiIxMi4zLjQuMSIsImlhdCI6MTUzMzI4MzI2N30.sRKklSlGksc0H_LyL2pfIzedH2dKGQLhsKurguuwvHo';
    let headers = {
      'x-access-token': token
    };
    formData.isactive = 1;
    formData.lastmodifiedby = 'content.admin@firstcry.com';
    formData.dbclientid = '1';

    axios.post("http://65.0.57.28:8481/common/countrymaster/Add", formData, { headers: headers }).then((response) => {
      if (response.data.returnmsg.toLowerCase() == 'successful') {
        setCountryList([...countrylist, formData]);

        setTimeout(() => {
          setsuccessMessage('Country Added Succesfully');
          setErrorMessage('');
          fetchData();

          setTimeout(() => {
            setsuccessMessage('');
          }, 5000);
        }, 1000);
      } else {
        setTimeout(() => {
          setErrorMessage(response.data.returnmsg);
          setsuccessMessage('');

          setTimeout(() => {
            setErrorMessage('');
          }, 5000);
        }, 1000);
      }
      setLoading(false);
    }).catch((error) => {
      console.log('error===>', error);
      setLoading(false);
    });
  };

  return (
    <Row>
      <Col md="12">
        <Button color="primary" onClick={() => setShowForm(!showform)}>Add Country</Button>
        <Button color="secondary" onClick={() => setsearchShowForm(!showsearchform)}>Search Country</Button>

        <Button color="info" onClick={toggleModal}>Open Modal</Button>

        {successMessage && <Alert color="success">{successMessage}</Alert>}
        {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

        {loading ? (
          <Loader />
        ) : (
          <CountryMasterTable
            countrylist={countrylist}
            handleChangeStatus={handleChangeStatus}
            openEditForm={openEditForm}
          />
        )}
        {showform && <AddCountryForm handleFormSubmit={handleFormSubmit} />}
        {showsearchform && <SearchCountryForm />}
        {showEditform && <EditCountryForm countryData={editCountryData} handleEditFormSubmit={handleEditFormSubmit} />}

        {/* Modal component */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Modal Title</ModalHeader>
          <ModalBody>
            This is the content of the modal.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>Close</Button>
          </ModalFooter>
        </Modal>
      </Col>
    </Row>
  );
};

export default CountryMaster;
