module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
    // catch(next) = ES6 shorthand for catch (err => next(err))
  };
};
