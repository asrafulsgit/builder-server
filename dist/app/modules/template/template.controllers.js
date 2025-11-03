"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const template_services_1 = require("./template.services");
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const createTemplate = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const user = req.user;
    const template = await template_services_1.templateServices.createTemplateService(req.body, user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'Template created',
        data: template
    });
});
const getMyTemplates = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const user = req.user;
    const templates = await template_services_1.templateServices.getMyTemplatesService(user.id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Templates retrived',
        data: templates
    });
});
const getSingleTemplate = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const user = req.user;
    const templateId = req.params.id;
    const template = await template_services_1.templateServices.getSingleTemplateService(user.id, templateId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Template retrived',
        data: template
    });
});
exports.templateControllers = {
    createTemplate,
    getMyTemplates,
    getSingleTemplate
};
