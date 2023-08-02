module.exports = function sendResponse({ res, code, status, data = {}, msg, errors = [] }) {
    return res.status(code).send({ status: status, data: data, message: msg, errors: errors });
};
