const { db } = require('../../database');

const create = async (code, count) => {
  await db.collection('discount').insertOne({
    code,
    count,
    createdts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
    updatedts: new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString(),
  });

  return true;
};

const find = async (code) => {
  let discount;

  try {
    discount = await db.collection('discount').findOne({ code }, { projection: { _id: 0 } });
  } catch (err) {
    discount = null;
  }

  return discount;
};

const query = async () => {
  let discount = null;

  try {
    discount = await db.collection('discount').find({}).toArray();
  } catch (err) {
    console.log(err);
    discount = null;
  }

  return discount;
};

const update = async (code, discount) => {
  const now = new Date(new Date() - new Date().getTimezoneOffset() * 60000).toISOString();

  const result = await db.collection('discount').updateOne({ code },
    {
      $set:
      {
        count: discount.count,
        updatedts: now,
      },
    }, { upsert: true });

  return result;
};

const remove = async (discount) => {
  await db.collection('discount').deleteOne({ code: discount.code });
  return true;
};

module.exports = {
  create,
  find,
  query,
  update,
  remove,
};
