import { Button } from "../Button/index"
import { Item } from "../Item/index"
import React from "react"
import "./index.css"

export function OrderPedidos({
    convertTime,
    convertDate,
    order,
    handleServing,
    prepareTime
}) {

    return (
        <div className="kitchen-wrap">
            {order.length > 0 && order.sort((a, b) => a.id - b.id) ? (
                <ul className="ListOfOrders">
                    {order.map((data, index) => {
                        return (
                            <Item className="ordersKitchen" key={index}>
                                <section className="ordered">
                                    <div className="orderWrap">
                                        <div className="headerOrder">
                                            <p className="tableNumber">  Table {data.table} </p>
                                            <p className="customerName"> {data.client_name} </p>
                                            <p>Status: {data.status
                                                .replace('pending', 'Pendente')
                                                .replace('preparing', 'Preparando')
                                                .replace('ready', 'Pronto')
                                                .replace('served', 'Servido')
                                            } </p>
                                            <p className="timeOrder">
                                                Pedido feito em {convertDate(data.createdAt)} às {convertTime(data.createdAt)} </p>
                                        </div>
                                        <h1 className="titleKitchen">ORDERS</h1>

                                        <div className="bodyOrder">
                                            <ul className="productOrder">

                                                {data.Products.map((data, id) => {
                                                    return (
                                                        <ul className="listProductOrder" key={id}>
                                                            <p className="nameItemOrder">{data.name}</p>
                                                            <p className="quantityItem"> Amount: {data.qtd}
                                                                {data.complement !== null ? <p>Extra: {data.complement}</p> : <p>Extra: none</p>}
                                                            </p>
                                                        </ul>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className="statusBtn">
                                            {data.status === 'pending' ?
                                                < p className="orderPending" >
                                                    PENDING
                                                </p>
                                                : data.status === 'preparing' ?
                                                    < p className="orderPreparing" >
                                                        PREPARING
                                                    </p>
                                                    : data.status === 'ready' && localStorage.getItem('role')==='hall' ?
                                                        <Button className="yellowBtn" id="statusOrderToServe" 
                                                            onClick={(e) => handleServing(data, e)}
                                                        > To Serve</Button>
                                                        : data.status ==='ready' && localStorage.getItem('role')==='kitchen' ?
                                                        < p className="orderReady" >
                                                            {data.status.replace('ready', 'PRONTO')}
                                                        </p>:
                                                        
                                                        < p className="orderServed" >
                                                            Order delivered on {prepareTime(data.createdAt, data.updatedAt)} min.
                                                        </p>
                                            }

                                        </div>
                                    </div>

                                </section>
                            </Item>
                        )
                    })
                    }
                </ul>

            ) : null}
        </div >
    )
}