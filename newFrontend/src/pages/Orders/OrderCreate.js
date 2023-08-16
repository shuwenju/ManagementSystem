import moment from "moment";
import OrderForm from "./OrderForm";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const OrderCreate = () => {

    const fetchFormData = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const customersResponse = await axios.get("https://localhost:44343/api/Customers/allCustomers", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCustomers(customersResponse.data);

            const itemsResponse = await axios.get("https://localhost:44343/api/Items", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setItems(itemsResponse.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchFormData();
    }, [fetchFormData]);

    const redirect = useNavigate();
    const routePath = useLocation().pathname.startsWith("/admin") ? "/admin" : "/user";

    const [customers, setCustomers] = useState([]);

    const [items, setItems] = useState([]);

    const [formData, setFormData] = useState({
        "customerId": "",
        "crossAmount": 0,
        "shippingAddress": "",
        "orderItems": [
            {
                "itemId": "",
                "itemQuantity": 1
            }
        ]
    });

    const [formError, setFormError] = useState({
        "customer": false,
        "orderItem": {
            invalid: false,
            message: ""
        }
    });

    // Stores data from the order item inputs and adds it to the form data
    function handleItemChange(event, index) {
        const {name, value} = event.target
        if (name === "itemId" && value !== "" && formData.orderItems.findIndex(item => item.itemId === value) !== -1) {
            setFormError({...formError, orderItem: {invalid: true, message: "Item already exist."}});
            return;
        }

        let data = [...formData.orderItems]
        data[index][name] = value;

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data,
                crossAmount: calculateTotal()
            }
        })
    }

    function handleFormChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        });
        setFormError({...formError, customer: false});
    }


    function addItemInput() {
        const lastOrderItemId = formData.orderItems[formData.orderItems.length - 1].itemId;
        if (lastOrderItemId === "") {
            setFormError({...formError, orderItem: {invalid: true, message: "Please select a valid item."}});
            return;
        }
        setFormError({...formError, orderItem: {invalid: false, message: ""}});
        let newOrderItem = {
            "itemId": "",
            "itemQuantity": 1
        }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: [...prevFormData.orderItems, newOrderItem]
            }
        })
    }

    function removeItemInput(index) {
        if (formData.orderItems.length === 1) {
            return;
        }
        let data = [...formData.orderItems]
        data.splice(index, 1)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data
            }
        })
    }

    function calculateTotal() {
        let sum = 0

        formData.orderItems.forEach(orderItem => {
            let matchedItem = items.find(item => item.id == orderItem.itemId)
            if (matchedItem !== undefined) {
                sum += Number(orderItem.itemQuantity) * Number(matchedItem.price)
            }
        });
        return sum.toFixed(2)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (formData.customerId === "") {
            setFormError({...formError, customer: true});
            return;
        }
        if (formData.orderItems[formData.orderItems.length - 1].itemId === "") {
            setFormError({...formError, orderItem: {invalid: true, message: "Please select a valid item."}});
            return;
        }

        try {
            // Retrieve the JWT token from local storage
            const token = localStorage.getItem('jwtToken');

            const response = await axios.post('https://localhost:44343/api/Orders', formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            redirect(`${routePath}/orders`, { state: { message: "Order Created Successfully" } })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="wrapper flex-column" style={{fontSize: '14px'}}>
            <div className="row align-items-center mb-5">
                <div className="col-6">
                    <h3 className="text-body-secondary fw-bolder">Add new order</h3>
                </div>
                <div className="col-6 text-end">
                    <h6 className="text-body-secondary fw-bolder">{moment().format('YYYY-MM-DD')}</h6>
                </div>
            </div>
            <OrderForm
                formData={formData}
                items={items}
                customers={customers}
                handleFormChange={handleFormChange}
                handleItemChange={handleItemChange}
                handleSubmit={handleSubmit}
                addItemInput={addItemInput}
                removeItemInput={removeItemInput}
                formError={formError}
            />
        </div>
    );
}