
const relatedProducts = ({url}) => {

    return (
        <>
            <div className="col-md-3">
                <div className="card text-center">
                    <img className="img-fluid" src={url} alt="" />
                    <div className="card-body">
                        <h5 className="card-title">Small Body</h5>
                        <p className="card-text">Excepteur sint occaecat cupidatat non.</p>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-4">
                            <p className="card-amt">N1000</p>
                            <div className="d-flex">
                                <p className="product-qty">Quantity</p>
                                <input type='number' pattern='[0-9]{0,5}' />
                            </div>
                        </div>
                        <button className="btn w-100">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default relatedProducts;