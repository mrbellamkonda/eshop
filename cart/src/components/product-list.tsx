import React, { useEffect, useState } from "react";
import './product-list.scss'

const ProductList =() => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch("http://localhost:9004/cart/products");
            if(!response.ok) {
                window.alert("Error while fetching cart items");
            }
            const result = await response.json();
            setProducts(result);
        }
        getProducts();
    }, []);

    return (<div className="card-grid">
        {
            products.map((product) => (
                <div key={product._id} className="card">
                    <img src={product.image} alt="image"  style={{width: "100%"}}/>
                    <h1>{product.product_name}</h1>
                    <h2>Quantity: {product.quantity} </h2>
                    <p className="price">{`$${product.retail_price * product.quantity}`}</p>
                </div>
            ))
        }
    </div>);
}

export default ProductList;