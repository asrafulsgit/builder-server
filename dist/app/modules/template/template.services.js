"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const template_model_1 = require("./template.model");
const appError_1 = __importDefault(require("../../middlewares/appError"));
const createTemplateService = async (payload, userId) => {
    const template = await template_model_1.Template.create({
        userId,
        ...payload
    });
    return template;
};
const getMyTemplatesService = async (userId) => {
    const templates = await template_model_1.Template.find({ userId });
    const total = await template_model_1.Template.countDocuments({ userId });
    return {
        templates,
        meta: { total }
    };
};
const getSingleTemplateService = async (userId, templateId) => {
    const template = await template_model_1.Template.findOne({ _id: templateId, userId });
    if (!template) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Project not found.");
    }
    return template;
};
exports.templateServices = {
    createTemplateService,
    getMyTemplatesService,
    getSingleTemplateService
};
