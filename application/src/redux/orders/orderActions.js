import axios from "axios";
import { SERVER_IP } from "../../private";
import {
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_FAILURE,
} from "./orderTypes";


export const fetchOrdersSuccess = (orders) => {
    return {
        type: FETCH_ORDERS_SUCCESS,
        payload: orders,
    };
};

export const fetchOrdersFailure = (error) => {
    return {
        type: FETCH_ORDERS_FAILURE,
        payload: error,
    };
};

export const fetchOrders = () => {
    return (dispatch) => {
        axios
            .get(`${SERVER_IP}/api/current-orders`)
            .then((res) => {
                dispatch(fetchOrdersSuccess(res.data.orders));
            })
            .catch((error) => dispatch(fetchOrdersFailure(error.message)));
    };
};

export const addOrder = (orderItem, quantity, auth) => {
    return (dispatch) => {
        let data = JSON.stringify({
            order_item: orderItem,
            quantity,
            ordered_by: auth.email,
        })
        axios.post(`${SERVER_IP}/api/add-order`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => console.log("Success", response))
            .catch((error) => dispatch(fetchOrdersFailure(error.message)));
    };
};

export const editOrder = (id, orderItem, quantity, auth) => {
    return (dispatch) => {
        let data = JSON.stringify({
            id: id,
            order_item: orderItem,
            quantity: quantity,
            ordered_by: auth.email,
        })
        axios.post(`${SERVER_IP}/api/edit-order`,data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => console.log("Success", response))
            .catch((error) => dispatch(fetchOrdersFailure(error.message)));
    };
};

export const deleteOrder = (id) => {
    return (dispatch) => {
        let data = JSON.stringify({
            id
        })
        axios.post(`${SERVER_IP}/api/delete-order`,data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => console.log("Success", response))
            .catch((error) => dispatch(fetchOrdersFailure(error.message)));
    };
};



