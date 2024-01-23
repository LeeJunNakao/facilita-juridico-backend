"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapters_1 = require("../adapters");
const validators_1 = require("../protocols/validators");
const customer_1 = require("../protocols/validators/customer");
class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
    }
    listCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filters = req.query;
                const validatedFilters = yield (0, validators_1.validateDto)(customer_1.FilterCustomerValidator, filters);
                const customers = yield this.customerService.listCustomer(validatedFilters);
                res.status(200).send(customers);
            }
            catch (error) {
                (0, adapters_1.exceptionControllerHandler)(res, error, {
                    status: 400,
                    message: 'Could not find customers ',
                });
            }
        });
    }
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dto = req.body;
                const validatedData = yield (0, validators_1.validateDto)(customer_1.CreateCustomerValidator, dto);
                const customer = yield this.customerService.createCustomer(validatedData);
                res.status(200).send(customer);
            }
            catch (error) {
                (0, adapters_1.exceptionControllerHandler)(res, error, {
                    status: 400,
                    message: 'Could not create ',
                });
            }
        });
    }
}
exports.default = CustomerController;
