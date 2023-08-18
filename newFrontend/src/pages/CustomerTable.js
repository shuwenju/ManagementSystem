import React, { useState } from "react";
import {
  CDBTable,
  CDBTableHeader,
  CDBTableBody,
  CDBContainer,
  CDBIcon,
} from "cdbreact";
import ReactPaginate from "react-paginate";
import "../css/ProductTable.css";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import axios from "axios"
import CustomerEditFormModal from "./CustomerEditFormModal";

const CustomerTable = ({ isAdmin, items, getItems }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };




  function Table({ currentItems,getItems }) {

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setEditModalVisible(true);
  };
  const handleDelete = async (customerId) => {
    try {
      // Ask for confirmation before proceeding
      const shouldDelete = window.confirm("Are you sure you want to delete this record?");
  
      if (!shouldDelete) {
        return; // If user cancels deletion, exit the function
      }
  
      const token = localStorage.getItem('jwtToken');
      await axios.delete(`https://localhost:44343/api/Customers/${customerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // After successful deletion, refresh the list of items
      getItems();
    } catch (error) {
      console.error(error);
    }
  };
  

    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.address}</td>
              {isAdmin && (
                <>
                  <td>
                    <CDBIcon
                      fas
                      icon="edit"
                      style={{ color: "orange", cursor: "pointer" }}
                      onClick={() => handleEdit(item)}
                    />
                  </td>
                  <td>
                    <CDBIcon
                      fas
                      icon="trash"
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                    {/* Edit modal */}
                    {editModalVisible && (
                      <CustomerEditFormModal
                        show={editModalVisible}
                        onHide={() => setEditModalVisible(false)}
                        getItems={getItems} // Pass your getItems function
                        customerData={selectedCustomer} // Pass the selected customer data
                      />
                    )}
                </>
              )}
            </tr>
          ))}
      </>
    );
  }

  return (
    <div className="d-flex flex-column mt-3">
      <CDBContainer>
        <CDBTable responsive>
          <CDBTableHeader>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            <Table currentItems={currentItems} getItems={getItems} />
          </CDBTableBody>
        </CDBTable>
      </CDBContainer>
      <div className="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<GrFormNext />}
          activeClassName="active"
          breakLinkClassName="page-link"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={pageCount}
          previousLabel={<GrFormPrevious />}
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
