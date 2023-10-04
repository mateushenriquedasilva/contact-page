"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// default router
router.get('/', (request, response) => {
    return response.send('Hello World!');
});
exports.default = router;
