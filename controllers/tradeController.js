const Portfolio = require('../db/models/portfolio.model');
const Stock = require('../db/models/stock.model');
const Trade = require('../db/models/trade.model');

const { v4: uuidv4 } = require('uuid');


const addTrade = async (req, res) => {
    try {
        const { username, stockId, type, quantity, price, date } = req.body;

        const stock = await Stock.findOne({ stockId: stockId });
        if (!stock) {
            return res.status(404).json({ success: false, data: 'Stock not found' });
        }

        const portfolio = await Portfolio.findOne({ user: username })

        if (!portfolio && portfolio?.user != username) {
            return res.status(404).json({ success: false, data: 'Username not found' });
        }

        const transactionId = uuidv4();

        const trade = new Trade({
            stock: stock._id,
            type,
            quantity,
            price,
            date,
            username,
            transactionId
        });

        await trade.save();

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

        const responseData = {
            success: true,
            data: {
                transactionId: transactionId
            }
        };

        res.status(201).json(responseData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, data: 'Failed to add trade' });
    }
};


const removeTrade = async (req, res) => {
    try {
        const { transactionId } = req.body;

        if (!transactionId) {
            return res.status(400).send('Transaction ID is required');
        }

        const removedTrade = await Trade.findOneAndDelete({ transactionId });

        if (!removedTrade) {
            return res.status(404).send('Trade not found');
        }

        res.status(200).send({ success: true, data: "Trade removed" });
    } catch (err) {
        res.status(400).send(err.message);
    }
};


// will use remove + add from above
const updateTrade = async (req, res) => {
    try {
        const { transactionId, price, quantity } = req.body;

        if (!transactionId || (price === undefined && quantity === undefined)) {
            return res.status(400).send('Transaction ID and either price or quantity are required');
        }

        const tradeToUpdate = await Trade.findOne({ transactionId });

        if (!tradeToUpdate) {
            return res.status(404).send('Trade not found');
        }

        const newTransactionId = uuidv4();

        tradeToUpdate.transactionId = newTransactionId;
        tradeToUpdate.price = price || tradeToUpdate.price;
        tradeToUpdate.quantity = quantity || tradeToUpdate.quantity;

        await tradeToUpdate.save();

        res.status(200).send({ success: true, data: { transactionId: newTransactionId } });

    } catch (err) {
        res.status(400).send(err.message);
    }
};


module.exports = {
    addTrade,
    updateTrade,
    removeTrade
};