const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Portfolio = require('../../db/models/portfolio.model');
const Stock = require('../../db/models/stock.model');
const Trade = require('../../db/models/trade.model');
const portfolioController = require('../../controllers/portfolioController');

chai.use(require('chai-http'));
const expect = chai.expect;

describe('Portfolio Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getPortfolio', () => {
    it('should return a user portfolio', async () => {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      const next = sinon.spy();
    
      sinon.stub(Portfolio, 'find').resolves([{ user: 'testUser', toJSON: () => ({ user: 'testUser' }) }]);
      sinon.stub(Stock, 'find').resolves([{ _id: new mongoose.Types.ObjectId(), stockId: 'AAPL', stockName: 'Apple' }]);
      sinon.stub(Trade, 'aggregate').resolves([]);
    
      await portfolioController.getPortfolio(req, res, next);
    
      expect(res.status.calledWith(200)).to.be.true;
    
      const jsonArg = res.json.getCall(0).args[0];
    
      expect(jsonArg).to.deep.equal({
        success: true,
        data: [{
          username: 'testUser',
          stocks: [],
          portfolioDetails: { total_stocks: 0 }
        }]
      });
    });
  });
});
