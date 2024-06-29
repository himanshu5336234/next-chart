import { getOrderBook } from "@/services/api-service/Apis";

// API endpoint to fetch order book data
export default async function handler(req: { query: { symbol: any}; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: string; }): void; new(): any; }; }; }) {
    const { symbol } = req.query;
    
    // Error handling for missing symbol query parameter
    if (!symbol) {
        return res.status(400).json({ error: "Symbol query parameter is required" });
    }

    try {
        // Fetch order book data from external service
        const orderBookResponse = await getOrderBook(symbol);
        const { data: orderBook } = orderBookResponse;

        // Process the order book data
        const asks = addTotalSums(findAndDelete(orderBook.asks, orderBook.asks, "ASKS"));
        const bids = addTotalSums(findAndDelete(orderBook.bids, orderBook.bids, "BIDS"));

        // Respond with the processed order book data
        res.status(200).json({ ...orderBook, asks, bids });
    } catch (error) {
        // Error handling for failed data fetching
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}

// Helper function to filter and combine order book levels
 export function findAndDelete(currentLevels: any, orders: any, type: string) {
    if (currentLevels) {
        const index = type === "BIDS"
            ? currentLevels.findIndex(
                (item: any) => Number(item[0]) <= Number(orders[orders.length - 1][0])
              )
            : currentLevels.findIndex(
                (item:any) => Number(item[0]) >= Number(orders[orders.length - 1][0])
              );
        return orders.concat(currentLevels.slice(index + 1));
    }
}

// Helper function to add cumulative sums to order book levels
 export function addTotalSums(orders: any[]) {
    let sum = 0;
    return orders.map((item) => {
        sum += Number(item[1]);
        item[2] = sum;
        return item;
    });
}
