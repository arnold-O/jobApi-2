module.exports = (fn) => (req, res, next) => {
    // we have rejected and resolve promise
  
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  