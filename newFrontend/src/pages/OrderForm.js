import '../css/Orders.css'
import { Link } from 'react-router-dom'


const OrderForm = ({ formData, orderItems, handleChange, handleItemChange, handleSubmit, addItemInput, removeItemInput, findItemRate, calculateTotal }) => {
    return (
        <form className="form px-3 py-3 bg-light rounded" onSubmit={handleSubmit} >
            <div className="form-group row mb-3">
                <div className="col d-flex align-items-baseline gap-3">
                    <label htmlFor="name" className="form-label fw-bold"> Name</label>
                    <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="col d-flex align-items-baseline gap-3">
                    <label htmlFor="email" className="form-label fw-bold">Email</label>
                    <input
                        className="form-control w-50"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        id="email"
                        placeholder="email@example.com"
                        required
                    />
                </div>
            </div>
            <div className="form-group row ">

                <div className="col d-flex align-items-baseline gap-3">
                    <label htmlFor="address" className="form-label fw-bold">Address</label>
                    <input
                        className="form-control"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        id="address"
                        type="text"
                        placeholder="Address Line"
                        required
                    />
                </div>
                <div className="col d-flex align-items-baseline gap-3">
                    <label htmlFor="phone" className="form-label fw-bold">Phone Number</label>
                    <input
                        className="form-control w-50"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        id="phone"
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="Format: 123-456-7890"
                        required
                    />
                </div>
            </div>

            {formData.orderItems.map((input, index) => {
                return (
                    <table key={index} className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Rate</th>
                                <th scope="col">Amount</th>
                                <th scope="col">
                                    {

                                        index == 0 ? <a className="btn btn-success" onClick={addItemInput}>Add Item</a>
                                            : null
                                    }
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {/* 
                                            Select input will need to be populated with
                                            Item details from the database
                                        */}
                                    <select
                                        name="itemName"
                                        id="itemName"
                                        className="form-select"
                                        required
                                        value={input.itemName}
                                        onChange={event => handleItemChange(event, index)}
                                    >
                                        {
                                            orderItems.map((item, index) => {
                                                if (index == 0) {
                                                    return <option key={item.id} defaultValue={item.name}>{item.name}</option>
                                                } else {
                                                    return (
                                                        <option key={item.id}>{item.name}</option>
                                                    )
                                                }


                                            })
                                        }
                                    </select>
                                </td>
                                <td>
                                    <input
                                        id="quantity"
                                        value={input.quantity}
                                        onChange={event => handleItemChange(event, index)}
                                        name="quantity"
                                        type="number"
                                        className="form-control"
                                        required
                                    />
                                </td>
                                <td>
                                    <p className="mt-2">
                                        {
                                            findItemRate(input)
                                            // itemPrice
                                        }
                                    </p>
                                </td>
                                <td>

                                    <p className="mt-2">
                                        {
                                            input.quantity.length > 0 ?
                                                parseInt(input.quantity * findItemRate(input))
                                                :
                                                0
                                        }
                                    </p>
                                </td>

                                <td>
                                    {/* Will add the remove button on the next order items */}
                                    {index == 0 ? null : <a className="btn btn-danger" onClick={() => removeItemInput(index)}>Remove Item</a>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                )
            })}
            <div className="d-flex justify-content-around align-items-baseline">
                <div className="">
                    <h4 className="mb-4 fw-bold">
                        Order Total: $ {calculateTotal()}
                    </h4>
                </div>
                <div className="mt-5 d-flex gap-4">
                    <button className="btn btn-primary" onClick={handleSubmit}>Add Order</button>
                    <Link to="/page1">
                        <button className="btn btn-secondary">Cancel</button>
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default OrderForm