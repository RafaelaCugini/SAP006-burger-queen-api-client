import React from "react";
import { useState } from 'react';
import "./index.css";
import "./responsive.css";
import { Input } from "../Input";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { useHistory } from "react-router";

export function Orders({
    children,
    orders,
    cancelOrder,
    priceTotal,
    orderHidden
}) {
    const userToken = localStorage.getItem('usersToken');
    const [Customer, setCustomer] = useState('');
    const [Table, setTable] = useState('');
    const [modalCancel, setModalCancel] = useState(false);
    const [modalOrder, setModalOrder] = useState(false);

    function cancelCustomer() {
        setTable([]);
        setCustomer([]);
        cancelOrder([])
        setModalCancel(false)
    }

    const history = useHistory()
    function navigateToOrders() {
        history.push('/pedidos');
    }

    function createOrder() {
        const Products = orders.map((data) => ({
            "id": data.id,
            "qtd": data.qtd,
        })
        )

        fetch('https://lab-api-bq.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${userToken}`
            },
            body: JSON.stringify({
                "client": Customer,
                "table": Table,
                "products": Products,
            })
        }).then(() => {
            setModalOrder(true)
        })
    }

    return (
        <div className="orders">
            <div className="alignCloseOrders">
                <Button className="closeOrders" onClick={() => orderHidden(false)}>X</Button>
            </div>
            <h1 className="ordersH1">ORDERS</h1>
            <div className="divOrderSummary">
                {children}
            </div>
            <div className="nameTable">
                <div className="nameCustomer">
                    <p className="clientInfo">Name: </p>
                    <Input type="name" inputClass="inputCustomer" value={Customer}
                        onChange={e => setCustomer(e.target.value)}></Input>
                </div>
                <div className="tableCustomer">
                    <p className="clientInfo">Table: </p>
                    <Input type="number" inputClass="inputTable" min="1" max="15" value={Table}
                        onChange={e => setTable(e.target.value)} ></Input>
                </div>
            </div>
            <div className="finishOrder">
                <p className="total">TOTAL: R$ {priceTotal},00</p>
                <Button type="button" className="sendOrder" onClick={createOrder}>FAZER PEDIDO</Button>
                {modalOrder ? <Modal>
                    <div className="modalCancel">
                        <h1 className="h1ModalOrder">Completed order.</h1>
                        <Button className="btnModalOrder" type="button"
                            onClick={navigateToOrders}>GO TO ORDERS</Button>
                        <Button className="btnModalOrder"
                            onClick={() => setModalOrder(false, cancelCustomer())}>STAY ON THE MENU</Button>
                    </div>
                </Modal> : null}
                <Button type="button" className="cancelOrder" onClick={() => setModalCancel(true)}>CANCEL ORDER</Button>
                {modalCancel ? <Modal>
                    <div className="modalCancel">
                        <h1 className="h1ModalCancel">Are you sure you want to cancel your order?</h1>
                        <div className="cancelItemModal">
                            <Button className="cancelModal" type="button"
                                onClick={cancelCustomer}>CANCEL</Button>
                            <Button className="cancelModal"
                                onClick={() => setModalCancel(false)}>BACK</Button>
                        </div>
                    </div>
                </Modal> : null}
            </div>
        </div >

    )
}