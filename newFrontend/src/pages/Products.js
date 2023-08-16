import { useState, useEffect, useContext } from "react";
import ProductTop from "./ProductTop";
import ProductTable from "./ProductTable";
import "../css/Products.css";
import ProductAddFormModal from "./ProductAddFormModal";
import axios from "axios";
import Spinner from "../components/Spinner";
import RoleContext from "../data/RoleContext";

export const Products = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [handleAddFormToggle, setHandleAddFormToggle] = useState(false);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [status, setStatus] = useState(false);
  // const role = useContext(RoleContext);
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('jwtToken');

   useEffect(() => {
     role === "Admin" ? setIsAdmin(true) : setIsAdmin(false);
   }, []);

  useEffect(() => {
    filterItems(input);
  }, [input, items]);

  const filterItems = (input) => {
    const lowerInput = input.toLowerCase();
    const newItems = items.filter((item) =>
      item.name.toLowerCase().includes(lowerInput)
    );
    setFilteredItems(newItems);
  };

  const getItems = async () => {
    try {
      setStatus(true);
      const response = await axios.get("https://localhost:44343/api/Items",
      {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
        }
      }
      );
      setItems(response.data);
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
        <ProductAddFormModal
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
        <ProductTop
          isAdmin={isAdmin}
          onHandleAddBtnClick={onHandleAddBtnClick}
          setInput={setInput}
        />
        <ProductTable isAdmin={isAdmin} items={filteredItems} getItem={getItems} />
        {status ? <Spinner /> : null}
      </div>
    </div>
  );
};
