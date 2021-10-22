const service = require('./service');
const config = require('../../config');

const create = async (req, res) => {
  const { amount, count } = req.body;
  const code = service.codeGenerator(config.codeLength);

  const result = await service.create(code, amount, count);

  res.code(200).send({ code: result });
};

const update = async (req, res) => {
  const { code } = req.params;
  const { amount, count } = req.body;

  await service.update(code, amount, count);
  return res.code(204).send('');
};

const decrement = async (req, res) => {
  const { code } = req.params;

  const discount = await service.decrement(code);

  return res.code(200).send({ amount: discount.amount, count: discount.count });
};

const remove = async (req, res) => {
  const { code } = req.params;

  await service.remove(code);
  return res.code(204).send('');
};

const find = async (req, res) => {
  const { code } = req.params;

  const discount = await service.find(code);

  return res.send(discount);
};

const query = async (req, res) => {
  const discounts = await service.query();

  return res.send(discounts);
};

module.exports = {
  create,
  update,
  decrement,
  remove,
  find,
  query,
};
