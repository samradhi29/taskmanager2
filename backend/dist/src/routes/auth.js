"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/auth.ts
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
//POST /api/auth/register 
router.post('/register', auth_1.register); // register is typed in controller
//POST /api/auth/login
router.post('/login', auth_1.login); // login is typed in controller
exports.default = router;
