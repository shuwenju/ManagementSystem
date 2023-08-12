import { CDBIcon } from "cdbreact";
import { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import '../css/Orders.css'
import OrderForm from "./OrderForm";

export const AddOrder = () => {

    // USING OUR OWN SERVER
    const baseUrl = 'http://localhost:3001/api/orders'

    // Using Axios to send POST request to Backend
    const createOrder = newOrder => {
        const request = axios.post(baseUrl, newOrder)
        return request.then(response => response.data)
    }

    // Simulating items we get from DB to populate form
    const [orderItems, setOrderItems] = useState([
        {
            id: '01',
            name: "Wood",
            orderedAmount: '',
            price: 50
        },
        {
            id: '02',
            name: "Paper",
            orderedAmount: '',
            price: 20
        },
        {
            id: '03',
            name: "Chair",
            orderedAmount: '',
            price: 30
        },

    ])

    const [orderTotal, setOrderTotal] = useState(0)


    // formats date into "YYYY-MM-DD"
    const date = new Date()
    const dateFormat = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate()


    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        orderItems: [
            {
                itemName: '',
                quantity: 0
            }
        ],
        total: 0,
        orderDate: dateFormat
    })


    // Stores data from the order item inputs and adds it to the form data
    function handleItemChange(event, index) {
        const { name, value } = event.target
        let data = [...formData.orderItems]
        data[index][name] = value

        // console.log(data)

        // let selectedItem = orderItems.find(item => item.name == value)
        // // console.log(selectedItem.price)
        // if (selectedItem != undefined) {
        //     setItemPrice(selectedItem.price)
        // }

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data
            }
        })
        setOrderTotal(calculateTotal())
    }

    console.log("Order Total", orderTotal)


    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }



    function addItemInput() {
        let newItemInput = { itemName: '', quantity: '' }
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: [...prevFormData.orderItems, newItemInput]
            }
        })
    }

    function removeItemInput(index) {
        let data = [...formData.orderItems]
        data.splice(index, 1)
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                orderItems: data
            }
        })
    }

    function findItemRate(inputItem) {

        // orderItems.find(item => inputItem.itemName == item.name).price
        // orderItems.find(item => input.itemName == item.name).price
        let selectedItem = orderItems.find(item => inputItem.itemName == item.name)
        // console.log(selectedItem.price)
        if (selectedItem != undefined) {
            // console.log(selectedItem.price)
            return selectedItem.price
        }

    }

    function calculateTotal() {
        let sum = 0

        formData.orderItems.forEach(item => {
            let matchedItem = orderItems.find(i => item.itemName == i.name)
            if (matchedItem != undefined) {
                if (parseInt(item.quantity) * matchedItem.price != NaN) {
                    sum += parseInt(item.quantity) * matchedItem.price
                    console.log(matchedItem.name, parseInt(item.quantity) * matchedItem.price)
                    console.log("Sum", sum)
                }
            }
        })
        if (!isNaN(sum)) {
            return sum
        }
        // return sum
    }
    function handleSubmit(event) {
        event.preventDefault()

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                total: orderTotal
            }
        })

        // Debbugin purposes see what is sent through forn
        // console.log(formData);

        // POST REQUEST TO BACKEND ADD LATER
        // createOrder(baseUrl, formData)

        // RESET FORM INPUTS
        setFormData({
            name: '',
            address: '',
            email: '',
            phone: '',
            orderItems: [
                {
                    itemName: '',
                    quantity: '',
                }
            ],
            orderDate: new Date()
        })
    }


    return (
        <div className="canvass w-100 vh-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h1>Add Order</h1>
                <Link to="/orders" >
                    <button className="btn btn-info">
                        Back to Orders List
                    </button>
                </Link>
            </div>
            <OrderForm
                formData={formData}
                orderItems={orderItems}
                handleChange={handleChange}
                handleItemChange={handleItemChange}
                handleSubmit={handleSubmit}
                addItemInput={addItemInput}
                removeItemInput={removeItemInput}
                findItemRate={findItemRate}
                calculateTotal={calculateTotal}
            />

        </div>
    );
}
