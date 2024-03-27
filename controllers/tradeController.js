const Portfolio = require('../db/models/portfolio.model');
const Stock = require('../db/models/stock.model');
const Trade = require('../db/models/trade.model');



const addTrade = async (req, res) => {
    try {
        const { stockId, type, quantity, price, date } = req.body;

        const stock = await Stock.findOne({ id: stockId });
        if (!stock) {
            return res.status(404).json({ success: false, data: 'Stock not found' });
        }

        const trade = new Trade({
            stock: stock._id,
            type,
            quantity,
            price,
            date
        });

        await trade.save();

        const portfolio = await Portfolio.findOne({});
        const stockIndex = portfolio.stocks.findIndex(s => s.stock.toString() === stock._id.toString());

        if (stockIndex === -1) {
            portfolio.stocks.push({
                stock: stock._id,
                trades: [trade._id]
            });
        } else {
            portfolio.stocks[stockIndex].trades.push(trade._id);
        }

        await portfolio.save();

        res.status(201).json({ success: true, data: trade });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to add trade' });
    }
};


const removeTrade = async (req, res) => {
    try {
        console.log(req)
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};

// will use remove + add from above
const updateTrade = async (req, res) => {
    try {
        console.log(req)
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};


module.exports = {
    addTrade,
    updateTrade,
    removeTrade
};