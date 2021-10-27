import React, { useState, useEffect } from "react";
import { OrderPedidos } from "../../components/OrderPedidos";
import { Button } from "../../components/Button";
import { HeaderPedidos } from "../../components/Header";
import { convertTime, convertDate, prepareTime } from "../../services/React/auth";
import { Background } from "../../services/React/auth";
import { LogoutButton } from "../../components/LogoutButton/index";
import '../../components/LogoutButton/index.css';
import './index.css';
import './responsive.css';

export function Pedidos() {

    const [order, setOrder] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [preparingOrders, setPreparingOrders] = useState([]);
    const [readyOrders, setReadyOrders] = useState([]);
    const [servedOrders, setServedOrders] = useState([]);
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
                    return item.status.includes('pending')
                })
                setPendingOrders(pendingOrders)
                const preparingOrders = data.filter((item) => {
                    return item.status.includes('preparing')
                })
                setPreparingOrders(preparingOrders)
                const readyOrders = data.filter((item) => {
                    return item.status.includes('ready')
                })
                setReadyOrders(readyOrders)
                const servedOrders = data.filter((item) => {
                    return item.status.includes('served')
                })
                setServedOrders(servedOrders)
            });
    }
    useEffect(() => {
        listAllOrders()
    }, [userToken])

    const handleServing = (data) => {
        const orderId = data.id;
        const status = { status: 'served' };

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
        <main className="mainAttendance">

            <LogoutButton />
            <HeaderPedidos />
            <div className="btn-menu">
                <div className="types">
                    <div className="item">
                        <Button
                            className="categoriesBtn"
                            id="breakfast"
                            onClick={() => {
                                setOrder(pendingOrders)
                            }}>
                            Sent
                        </Button>
                        <Button
                            className="categoriesBtn"
                            id="burgers"
                            onClick={() => {
                                setOrder(preparingOrders)
                            }}>
                            In progress
                        </Button>
                    </div>
                    <div className="items">
                        <Button
                            className="categoriesBtn"
                            id="accompaniments"
                            onClick={() => {
                                setOrder(readyOrders)
                            }}
                        >
                            Ready to go
                        </Button>
                        <Button
                            className="categoriesBtn"
                            id="drinks"
                            onClick={() => {
                                setOrder(servedOrders)
                            }}>
                            Your order history
                        </Button>
                    </div>
                </div>
            </div>
            <OrderPedidos
                prepareTime={prepareTime}
                convertTime={convertTime}
                convertDate={convertDate}
                order={order}
                handleServing={handleServing}
            />
        </main>
    )
}