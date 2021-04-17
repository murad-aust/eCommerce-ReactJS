import React from 'react';
import volunteerList from '../../Data/volunteerList';

const Inventory = () => {
    const handleAddProduct = () => {
        //const product = {};
        fetch('https://vast-everglades-99409.herokuapp.com/addBulkEvent',{
            method: 'POST',
            headers: {'content-type': 'application/json'},
            //body: JSON.stringify(product)
             body: JSON.stringify(volunteerList )
        } )
        
       
    }

    return (
        <div>
           <form action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>price: </span><input type="text"/></p>
                <p><span>Quantity:</span><input type="text"/></p>
                <p><span>Product Image</span><input type="file"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;