import React, { useEffect, useState } from "react";
import './product-list.scss'

const ProductList =() => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProducts() {
            const response = await fetch("http://localhost:9004/products");
            if(!response.ok) {
                window.alert("Error while fetching products");
            }
            const result = await response.json();
            setProducts(result);
        }
        getProducts();
    }, []);

    async function addToCart(product, ev) {
        ev.preventDefault();
        await fetch("http://localhost:9004/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: product.uniq_id
            }),
        }).catch(err => {
            window.alert(err);
        })
    }
    return (<div className="card-grid">
        {
            products.map((product) => (
                <div key={product._id} className="card">
                    <img src={product.image} alt="image"  style={{width: "100%"}}/>
                    <h1>{product.product_name}</h1>
                    <p className="price">{`$${product.retail_price}`}</p>
                    <p>
                        <button onClick={(ev) => addToCart(product, ev)}>Add to cart</button>
                    </p>
                </div>
            ))
        }
    </div>);
}

export default ProductList;