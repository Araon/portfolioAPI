const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  stocks: [{
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock'
    },
    trades: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trade'
    }]
  }]
});

portfolioSchema.methods.getHoldings = function() {
  const holdings = {};
  this.stocks.forEach(stock => {
    const buys = stock.trades.filter(trade => trade.type === 'buy');
    const sells = stock.trades.filter(trade => trade.type === 'sell');
    const quantity = buys.reduce((total, trade) => total + trade.quantity, 0) - sells.reduce((total, trade) => total + trade.quantity, 0);
    const avgPrice = buys.reduce((total, trade) => total + trade.price * trade.quantity, 0) / buys.reduce((total, trade) => total + trade.quantity, 0);
    holdings[stock.stock.id] = { quantity, avgPrice };
  });
  return holdings;
};

portfolioSchema.methods.getReturns = function() {
  const holdings = this.getHoldings();
  const initialValue = this.stocks.reduce((total, stock) => total + stock.trades.reduce((total, trade) => total + trade.price * trade.quantity, 0), 0);
  const currentValue = Object.values(holdings).reduce((total, holding) => total + holding.quantity * 100, 0); // assuming current price is 100 for simplicity
  const returnPercentage = ((currentValue - initialValue) / initialValue) * 100;
  return returnPercentage;
};

module.exports = mongoose.model('Portfolio', portfolioSchema);
