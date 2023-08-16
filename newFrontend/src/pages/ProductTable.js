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

const ProductTable = ({ isAdmin, items }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
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
                    />
                  </td>
                  <td>
                    <CDBIcon
                      fas
                      icon="trash"
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </td>
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
              <th>Item ID</th>
              <th>Item Name</th>
              <th>Item Description</th>
              <th>Price</th>
              <th>Quantity Remaining</th>
            </tr>
          </CDBTableHeader>
          <CDBTableBody>
            <Table currentItems={currentItems} />
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

export default ProductTable;