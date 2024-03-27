const Portfolio = require('../db/models/portfolio.model');
const Stock = require('../db/models/stock.model');
const Trade = require('../db/models/trade.model');


const calculateHoldings = (trades) => {
    let netQuantity = 0;
    let totalBuyCost = 0;

    trades.forEach(trade => {
        if (trade.type === 'buy') {
            netQuantity += trade.quantity;
            totalBuyCost += trade.quantity * trade.price;
        } else if (trade.type === 'sell') {
            netQuantity -= trade.quantity;
        }
    });

    return {
        quantity: netQuantity,
        avgBuyPrice: netQuantity > 0 ? totalBuyCost / netQuantity : 0
    };
};

const calculateReturns = (trades, currentPrice) => {
    let totalCost = 0;
    let totalQuantity = 0;

    trades.forEach(trade => {
        if (trade.type === 'buy') {
            totalCost += trade.quantity * trade.price;
            totalQuantity += trade.quantity;
        } else if (trade.type === 'sell') {
            totalQuantity -= trade.quantity;
        }
    });

    if (totalQuantity === 0) {
        return 0;
    }

    const avgCost = totalCost / totalQuantity;
    const returnPercentage = ((currentPrice - avgCost) / avgCost) * 100;

    return returnPercentage;
};


const getPortfolio = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({});

        if (!portfolios || portfolios.length === 0) {
            return res.status(404).json({ success: false, data: 'Portfolio not found' });
        }

        const stocks = await Stock.find({});

        const dataArray = [];

        for (const portfolio of portfolios) {
            const data = {
                username: portfolio.toJSON().user,
                stocks: []
            };

            for (const stock of stocks) {

                const stockTrades = await Trade.aggregate([
                    {
                        $match: { stock: stock._id }
                    }
                ]);


                if (stockTrades.length > 0) {
                    data.stocks.push({
                        id: stock.stockId,
                        name: stock.stockName,
                        trades: [],
                        holdings: calculateHoldings(stockTrades)
                    });

                    stockTrades.forEach(trade => {
                        data.stocks[data.stocks.length - 1].trades.push({
                            date: trade.date,
                            type: trade.type,
                            quantity: trade.quantity,
                            price: trade.price
                        });

                    });
                }
            }

            data.portfolioDetails = {
                total_stocks: data.stocks.length
            };
            dataArray.push(data);
        }

        res.status(200).json({ success: true, data: dataArray });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to retrieve portfolio' });
    }
};


const getHoldings = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        const holdings = [];

        for (const stock of stocks) {
            const stockTrades = await Trade.aggregate([
                {
                    $match: { stock: stock._id }
                }
            ]);

            if (stockTrades.length > 0) {
                holdings.push({
                    id: stock.stockId,
                    name: stock.stockName,
                    holdings: calculateHoldings(stockTrades)
                });
            }
        }

        res.status(200).json({ success: true, data: holdings });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to retrieve holdings' });
    }
};

const getReturns = async (req, res) => {
    try {
        const stocks = await Stock.find({});

        const returns = [];

        for (const stock of stocks) {
            const stockTrades = await Trade.aggregate([
                {
                    $match: { stock: stock._id }
                }
            ]);

            if (stockTrades.length > 0) {
                const cumulativeReturn = calculateReturns(stockTrades, 100); // assuming current price to be 100
                returns.push({
                    id: stock.stockId,
                    name: stock.stockName,
                    cumulativeReturn: cumulativeReturn.toFixed(2)
                });
            }
        }

        res.status(200).json({ success: true, data: returns });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to retrieve returns' });
    }
};



module.exports = {
    getPortfolio,
    getHoldings,
    getReturns
};