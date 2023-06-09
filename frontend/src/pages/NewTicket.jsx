import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productTypes } from "../constants";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isError) toast.error(message);

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Customer Name</label>
            <input
              type='text'
              className='form-cotrol'
              value={name}
              disabled
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Customer Email</label>
            <input
              type='text'
              className='form-cotrol'
              value={email}
              disabled
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              {productTypes.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Issue Description</label>
            <textarea
              name='description'
              id='description'
              className='form-control'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
