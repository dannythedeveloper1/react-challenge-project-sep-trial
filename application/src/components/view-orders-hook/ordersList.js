import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, editOrder } from '../../redux';

const OrdersList = (props) => {
    const { order } = props;
    const [orderItem, setOrderItem] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [edit, setEdit] = useState(false);
    const menuItemChosen = (event) => setOrderItem(event.target.value);
    const menuQuantityChosen = (event) => setQuantity(event.target.value);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const addZero = (num) => {
        num = num.toString();
        return num < 10 ? `0${num}` : num
    }

    const deleteOrders = (id) => {
        dispatch(deleteOrder(id));
        props.setRender(true);
    }

    const editOrders = (id) => {
        dispatch(editOrder(id, orderItem, quantity, auth));
        setEdit(false);
        props.setRender(true);
    }

    const openForm = (id) => {
        if (edit) {
            return (
                <form>
                    <label className="form-label">I'd like to order...</label><br />
                    <select
                        value={orderItem}
                        onChange={(event) => menuItemChosen(event)}
                        className="menu-select"
                    >
                        <option value="" defaultValue disabled hidden>Lunch menu</option>
                        <option value="Soup of the Day">Soup of the Day</option>
                        <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
                        <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
                        <option value="Chili Con Carne">Chili Con Carne</option>
                    </select><br />
                    <label className="qty-label">Qty:</label>
                    <select value={quantity} onChange={(event) => menuQuantityChosen(event)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <button type="button" className="order-btn" onClick={() => editOrders(id)}>Update Order!</button>
                </form>)
        } else return;
    }

    const createdDate = new Date(order.createdAt);
    return (
        <div className="row view-order-container" key={order._id}>
            <div className="col-md-4 view-order-left-col p-3">
                <h2>{order.order_item}</h2>
                <p>Ordered by: {order.ordered_by || ''}</p>
            </div>
            <div className="col-md-4 d-flex view-order-middle-col">
                <p>Order placed at <span id="time_display">{`${addZero(createdDate.getHours())}:${addZero(createdDate.getMinutes())}:${addZero(createdDate.getSeconds())}`}</span></p>
                <p>Quantity: {order.quantity}</p>
            </div>
            <div className="col-md-4 view-order-right-col">
                <button className="btn btn-success" onClick={() => setEdit(true)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteOrders(order._id)}>Delete</button>
            </div>
            {openForm(order._id)}
        </div>
    )
}

export default OrdersList;