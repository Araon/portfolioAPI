const Portfolio = require('../db/models/portfolio.model');
const Stock = require('../db/models/stock.model');
const Trade = require('../db/models/trade.model');


const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({});
        const stocks = await Stock.find({});
        const trades = await Trade.find({});

        const data = {
            stocks: stocks.map(stock => {
                return {
                    id: stock.id,
                    trades: trades.filter(trade => trade.stock.toString() === stock._id.toString())
                };
            }),
            portfolio: {
                total_stocks: stocks.length,
                // below are two metrics that can be derived from the stocks and trades made in a given time span, for now using dummy data
                overall_performance: "positive", // these are dummy data
                cumulative_return: 25.5 // these are dummy data
            }
        };

        data.portfolio = portfolio

        res.status(200).json({ success: true, data: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to retrieve portfolio' });
    }
};



module.exports = {
    getPortfolio,
};