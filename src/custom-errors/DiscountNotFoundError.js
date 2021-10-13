class DiscountNotFoundError extends Error {
  constructor(code, message) {
    super('Discount not found');
    this.code = 1003;
    if (code) this.originCode = code;
    if (message) this.originMessage = message;
  }
}

module.exports = DiscountNotFoundError;
