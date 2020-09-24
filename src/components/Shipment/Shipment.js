import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { UserContext } from '../../App';


const Shipment = () => {
    const [loggedInUser, setLoggedInUser]= useContext(UserContext);

    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log("Form Submitted",data);}
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
 
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    
       
        <input name="name" defaultValue={loggedInUser.name} placeholder="Your Name" ref={register({ required: true })} />
        {errors.name && <span className="error">This field is required</span>}

        <input name="email" defaultValue={loggedInUser.email} placeholder="Your Email" ref={register({ required: true })} />
        {errors.email && <span className="error">This field is required</span>}

        <input name="address" placeholder="Your Address" ref={register({ required: true })} />
        {errors.address && <span className="error">This field is required</span>}

        <input name="phone" placeholder="Your Phone Number" ref={register({ required: true })} />
        {errors.phone && <span className="error">This field is required</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;