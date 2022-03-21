module.exports = (fun) => {
  return (req, res, next) => {
    // fun(req, res, next).catch(err => next(err));
    fun(req, res, next).catch(next);
  };
};
