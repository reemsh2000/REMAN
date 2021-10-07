import React, { useEffect, useState } from "react";
import Img from "../common/Img";
import { Rate, InputNumber, Button } from "antd";
import ProductCard from '../Card/ProductCard';
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./style.css";

function ProductComponent({product, relatedProducts}){

    let history = useHistory();

    const [qunatity, setQunatity] = useState(1);

    function onChangeNumber(value){
        setQunatity(value);
    }

    function addToCart(){
        axios.post('/cart',{
            body : { 
                product_id : product.id,
                qunatity
            }
        }).then((res) => {
            console.log(res);
        })
        .catch((err) => {
            if(err.response.status == 401){
                history.push('/login');
            }
        });
    }

    return (
    <div className="product-container">
        <div className="product">
            <div className="product-image">
                <Img src={product.image} />
            </div>
            <div className="product-details">
                <h2>{product.name}</h2>
                {console.log(product.rate)}
                <Rate allowClear={false} defaultValue={product.rate} />
                <p className="price" style={{color: '#BA933E'}}>$ {product.price}</p>
                <div className="details">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis vel sint molestias suscipit saepe consequuntur eveniet. Amet magnam voluptatum, tempora, ut facilis voluptas saepe officia repellendus reiciendis, voluptates reprehenderit in?</p>
                </div>
                <div>
                    <InputNumber min={1} max={10} defaultValue={qunatity} onChange={onChangeNumber} />
                    <Button type="primary" size="middle" block={true} onClick={addToCart}>Add To Cart</Button>
                </div>
            </div>
        </div>
        <div className="realated-products">
            <h1>Related Products</h1>
            <div className="cards">
                {relatedProducts && relatedProducts.map((product) => <ProductCard key={product.id} card={product} style={{width : '20%'}} />)}
            </div>
        </div>
    </div>
    );
}

export default ProductComponent;