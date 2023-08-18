import { useState, useEffect } from "react";
import ProductTop from "./ProductTop";
import ProductTable from "./ProductTable";
import "../css/Products.css";
import ProductAddFormModal from "./ProductAddFormModal";
import axios from "axios";
import Spinner from "../components/Spinner";

export const Products = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [handleAddFormToggle, setHandleAddFormToggle] = useState(false);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (role === "Admin") setIsAdmin(true);
    getItems();
  }, []);

  const filterItems = (input) => {
    const lowerInput = input.toLowerCase();
    const newItems = items.filter((item) =>
      item.name.toLowerCase().includes(lowerInput)
    );
    setFilteredItems(newItems);
  };

  const getItems = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://localhost:44343/api/Items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error(error);
      // Optionally: Notify the user about the error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    filterItems(input);
  }, [input, items]);

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
      <div className="row flex-column position-relative" id="pageContainer">
        <ProductTop
          isAdmin={isAdmin}
          onHandleAddBtnClick={onHandleAddBtnClick}
          setInput={setInput}
        />
        <ProductTable
          isAdmin={isAdmin}
          items={filteredItems}
          getItem={getItems}
        />
        {isLoading ? <Spinner /> : null}
      </div>
    </div>
  );
};
