const discountCtrl = require('../../../services/discount-service');
const { schemaTypes } = require('../../../lib');

const swaggerTag = 'Discount Service';

module.exports = (fastify, options, next) => {
  fastify.post('/discount', {
    schema: {
      description: 'Create discount',
      tags: [swaggerTag],
      body: {
        type: 'object',
        required: ['amount', 'count'],
        properties: {
          amount: schemaTypes.number,
          count: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            code: schemaTypes.string,
          },
        },
      },
    },
  }, discountCtrl.create);

  fastify.put('/discount/:code', {
    schema: {
      description: 'Update discount',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['code'],
        properties: {
          code: schemaTypes.string,
        },
      },
      body: {
        type: 'object',
        required: ['count'],
        properties: {
          amount: schemaTypes.number,
          count: schemaTypes.number,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        ...schemaTypes.swagger204,
      },
    },
  }, discountCtrl.update);

  fastify.get('/discount/decrement/:code', {
    schema: {
      description: 'Decrement discount count',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['code'],
        properties: {
          code: schemaTypes.string,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            amount: schemaTypes.number,
            count: schemaTypes.number,
          },
        },
      },
    },
  }, discountCtrl.decrement);

  fastify.delete('/discount/:code', {
    schema: {
      description: 'Delete discount',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['code'],
        properties: {
          code: schemaTypes.string,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        ...schemaTypes.swagger204,
      },
    },
  }, discountCtrl.remove);

  fastify.get('/discount/:code', {
    schema: {
      description: 'Inquiry discount based on code',
      tags: [swaggerTag],
      params: {
        type: 'object',
        required: ['code'],
        properties: {
          code: schemaTypes.string,
        },
      },
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'object',
          properties: {
            code: schemaTypes.string,
            count: schemaTypes.number,
            createdts: schemaTypes.utcdatetime,
            updatedts: schemaTypes.utcdatetime,
          },
        },
      },
    },
  }, discountCtrl.find);

  fastify.get('/discounts', {
    schema: {
      description: 'Inquiry discounts',
      tags: [swaggerTag],
      response: {
        ...schemaTypes.swaggerErrorTypes,
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              code: schemaTypes.string,
              count: schemaTypes.number,
              createdts: schemaTypes.utcdatetime,
              updatedts: schemaTypes.utcdatetime,
            },
          },
        },
      },
    },
  }, discountCtrl.query);

  next();
};
