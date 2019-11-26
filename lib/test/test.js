"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const user_1 = require("../user");
describe('Users', () => {
    it('Test that user returned from userById() should be a <User> ', () => {
        assert_1.default.equal(user_1.usersList(), Array());
    });
});
