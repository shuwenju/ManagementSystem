import {CDBIcon} from "cdbreact";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";

export const Dashboard = () => {
    const [dashboard, setDashboard] = useState({
        newOrdersCount: 0,
        cancelledOrdersCount: 0,
        totalOrdersCount: 0,
        lowInStockItemsCount: 0,
        outOfStockItemsCount: 0
    });

    const fetchData = useCallback(async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get("https://localhost:44343/api/Dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDashboard(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="wrapper flex-column">
            <div className="row row-cols-3 g-3">
                <div className="col">
                    <div className="card h-100" style={{backgroundColor: '#80b084'}}>
                        <div className="card-body text-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">New Purchased Orders</h5>
                                <CDBIcon fas icon="shopping-bag" size="lg"/>
                            </div>
                            <h6>(last 7 days)</h6>
                        </div>
                        <div className="card-footer text-light bg-transparent border-0">
                            <h2 className="fw-bold mt-2">{dashboard.newOrdersCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100" style={{backgroundColor: '#6e8edb'}}>
                        <div className="card-body text-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">Cancelled Orders</h5>
                                <CDBIcon far icon="calendar-times" size="lg"/>
                            </div>
                        </div>
                        <div className="card-footer text-light bg-transparent border-0">
                            <h2 className="fw-bold mt-2">{dashboard.cancelledOrdersCount}</h2>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card h-100" style={{backgroundColor: '#5f7f9e'}}>
                        <div className="card-body text-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">Total Orders</h5>
                                <CDBIcon fas icon="shopping-bag" size="lg"/>
                            </div>
                        </div>
                        <div className="card-footer text-light bg-transparent border-0">
                            <h2 className="fw-bold mt-2">{dashboard.totalOrdersCount}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card p-2 p-lg-4 border-secondary">
                        <div className="card-body row">
                            <div className="col d-flex justify-content-center align-items-center
                             border-end border-2 border-secondary">
                                <CDBIcon fas icon="exclamation-circle" size="lg" className="text-warning"/>
                                <h2 className="fw-bold mb-0 mx-2">{dashboard.lowInStockItemsCount}</h2>
                                <h5 className="fw-bold mb-0 position-relative">
                                    Low in Stock
                                    <span className="position-absolute text-danger-emphasis"
                                          style={{left: 0, bottom: -15, fontSize: 12}}>
                                        (less than 5)
                                    </span>
                                </h5>
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                <CDBIcon fas icon="exclamation-triangle" size="lg" className="text-danger"/>
                                <h2 className="fw-bold mb-0 mx-2">{dashboard.outOfStockItemsCount}</h2>
                                <h5 className="fw-bold mb-0">Out of Stock</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
