import { useState, useEffect } from "react";
import CustomerTop from "./CustomerTop";
import CustomerTable from "./CustomerTable";
import "../css/Products.css";
import CustomerAddFormModal from "./CustomerAddFormModal";
import axios from "axios";
import Spinner from "../components/Spinner";

export const Customer = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [handleAddFormToggle, setHandleAddFormToggle] = useState(false);
//   const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [status, setStatus] = useState(false);

//   useEffect(() => {
//     filterItems(input);
//   }, [input, items]);

//   const filterItems = (input) => {
//     const lowerInput = input.toLowerCase();
//     const newItems = items.filter((item) =>
//       item.name.toLowerCase().includes(lowerInput)
//     );
//     setFilteredItems(newItems);
//   };

  const getItems = async () => {
    try {
      setStatus(true);
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get("https://localhost:44343/api/Customers/allCustomers",
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
        }
      }
      );
      setItems(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setStatus(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const onHandleAddBtnClick = () => {
    setHandleAddFormToggle(true);
  };

  return (
    <div className="wrapper flex-column">
      {handleAddFormToggle && (
        <CustomerAddFormModal
          show={handleAddFormToggle}
          onHide={() => setHandleAddFormToggle(false)}
          getItems={getItems}
          setHandleAddFormToggle={setHandleAddFormToggle}
        />
      )}

      <div
        className="container flex-column position-relative"
        id="pageContainer"
      >
        <CustomerTop
          isAdmin={isAdmin}
          onHandleAddBtnClick={onHandleAddBtnClick}
        //   setInput={setInput}
        />
        <CustomerTable isAdmin={isAdmin} items={items} getItems={getItems}/>
        {status ? <Spinner /> : null}
      </div>
    </div>
  );
};