/** @format */

// [2,3,4,56] .includes(1)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userDetail.role)) {
      return res
        .status(403)
        .json("user does have the access to use this page or forbidden page");
    }
    next();
  };
};
