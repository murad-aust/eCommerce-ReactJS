import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productkey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
      fetch('https://vast-everglades-99409.herokuapp.com/product/'+ productkey)
      .then(res =>res.json())
      .then(data =>setProduct(data))

    },[productkey]);
    //const product = fakeData.find(pd => pd.key === productkey);
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;