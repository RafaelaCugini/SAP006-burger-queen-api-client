import React, { useState, useEffect } from "react";
import { HeaderKitchen } from '../../components/Header'
import { OrderKitchen } from "../../components/OrderKitchen";
import { convertDate, convertTime, prepareTime } from "../../services/React/auth.js";
import { Background } from "../../services/React/auth.js";
import { LogoutButton } from '../../components/LogoutButton/index'
import '../../components/LogoutButton/index.css';
import "./index.css";


export function Cozinha() {

    const [order, setOrder] = useState([]);
    const userToken = localStorage.getItem('usersToken');
    const api = 'https://lab-api-bq.herokuapp.com/orders/'
    const apiOrders = 'https://lab-api-bq.herokuapp.com/orders';

    const listAllOrders = () => {

        const userToken = localStorage.getItem('usersToken');
        fetch(apiOrders, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `${userToken}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const pendingOrders = data.filter((item) => {
                    return item.status.includes('preparing') || item.status.includes('pending')
                })
                setOrder(pendingOrders)
            });
    }

    useEffect(() => {
        listAllOrders()
    }, [userToken])


    const handlePreparing = (data) => {
        const orderId = data.id;
        const status = { status: 'preparing' };

        fetch(api + orderId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${userToken}`,
            },
            body: JSON.stringify(status),
        }).then((res) => res.json())
            .then(() => {
                listAllOrders()
            })
    }

    const handleFinished = (data) => {
        const orderId = data.id;
        const status = { status: 'ready' }

        fetch(api + orderId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${userToken}`,
            },
            body: JSON.stringify(status),
        }).then((res) => res.json())
            .then(() => {
                listAllOrders()
            })
    }

    Background()
    return (
        < main className="kitchen" >

             <LogoutButton />
            < HeaderKitchen />
            <OrderKitchen
                prepareTime={prepareTime}
                convertTime={convertTime}
                convertDate={convertDate}
                order={order}
                handlePreparing={handlePreparing}
                handleFinished={handleFinished}
            />
        </main >
    )
}