
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderBook from "./OrderBook";

function OrderBookServer({symbol  }: any) {
    const [orderBook, setOrderBook] = useState([]);
    const [error, setError] = useState(null);
    const fetchOrderBook = async () => {
        try {
            const response = await axios.get(`/api/orderbook?symbol=${symbol}`);
            setOrderBook(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchOrderBook()
    }, [symbol]);

    return <>
        <OrderBook symbol={symbol} orderBook={orderBook} />
    </>
}

export default OrderBookServer;
