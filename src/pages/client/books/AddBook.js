import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function AddBook() {
    const {branchId} = useParams();
    const navigate = useNavigate();
    const {addBooks} = useOutletContext();

    const [bookName, setBookName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [className, setClassName] = useState("");
    const [subject, setSubject] = useState("");
    const [mrp, setMrp] = useState("");
    const [purchasePrice, setPurchasePrice] = useState("");
    const [sellPrice, setSellPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        addBooks({
            bookName,
            publisherName,
            className,
            subject,
            mrp: Number(mrp),
            purchasePrice: Number(purchasePrice),
            sellPrice: Number(sellPrice),
            quantity: Number(quantity)
        });

        navigate(`/api/branches/${branchId}/books`);
    };

    return (
        <div className="card">
            <div className="card-header">
                <h5>Add Book</h5>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label>Book Name</label>
                            <input
                                className="form-control"
                                value={bookName}
                                onChange={(e) => setBookName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Publisher Name</label>
                            <input
                                className="form-control"
                                value={publisherName}
                                onChange={(e) => setPublisherName(e.target.value)}
                                required
                            />
                        </div>


                        <div className="col-md-4 mb-3">
                            <label>Class</label>
                            <input 
                                className="form-control"
                                value={className}
                                onChange={(e)=>setClassName(e.target.value)}
                                required
                                />
                            
                        </div>

                        <div className="col-md-6 mb-3">
                            <label>Subject</label>
                            <input
                                className="form-control"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                         <div className="col-md-6 mb-3">
                            <label>MRP</label>
                            <input
                                className="form-control"
                                value={mrp}
                                onChange={(e) => setMrp(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label>Purchased Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={purchasePrice}
                                onChange={(e) => setPurchasePrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label>Sell Price</label>
                            <input
                                type="number"
                                className="form-control"
                                value={sellPrice}
                                onChange={(e) => setSellPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label>Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                    </div>

                    <button className="btn btn-success">Save Book</button>
                </form>
            </div>
        </div>
    );
}

export default AddBook;
