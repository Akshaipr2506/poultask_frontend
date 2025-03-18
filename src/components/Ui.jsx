import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

function Ui() {

    const [rows, setRows] = useState([{ id: 1 }]);

    const addRow = () => {
        setRows([...rows, { id: rows.length + 1 }]);
    };

    const removeRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };
    return (
        <>
            <div className='container mt-5'>
                <div className='bg-danger w-100 d-flex justify-content-center align-items-center' style={{ height: "80px" }}>
                    <h1 className='text-center'>Order Materials</h1>
                </div>
                <div className="my-2 row align-items-center">
                    <label className="col-sm-2 col-form-label fw-bold">ORDER LIST ID</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>
                    <label className="col-sm-1 col-form-label fw-bold">BUILDING ID</label>
                    <div className="col-sm-1">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>
                    <label className="col-sm-1 col-form-label fw-bold">BUILDING NAME</label>
                    <div className="col-sm-1">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>
                    <label className="col-sm-1 col-form-label fw-bold">BUILDING ADDRESS</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>

                </div>

                <div className="my-3 row align-items-center">
                    <label className="col-sm-2 col-form-label fw-bold">ORDER DESCRIPTION</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>
                </div>

                <div className="my-5 row align-items-center border shadow p-2">
                    <div className=" my-3 row text-dark fw-bold text-uppercase">
                        <div className="col-1">orderList tenNr/UID</div>
                        <div className="col-1">ITEM NR.</div>
                        <div className="col-2 text-danger">MATERIAL ID</div>
                        <div className="col-2 text-danger">MAT. DESCRIPTION</div>
                        <div className="col-1">CURRENT QTY</div>
                        <div className="col-1">PREVIOUS QTY</div>
                        <div className="col-1">QTY DIFF</div>
                        <div className="col-2">Order Comment</div>
                        <div className="col-1 text-end">
                            <FaPlus className="me-2" onClick={addRow} style={{ cursor: "pointer" }} />
                        </div>
                    </div>

                    {rows.map((row, index) => (
                        <div key={index} className="row align-items-center mt-2">
                            <div className="col-1">
                                <input type="text" className="form-control" placeholder="-----" />
                            </div>
                            <div className="col-1">
                                <input type="text" className="form-control" value={index + 1} readOnly />
                            </div>
                            <div className="col-2">
                                <input type="text" className="form-control text-danger" placeholder="-----" />
                            </div>
                            <div className="col-2">
                                <input type="text" className="form-control text-danger" placeholder="-----" />
                            </div>
                            <div className="col-1">
                                <input type="text" className="form-control" placeholder="-----" />
                            </div>
                            <div className="col-1">
                                <input type="text" className="form-control" placeholder="-----" />
                            </div>
                            <div className="col-1">
                                <input type="text" className="form-control" placeholder="-----" />
                            </div>
                            <div className="col-2">
                                <input type="text" className="form-control" placeholder="-----" />
                            </div>
                            <div className="col-1">
                                <button className="btn btn-danger btn-sm" onClick={() => removeRow(index)}>−</button>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="mb-3 row align-items-center">
                    <label className="col-sm-2 col-form-label fw-bold">REMARKS</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" placeholder="-----" />
                    </div>
                </div>

                <div className="row mt-5">
                    {/* Prep By */}
                    <div className="col-md-2">
                        <label className="fw-bold">PREP BY</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <label className="fw-bold">DATE</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <button className="btn btn-danger w-100">SEND FOR CHK</button>
                    </div>

                    {/* CHK By */}
                    <div className="col-md-2">
                        <label className="fw-bold">CHK BY</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <label className="fw-bold">DATE</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <button className="btn btn-danger w-100">SEND FOR APP</button>
                    </div>

                    {/* Approved By */}
                    <div className="col-md-2">
                        <label className="fw-bold">APPROVED BY</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <label className="fw-bold">DATE</label>
                        <input type="text" className="form-control mb-3" placeholder="-----" />
                        <button className="btn btn-danger w-100">APPROVE</button>
                    </div>
                    <div className='col-md-3'></div>
                    {/* Building Info */}
                    <div className="col-md-2 text-center">
                        <label className="fw-bold">BUILDING ID</label>
                        <div className="border p-2 mb-3">-----</div>
                        <label className="fw-bold ">BUILDING NAME</label>
                        <div className="border p-2">-----</div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="row my-4 text-center">
                    <div className="col">
                        <button className="btn btn-danger me-2">DELETE</button>
                        <button className="btn btn-danger me-2">CANCEL</button>
                        <button className="btn btn-danger">SAVE</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ui