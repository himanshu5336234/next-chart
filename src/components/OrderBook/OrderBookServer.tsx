import { getOrderBook } from "@/services/api-service/Apis";
import React from "react";
import OrderBook from "./OrderBook";

type Props = {};

function OrderBookServer({ orderBook }: any) {
    console.log(orderBook);
    return <>
        <OrderBook orderBook={orderBook} />
    </>
}

export default OrderBookServer;
export async function getServerSideProps({ query: { symbol } }: any) {
    try {
        const orderBookResponse = await getOrderBook(symbol);
        const { data: orderBook } = orderBookResponse;
        const asks = addTotalSums(
            findAndDelete(orderBook.asks, orderBook.asks, "ASKS")
        );
        const bids = addTotalSums(
            findAndDelete(orderBook.bids, orderBook.bids, "BIDS")
        );
        return { props: { symbol, orderBook: { ...orderBook, asks, bids } } };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { props: { data: null, error: "Failed to fetch data" } };
    }
}
function findAndDelete(currentLevels: any, orders: any, type: string) {
    if (currentLevels) {
        const index =
            type === "BIDS"
                ? currentLevels.findIndex(
                    (item: any[]) =>
                        Number(item[0]) <= Number(orders[orders.length - 1][0])
                )
                : currentLevels.findIndex(
                    (item: any[]) =>
                        Number(item[0]) >= Number(orders[orders.length - 1][0])
                );
        return orders.concat(currentLevels.slice(index + 1));
    }
}
function addTotalSums(orders: any[]) {
    let sum = 0;
    return orders.map((item) => {
        sum += Number(item[1]);
        item[2] = sum;
        return item;
    });
}
