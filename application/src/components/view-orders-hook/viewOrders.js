import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Template } from '../../components';
import { fetchOrders } from '../../redux';
import OrdersList from './ordersList';
import './viewOrders.css';

export default function ViewOrders(props) {
    const [render, setRender] = useState(false);
    const orders = useSelector(state => state.orderReducer.orders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
        setRender(false);
    }, [render])

    return (
        <Template>
            {orders.length == 0 ? (
                <div className="empty-orders">
                    <h2>There are no orders to display</h2>
                </div>
            ) : (
                <div className="container-fluid">
                    {orders.map(order => (
                        <OrdersList key={order._id} order={order} setRender={setRender} />
                    ))}
                </div>
            )}
        </Template>
    );
}