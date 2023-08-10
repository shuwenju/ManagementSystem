import {CDBIcon} from "cdbreact";

export const Dashboard = () => {

    return (
        <div className="wrapper flex-column">
            <div className="row w-100 row-cols-3 g-3">
                <div className="col">
                    <div className="card h-100" style={{backgroundColor: '#80b084'}}>
                        <div className="card-body text-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="fw-bold">New Purchased Orders</h5>
                                <CDBIcon fas icon="shopping-bag" size="lg"/>
                            </div>
                            <h2 className="fw-bold mt-2">30</h2>
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
                            <h2 className="fw-bold mt-2">25</h2>
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
                            <h2 className="fw-bold mt-2">105</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            some text
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
