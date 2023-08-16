import {CDBIcon} from "cdbreact";
import {useState} from "react";

const OrderForm = ({
                       formData,
                       items,
                       customers,
                       handleFormChange,
                       handleItemChange,
                       handleSubmit,
                       addItemInput,
                       removeItemInput,
                       formError
                   }) => {
    const [customerAddress, setCustomerAddress] = useState("");

    function handleCustomerChange(event) {
        const selectedCustomer = customers.find(customer => customer.id == event.target.value);
        setCustomerAddress(selectedCustomer?.address ?? "");
        handleFormChange(event);
    }

    const getItemPrice = (itemId) => {
        const selectedItem = items.find(item => item.id == itemId);
        return selectedItem?.price ?? 0
    }

    return (
        <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-12">
                <div className="row">
                    <label className="col-sm-6 col-md-4 col-lg-2 col-form-label fw-semibold">Customer Name</label>
                    <div className="col-sm-6 col-lg-4">
                        <select style={{fontSize: '14px'}} className={`form-select 
                        ${formData.customerId === "" && formError.customer ? "is-invalid" : ""}`}
                                name="customerId" value={formData.customerId} onChange={handleCustomerChange}>
                            <option value="">Select Customer</option>
                            {customers.map(customer => (
                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                            ))}
                        </select>
                        <div className="invalid-feedback">
                            Please select a customer name.
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="row">
                    <label className="col-sm-6 col-md-4 col-lg-2 col-form-label fw-semibold">Shipping Address</label>
                    <div className="col-sm-6 col-lg-4">
                        <input className="form-control" style={{fontSize: '14px'}}
                               placeholder="Customer address" readOnly
                               name="shippingAddress" onChange={handleFormChange} value={customerAddress}/>
                    </div>
                </div>
            </div>

            {/* input Table */}
            <table className="table table-bordered mt-5">
                <thead>
                <tr>
                    <th scope="col" className="w-50">Product</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Total</th>
                    <th className="text-secondary">
                        <CDBIcon fas border icon="plus-square" size="2x" style={{cursor: 'pointer'}}
                                 onClick={addItemInput}/>
                    </th>
                </tr>
                </thead>
                <tbody>
                {formData.orderItems.map((itemRow, index) => (
                    <tr key={index}>
                        <td>
                            <select className={`form-select form-select-sm 
                            ${itemRow.itemId === "" && formError.orderItem.invalid ? "is-invalid" : ""}`}
                                    name="itemId" value={itemRow.itemId}
                                    onChange={event => handleItemChange(event, index)}>
                                <option value="">Open this select menu</option>
                                {
                                    items.map((item) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))
                                }
                            </select>
                            <div className="invalid-feedback">
                                {formError.orderItem.message}
                            </div>
                        </td>
                        <td>
                            <input type="number" className={`form-control form-control-sm 
                            ${itemRow.itemQuantity < 1 ? "is-invalid" : ""}`}
                                   name="itemQuantity" value={itemRow.itemQuantity} min="1"
                                   onChange={event => handleItemChange(event, index)}/>
                            <div className="invalid-feedback">
                                Please select a valid Quantity.
                            </div>
                        </td>
                        <td>
                            <input className="form-control form-control-sm" readOnly
                                   value={getItemPrice(itemRow.itemId)}/>
                        </td>
                        <td>
                            <input className="form-control form-control-sm" readOnly
                                   value={Number(itemRow.itemQuantity) * Number(getItemPrice(itemRow.itemId))}/>
                        </td>
                        <td className="text-secondary">
                            <CDBIcon fas border icon="minus-square" size="2x" style={{cursor: 'pointer'}}
                                     onClick={() => removeItemInput(index)}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* end input Table */}
            <div className="col-12">
                <div className="row justify-content-end">
                    <label className="col-sm-4 col-lg-3 col-form-label text-end fw-semibold">Gross Amount</label>
                    <div className="col-sm-4 col-lg-2">
                        <input className="form-control" type="text" style={{fontSize: '14px'}} readOnly
                               name="crossAmount" value={formData.crossAmount}/>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="row justify-content-end">
                    <label className="col-sm-4 col-lg-3 col-form-label text-end fw-semibold">GST/QST 15%</label>
                    <div className="col-sm-4 col-lg-2">
                        <input className="form-control" type="text" style={{fontSize: '14px'}} readOnly
                               value={(formData.crossAmount * 0.15).toFixed(2)}/>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="row justify-content-end">
                    <label className="col-sm-4 col-lg-3 col-form-label text-end fw-semibold">Net Amount</label>
                    <div className="col-sm-4 col-lg-2">
                        <input className="form-control" type="text" style={{fontSize: '14px'}} readOnly
                               value={(formData.crossAmount * 1.15).toFixed(2)}/>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary me-2">Create</button>
                <button type="button" className="btn btn-secondary">Cancel</button>
            </div>
        </form>
    );
};

export default OrderForm;