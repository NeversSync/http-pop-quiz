const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../lib/app');


describe('app', () => {

  const request = chai.request(app);

  it('sends cat object at /cat', () => {
    return request.get('/cat')
      .then(res => {
        assert.deepEqual(JSON.parse(res.text), `{ name: 'super cat', type: 'top secret' }`);
      });
  });

  it('serves cat html for other get', () => {
    request
      .get('/')
      .then(res => {
        assert.equal(res.text, '<h1>Super Cat FTW!</h1>');
      });
  });

  it('returns 404 for not GET', () => {
    return request.post('/')
    .then(() => {
      throw new Error('should not succeed, 404 expected');
    }, res => {
      assert.equal(res.status, 404);
      // assert.equal(res.text, '<h1>please cat</h1>');
    });
  });

});