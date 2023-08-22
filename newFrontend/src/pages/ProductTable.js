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
import axios from "axios";
import ProductEditFormModal from "./ProductEditFormModal";

const ProductTable = ({ isAdmin, items, getItems }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };
  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`https://localhost:44343/api/Items/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setItemOffset(0); // Reset the current page offset when changing items per page
  };

  function Table({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}$</td>
              <td>{item.quantityInStock}</td>
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
                  {editModalVisible && (
                    <ProductEditFormModal
                      show={editModalVisible}
                      onHide={() => setEditModalVisible(false)}
                      getItems={getItems}
                      productData={selectedProduct}
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
    <div className="row m-auto d-flex flex-column mt-3">
      <CDBContainer>
        <CDBTable responsive>
          <CDBTableHeader>
            <tr>
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Price</th>
              <th>Quantity Remaining</th>
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
      <div>
        <label htmlFor="itemsPerPageSelect" className="me-2">
          Items per page:
        </label>
        <select
          id="itemsPerPageSelect"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default ProductTable;
