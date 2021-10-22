const { generate } = require('generate-password');

const model = require('./model');
const customErrors = require('../../custom-errors');

const codeGenerator = (length) => {
  const code = generate({ length, numbers: true });
  return code;
};

const find = async (code) => {
  const discount = await model.find(code);
  return discount;
};

const create = async (code, amount, count) => {
  const charge = await find(code);

  if (charge && !charge.count) {
    await model.update(code, count);
  } else {
    await model.create(code, amount, count);
  }

  return code;
};

const update = async (code, amount, count) => {
  const discount = await find(code);
  if (!discount) throw new customErrors.DiscountNotFoundError();

  if (count) discount.count = count;
  if (amount) discount.amount = amount;

  const result = await model.update(code, discount);
  return result;
};

const decrement = async (code) => {
  let result = null;

  const discount = await find(code);
  if (!discount) throw new customErrors.DiscountNotFoundError();

  if (discount.count > 0) {
    discount.count -= 1;
    result = await model.update(code, discount);
  }

  if (!result) throw new customErrors.RejectError();
  return discount;
};

const remove = async (code) => {
  const discount = await find(code);
  if (!discount) throw new customErrors.DiscountNotFoundError();

  const result = await model.remove(discount);
  return result;
};

const query = async () => {
  const discounts = await model.query();
  return discounts || [];
};

module.exports = {
  codeGenerator,
  find,
  create,
  update,
  decrement,
  remove,
  query,
};
