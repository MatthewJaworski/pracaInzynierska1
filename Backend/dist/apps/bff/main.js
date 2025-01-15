/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BffModule = void 0;
const common_1 = __webpack_require__(3);
const bff_controller_1 = __webpack_require__(4);
const bff_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(21);
const joi = __webpack_require__(41);
const common_2 = __webpack_require__(17);
const rabbit_module_1 = __webpack_require__(23);
const services_1 = __webpack_require__(8);
const accepted_file_types_1 = __webpack_require__(42);
let BffModule = class BffModule {
};
exports.BffModule = BffModule;
exports.BffModule = BffModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi.object({
                    PORT: joi.string().required(),
                    JWT_SECRET_KEY: joi.string().required(),
                    JWT_EXPIRATION_TIME: joi.string().required(),
                }),
                envFilePath: './apps/bff/.env',
            }),
            rabbit_module_1.RabbitModule.register({ name: services_1.AUTH_SERVICE }),
            rabbit_module_1.RabbitModule.register({ name: services_1.DOCUMENTS_SERVICE }),
            rabbit_module_1.RabbitModule.register({ name: services_1.COMMENTS_SERVICE }),
            rabbit_module_1.RabbitModule.register({ name: services_1.NOTIFICATIONS_SERVICE }),
            common_2.CommonModule,
            common_2.AuthModule,
        ],
        controllers: [bff_controller_1.BffController],
        providers: [
            bff_service_1.BffService,
            {
                provide: 'ACCEPTED_FILE_TYPES',
                useValue: accepted_file_types_1.ACCEPTED_FILE_TYPES,
            },
        ],
    })
], BffModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BffController = void 0;
const common_1 = __webpack_require__(3);
const bff_service_1 = __webpack_require__(5);
const create_user_dto_1 = __webpack_require__(9);
const common_2 = __webpack_require__(17);
const update_user_dto_1 = __webpack_require__(26);
const create_template_dto_1 = __webpack_require__(27);
const platform_express_1 = __webpack_require__(29);
const update_template_dto_1 = __webpack_require__(30);
const fill_template_dto_1 = __webpack_require__(31);
const express_1 = __webpack_require__(33);
const document_sort_field_1 = __webpack_require__(34);
const sort_type_1 = __webpack_require__(35);
const update_document_dto_1 = __webpack_require__(36);
const role_1 = __webpack_require__(11);
const create_predfefined_fields_dto_1 = __webpack_require__(38);
const mime = __webpack_require__(39);
const create_comment_dto_1 = __webpack_require__(40);
let BffController = class BffController {
    constructor(bffService) {
        this.bffService = bffService;
    }
    health() {
        return this.bffService.getHealth();
    }
    async register(request) {
        return await this.bffService.createUser(request);
    }
    async registerMany(request) {
        return await this.bffService.createUserMany(request);
    }
    async getUsersByRole(role, safeData) {
        return await this.bffService.getUsersByRole(role, safeData);
    }
    async getUser(id) {
        return await this.bffService.getUser(id);
    }
    async patchUser(request) {
        return await this.bffService.updateUser(request);
    }
    async createTemplate(request, file) {
        return await this.bffService.createTemplate(request, file);
    }
    async getTemplates() {
        return await this.bffService.getTemplates();
    }
    async getTemplatesForStudent() {
        return await this.bffService.getTemplatesForStudent();
    }
    async getTemplate(id) {
        return await this.bffService.getTemplate(id);
    }
    async getTemplatePdf() {
        return await this.bffService.getTemplatePdfs();
    }
    async createPredefinedField(request) {
        return await this.bffService.createPredefinedField(request);
    }
    async updateTemplate(request, file) {
        return await this.bffService.updateTemplate(request, file);
    }
    async deleteTemplate(id) {
        return await this.bffService.deleteTemplate(id);
    }
    async uploadPdfTemplateDocument(file) {
        return await this.bffService.uploadPdfTemplateDocument(file);
    }
    async getFields(page, pageSize) {
        return await this.bffService.getFields({ page, pageSize });
    }
    async deleteField(fieldName) {
        return await this.bffService.deletePredefinedField(fieldName);
    }
    async updateField(request) {
        return await this.bffService.updatePredefinedField(request);
    }
    async fillField(request) {
        return await this.bffService.fillField(request);
    }
    async getTemplateFields(templateId, userType) {
        return await this.bffService.getTemplateFields(templateId, userType);
    }
    async fillTemplate(request) {
        const result = await this.bffService.getUser(request.userId);
        return await this.bffService.saveTemplateData(request, result);
    }
    async getDocuments(userId) {
        return await this.bffService.getDocumentsByUserId(userId);
    }
    async getAllDocuments(page, pageSize, sortField, sortOrder) {
        return await this.bffService.getFilteredDocuments({
            page,
            pageSize,
            sortField,
            sortOrder,
        });
    }
    async getDocumentDetails(documentId) {
        return await this.bffService.getDocumentDetails(documentId);
    }
    async getAttachment(attachmentId, res) {
        try {
            const { attachmentBuffer, attachment } = await this.bffService.getAttachmentFile(attachmentId);
            const mimeType = mime.lookup(attachment.fileName) || 'application/octet-stream';
            res.set({
                'Content-Type': mimeType,
                'Content-Disposition': `attachment; filename="${attachment.fileName}"`,
                'Content-Length': attachmentBuffer.length,
            });
            res.send(attachmentBuffer);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(404).send({ success: false, message: error.message });
            }
            else {
                console.error('Error handling get_attachment:', error.message);
                res.status(500).send({ success: false, message: error.message });
            }
        }
    }
    async printDocument(documentId, res) {
        try {
            let pdfBuffer = await this.bffService.printDocument(documentId);
            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="document_${documentId}.pdf"`,
                'Content-Length': pdfBuffer.length,
            });
            res.end(pdfBuffer);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                res.status(404).send({ success: false, message: error.message });
            }
            else {
                console.error('Error handling print_document:', error.message);
                res.status(500).send({ success: false, message: error.message });
            }
        }
    }
    async updateDocument(documentId, request) {
        return await this.bffService.updateDocument(documentId, request);
    }
    async addAttachment(files, request) {
        return await this.bffService.addAttachment(files, request.documentId);
    }
    async addComment(request) {
        console.log(request, 'request');
        return await this.bffService.addComment(request);
    }
    async getComments(documentId) {
        return await this.bffService.getCommentsByDocumentId(documentId);
    }
};
exports.BffController = BffController;
__decorate([
    (0, common_1.Get)('/health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], BffController.prototype, "health", null);
__decorate([
    (0, common_1.Post)('/user/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/user/register/many'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "registerMany", null);
__decorate([
    (0, common_1.Get)('/user/by/role/:role/'),
    __param(0, (0, common_1.Param)('role')),
    __param(1, (0, common_1.Query)('safeData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof role_1.Role !== "undefined" && role_1.Role) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getUsersByRole", null);
__decorate([
    (0, common_1.Get)('/user/:id'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)('/user/update'),
    (0, common_1.UseGuards)(common_2.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "patchUser", null);
__decorate([
    (0, common_1.Post)('/template/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof create_template_dto_1.CreateTemplateDto !== "undefined" && create_template_dto_1.CreateTemplateDto) === "function" ? _e : Object, typeof (_g = typeof Express !== "undefined" && (_f = Express.Multer) !== void 0 && _f.File) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "createTemplate", null);
__decorate([
    (0, common_1.Get)('/template'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getTemplates", null);
__decorate([
    (0, common_1.Get)('/template/for/student'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getTemplatesForStudent", null);
__decorate([
    (0, common_1.Get)('/template/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getTemplate", null);
__decorate([
    (0, common_1.Get)('/template-pdf'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getTemplatePdf", null);
__decorate([
    (0, common_1.Post)('/predefined-field'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof create_predfefined_fields_dto_1.CreatePredefinedField !== "undefined" && create_predfefined_fields_dto_1.CreatePredefinedField) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "createPredefinedField", null);
__decorate([
    (0, common_1.Patch)('/template/update'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof update_template_dto_1.UpdateTemplateDto !== "undefined" && update_template_dto_1.UpdateTemplateDto) === "function" ? _j : Object, typeof (_l = typeof Express !== "undefined" && (_k = Express.Multer) !== void 0 && _k.File) === "function" ? _l : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "updateTemplate", null);
__decorate([
    (0, common_1.Delete)('/template/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "deleteTemplate", null);
__decorate([
    (0, common_1.Post)('/template/pdf/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_o = typeof Express !== "undefined" && (_m = Express.Multer) !== void 0 && _m.File) === "function" ? _o : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "uploadPdfTemplateDocument", null);
__decorate([
    (0, common_1.Get)('/fields/predefined'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getFields", null);
__decorate([
    (0, common_1.Delete)('/fields/predefined'),
    __param(0, (0, common_1.Query)('fieldName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "deleteField", null);
__decorate([
    (0, common_1.Patch)('/fields/predefined'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_p = typeof create_predfefined_fields_dto_1.CreatePredefinedField !== "undefined" && create_predfefined_fields_dto_1.CreatePredefinedField) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "updateField", null);
__decorate([
    (0, common_1.Patch)('/document/fields/fill'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "fillField", null);
__decorate([
    (0, common_1.Get)('/template/pdf/fields/:templateId'),
    __param(0, (0, common_1.Param)('templateId')),
    __param(1, (0, common_1.Query)('for')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getTemplateFields", null);
__decorate([
    (0, common_1.Post)('/template/fill'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_r = typeof fill_template_dto_1.FillTemplateDto !== "undefined" && fill_template_dto_1.FillTemplateDto) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "fillTemplate", null);
__decorate([
    (0, common_1.Get)('/document/for/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getDocuments", null);
__decorate([
    (0, common_1.Get)('/documents'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __param(2, (0, common_1.Query)('sortField')),
    __param(3, (0, common_1.Query)('sortOrder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, typeof (_s = typeof document_sort_field_1.DocumentSortField !== "undefined" && document_sort_field_1.DocumentSortField) === "function" ? _s : Object, typeof (_t = typeof sort_type_1.SortType !== "undefined" && sort_type_1.SortType) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getAllDocuments", null);
__decorate([
    (0, common_1.Get)('/document/:documentId'),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getDocumentDetails", null);
__decorate([
    (0, common_1.Get)('/document/attachment/:attachmentId'),
    __param(0, (0, common_1.Param)('attachmentId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_u = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _u : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getAttachment", null);
__decorate([
    (0, common_1.Get)('/print/:documentId'),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "printDocument", null);
__decorate([
    (0, common_1.Put)('/document/update/:documentId'),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_w = typeof update_document_dto_1.UpdateDocumentDto !== "undefined" && update_document_dto_1.UpdateDocumentDto) === "function" ? _w : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "updateDocument", null);
__decorate([
    (0, common_1.Post)('/document/attachment'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "addAttachment", null);
__decorate([
    (0, common_1.Post)('/comment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_x = typeof create_comment_dto_1.CreateCommentDto !== "undefined" && create_comment_dto_1.CreateCommentDto) === "function" ? _x : Object]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)('/comment/:documentId'),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BffController.prototype, "getComments", null);
exports.BffController = BffController = __decorate([
    (0, common_1.Controller)('/api'),
    __metadata("design:paramtypes", [typeof (_a = typeof bff_service_1.BffService !== "undefined" && bff_service_1.BffService) === "function" ? _a : Object])
], BffController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BffService = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
const services_1 = __webpack_require__(8);
let BffService = class BffService {
    constructor(authServiceClient, documentServiceClient, commentServiceClient, acceptedFileTypes) {
        this.authServiceClient = authServiceClient;
        this.documentServiceClient = documentServiceClient;
        this.commentServiceClient = commentServiceClient;
        this.acceptedFileTypes = acceptedFileTypes;
    }
    getHealth() {
        return 'OK';
    }
    async createUserMany(request) {
        const result = await this.processRequest('create_user_many', request, this.authServiceClient);
        return result.success
            ? common_1.HttpStatus.CREATED
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    async createUser(request) {
        const result = await this.processRequest('create_user', request, this.authServiceClient);
        return result.success
            ? common_1.HttpStatus.CREATED
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    async getUser(id) {
        const result = await this.processRequest('get_user', id, this.authServiceClient);
        return result.success ? result.data : common_1.HttpStatus.NOT_FOUND;
    }
    async updateUser(request) {
        const result = await this.processRequest('update_user', request, this.authServiceClient);
        return result.success
            ? common_1.HttpStatus.CREATED
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    }
    async uploadPdfTemplateDocument(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (!this.acceptedFileTypes.includes(file.mimetype))
            throw new common_1.BadRequestException('Invalid file type');
        const UploadPDFTemplateDTO = {
            filename: file.originalname,
            mimetype: file.mimetype,
            fileData: file.buffer.toString('base64'),
        };
        const result = await this.uploadDocument(UploadPDFTemplateDTO);
        return result;
    }
    async deletePredefinedField(fieldName) {
        const result = await this.processRequest('delete_predefined_field', fieldName, this.documentServiceClient);
        return result.data;
    }
    async updatePredefinedField(request) {
        const result = await this.processRequest('update_predefined_field', request, this.documentServiceClient);
        return result.data;
    }
    async createPredefinedField(request) {
        const result = await this.processRequest('create_predefined_field', request, this.documentServiceClient);
        return result.data;
    }
    async getFields(data) {
        const result = await this.processRequest('get_predefined_fields', data, this.documentServiceClient);
        return result;
    }
    async createTemplate(request, file) {
        const result = await this.processRequest('create_template', { ...request, file }, this.documentServiceClient);
        return result.data;
    }
    async getTemplatesForStudent() {
        const result = await this.processRequest('get_templates_for_student', {}, this.documentServiceClient);
        return result.data;
    }
    async getTemplates() {
        const result = await this.processRequest('get_templates', {}, this.documentServiceClient);
        return result.data;
    }
    async getTemplate(id) {
        const result = await this.processRequest('get_template', id, this.documentServiceClient);
        return result.data;
    }
    async getTemplatePdfs() {
        const result = await this.processRequest('get_template_pdfs', {}, this.documentServiceClient);
        return result.data;
    }
    async updateTemplate(request, file) {
        const result = await this.processRequest('update_template', { ...request, file }, this.documentServiceClient);
        return result.data;
    }
    async deleteTemplate(id) {
        const result = await this.processRequest('delete_template', id, this.documentServiceClient);
        return result.data;
    }
    async getTemplateFields(templateId, userType) {
        const result = await this.processRequest('get_template_fields', { templateId, userType }, this.documentServiceClient);
        return result.data;
    }
    async fillField(request) {
        const result = await this.processRequest('fill_field', request, this.documentServiceClient);
        return result.data;
    }
    async saveTemplateData(request, user) {
        const result = await this.processRequest('fill_template', { request, user }, this.documentServiceClient);
        return result.data;
    }
    async getDocumentsByUserId(userId) {
        const result = await this.processRequest('get_documents_by_user_id', userId, this.documentServiceClient);
        return result.data;
    }
    async getAttachmentFile(attachmentId) {
        const result = await this.processRequest('get_attachment_file', attachmentId, this.documentServiceClient);
        try {
            const { attachmentBuffer: attachmentBufferBase64, attachment } = result;
            const attachmentBufferRes = Buffer.from(attachmentBufferBase64, 'base64');
            return { attachmentBuffer: attachmentBufferRes, attachment };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Attachment not found');
            }
            else {
                console.error('Error in getAttachmentFile:', error.message);
                throw new common_1.InternalServerErrorException('Failed to retrieve attachment');
            }
        }
    }
    async printDocument(documentId) {
        const result = await this.processRequest('print_document', documentId, this.documentServiceClient);
        try {
            let pdfBuffer = result.data;
            if (!pdfBuffer) {
                throw new common_1.InternalServerErrorException('Failed to print document');
            }
            if (pdfBuffer && pdfBuffer.type === 'Buffer') {
                pdfBuffer = Buffer.from(pdfBuffer.data);
            }
            return pdfBuffer;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw new common_1.NotFoundException('Document not found');
            }
            else {
                throw new common_1.InternalServerErrorException('Failed to print document');
            }
        }
    }
    async getFilteredDocuments(params) {
        const result = await this.processRequest('get_filtered_documents', params, this.documentServiceClient);
        return result;
    }
    async updateDocument(documentId, request) {
        const result = await this.processRequest('update_document', { documentId, request }, this.documentServiceClient);
        return result.data;
    }
    async getUsersByRole(role, safeData) {
        const result = await this.processRequest('get_users_by_role', { role, safeData }, this.authServiceClient);
        return result;
    }
    async getDocumentDetails(documentId) {
        const result = await this.processRequest('get_document_details', documentId, this.documentServiceClient);
        return result;
    }
    async addAttachment(files, documentId) {
        const result = await this.processRequest('add_attachment', { files, documentId }, this.documentServiceClient);
        return result.data;
    }
    async addComment(request) {
        const result = await this.processRequest('add_comment', request, this.commentServiceClient);
        return result.data;
    }
    async getCommentsByDocumentId(documentId) {
        const result = await this.processRequest('get_comments_by_document_id', documentId, this.commentServiceClient);
        return result.data;
    }
    async uploadDocument(request) {
        const result = await this.processRequest('upload_pdf_template', request, this.documentServiceClient);
        if (result.success) {
            return { message: 'Document uploaded successfully' };
        }
        else {
            throw new common_1.InternalServerErrorException('Failed to upload document');
        }
    }
    async processRequest(pattern, payload, service) {
        try {
            const result = await (0, rxjs_1.lastValueFrom)(service.send(pattern, payload).pipe((0, rxjs_1.timeout)(5000), (0, rxjs_1.catchError)((err) => {
                throw new common_1.InternalServerErrorException(err.message);
            })));
            return result;
        }
        catch (error) {
            console.error(`Failed to process request with pattern: ${pattern}`, error);
            throw new common_1.InternalServerErrorException('Internal server error occurred');
        }
    }
};
exports.BffService = BffService;
exports.BffService = BffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __param(1, (0, common_1.Inject)(services_1.DOCUMENTS_SERVICE)),
    __param(2, (0, common_1.Inject)(services_1.COMMENTS_SERVICE)),
    __param(3, (0, common_1.Inject)('ACCEPTED_FILE_TYPES')),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object, typeof (_b = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _b : Object, typeof (_c = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _c : Object, Array])
], BffService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NOTIFICATIONS_SERVICE = exports.COMMENTS_SERVICE = exports.DOCUMENTS_SERVICE = exports.AUTH_SERVICE = void 0;
exports.AUTH_SERVICE = 'USERS';
exports.DOCUMENTS_SERVICE = 'DOCUMENTS';
exports.COMMENTS_SERVICE = 'COMMENTS';
exports.NOTIFICATIONS_SERVICE = 'NOTIFICATIONS';


/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(10);
const role_1 = __webpack_require__(11);
const currency_1 = __webpack_require__(12);
const field_of_study_1 = __webpack_require__(13);
const semester_1 = __webpack_require__(14);
const study_form_1 = __webpack_require__(15);
const study_level_1 = __webpack_require__(16);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof role_1.Role !== "undefined" && role_1.Role) === "function" ? _a : Object)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "bankAccount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_b = typeof currency_1.Currency !== "undefined" && currency_1.Currency) === "function" ? _b : Object)
], CreateUserDto.prototype, "accountCurrency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "bankName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "albumNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_c = typeof field_of_study_1.FieldOfStudy !== "undefined" && field_of_study_1.FieldOfStudy) === "function" ? _c : Object)
], CreateUserDto.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_d = typeof semester_1.Semester !== "undefined" && semester_1.Semester) === "function" ? _d : Object)
], CreateUserDto.prototype, "semester", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_e = typeof study_form_1.StudyForm !== "undefined" && study_form_1.StudyForm) === "function" ? _e : Object)
], CreateUserDto.prototype, "studyForm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", typeof (_f = typeof study_level_1.StudyLevel !== "undefined" && study_level_1.StudyLevel) === "function" ? _f : Object)
], CreateUserDto.prototype, "studyLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "permanentStreet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "permanentCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "permanentPostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "permanentNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "correspondenceStreet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "correspondenceCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "correspondencePostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "correspondenceNumber", void 0);


/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(18), exports);
__exportStar(__webpack_require__(19), exports);
__exportStar(__webpack_require__(22), exports);
__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(3);
const common_service_1 = __webpack_require__(19);
const rabbit_service_1 = __webpack_require__(20);
let CommonModule = class CommonModule {
};
exports.CommonModule = CommonModule;
exports.CommonModule = CommonModule = __decorate([
    (0, common_1.Module)({
        providers: [rabbit_service_1.RabbitService, common_service_1.CommonService],
        exports: [rabbit_service_1.RabbitService, common_service_1.CommonService],
    })
], CommonModule);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(3);
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RabbitService = void 0;
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(21);
const microservices_1 = __webpack_require__(6);
let RabbitService = class RabbitService {
    constructor(configService) {
        this.configService = configService;
    }
    getOptions(queue, noAck = true) {
        return {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [this.configService.get('RABBITMQ_URL')],
                queue: this.configService.get(`RABBITMQ_${queue}_QUEUE`),
                noAck,
                persistent: true,
            },
        };
    }
};
exports.RabbitService = RabbitService;
exports.RabbitService = RabbitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RabbitService);


/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const rabbit_module_1 = __webpack_require__(23);
const common_1 = __webpack_require__(3);
const cookieParser = __webpack_require__(24);
const services_1 = __webpack_require__(8);
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(cookieParser()).forRoutes('*');
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [rabbit_module_1.RabbitModule.register({ name: services_1.AUTH_SERVICE })],
        exports: [rabbit_module_1.RabbitModule],
    })
], AuthModule);


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RabbitModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RabbitModule = void 0;
const common_1 = __webpack_require__(3);
const rabbit_service_1 = __webpack_require__(20);
const microservices_1 = __webpack_require__(6);
const config_1 = __webpack_require__(21);
let RabbitModule = RabbitModule_1 = class RabbitModule {
    static register({ name }) {
        return {
            module: RabbitModule_1,
            imports: [
                microservices_1.ClientsModule.registerAsync([
                    {
                        name,
                        useFactory: (configService) => ({
                            transport: microservices_1.Transport.RMQ,
                            options: {
                                urls: [configService.get('RABBITMQ_URL')],
                                queue: configService.get(`RABBITMQ_${name}_QUEUE`),
                            },
                        }),
                        inject: [config_1.ConfigService],
                    },
                ]),
            ],
            exports: [microservices_1.ClientsModule],
        };
    }
};
exports.RabbitModule = RabbitModule;
exports.RabbitModule = RabbitModule = RabbitModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [rabbit_service_1.RabbitService],
        exports: [rabbit_service_1.RabbitService],
    })
], RabbitModule);


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const microservices_1 = __webpack_require__(6);
const rxjs_1 = __webpack_require__(7);
const services_1 = __webpack_require__(8);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(authClient) {
        this.authClient = authClient;
    }
    canActivate(context) {
        const authentication = this.getAuthentication(context);
        return this.authClient
            .send('validate_user', {
            Authentication: authentication,
        })
            .pipe((0, rxjs_1.tap)((response) => {
            if (!response) {
                throw new common_1.UnauthorizedException('Invalid authentication');
            }
            this.addUserToRequest(response, context);
        }), (0, rxjs_1.catchError)((error) => {
            console.error('Error during authentication:', error);
            throw new common_1.UnauthorizedException('Authentication failed');
        }));
    }
    getAuthentication(context) {
        const authenticationCookie = context.switchToHttp().getRequest()
            .cookies?.Authentication;
        const headers = context.switchToHttp().getRequest().headers;
        const authenticationHeader = headers['authorization'];
        const authentication = authenticationHeader?.split(' ')[1];
        if (!authenticationCookie && !authentication) {
            throw new common_1.UnauthorizedException('No authentication token');
        }
        const authenticationToken = authentication ?? authenticationCookie;
        return authenticationToken;
    }
    addUserToRequest(user, context) {
        context.switchToHttp().getRequest().user = user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(services_1.AUTH_SERVICE)),
    __metadata("design:paramtypes", [typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(10);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "bankAccount", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "accountCurrency", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "bankName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "studyLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "permanentStreet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "permanentCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "permanentPostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "permanentNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "correspondenceStreet", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "correspondenceCity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "correspondencePostalCode", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "correspondenceNumber", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateTemplateDto = void 0;
const class_transformer_1 = __webpack_require__(28);
const class_validator_1 = __webpack_require__(10);
class CreateTemplateDto {
}
exports.CreateTemplateDto = CreateTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateTemplateDto.prototype, "visibleForStudents", void 0);


/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateTemplateDto = void 0;
const class_transformer_1 = __webpack_require__(28);
const class_validator_1 = __webpack_require__(10);
class UpdateTemplateDto {
}
exports.UpdateTemplateDto = UpdateTemplateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateTemplateDto.prototype, "visibleForStudents", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTemplateDto.prototype, "templateFileName", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateTemplateDto.prototype, "newTemplate", void 0);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FillTemplateDto = void 0;
const class_validator_1 = __webpack_require__(10);
const is_base64_values_decorator_1 = __webpack_require__(32);
class FillTemplateDto {
}
exports.FillTemplateDto = FillTemplateDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FillTemplateDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FillTemplateDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, is_base64_values_decorator_1.IsBase64Values)({ message: 'Each signature must be a base64 string' }),
    __metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], FillTemplateDto.prototype, "signatures", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", typeof (_b = typeof Record !== "undefined" && Record) === "function" ? _b : Object)
], FillTemplateDto.prototype, "fields", void 0);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IsBase64Values = IsBase64Values;
const class_validator_1 = __webpack_require__(10);
const class_validator_2 = __webpack_require__(10);
function IsBase64Values(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isBase64Values',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(signatures, args) {
                    if (typeof signatures !== 'object' || signatures === null) {
                        return false;
                    }
                    return Object.values(signatures).every((value) => {
                        if (typeof value !== 'string') {
                            return false;
                        }
                        const dataUriPattern = /^data:\w+\/[a-zA-Z+\-.]+;base64,/;
                        let base64String = value;
                        if (dataUriPattern.test(value)) {
                            base64String = value.replace(dataUriPattern, '');
                        }
                        return (0, class_validator_2.isBase64)(base64String);
                    });
                },
                defaultMessage(args) {
                    return `${args.property} must be an object with base64 string values`;
                },
            },
        });
    };
}


/***/ }),
/* 33 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateDocumentDto = void 0;
const class_validator_1 = __webpack_require__(10);
const document_status_1 = __webpack_require__(37);
class UpdateDocumentDto {
}
exports.UpdateDocumentDto = UpdateDocumentDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentDto.prototype, "assignedTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['submitted', 'assigned', 'approved', 'rejected']),
    __metadata("design:type", typeof (_a = typeof document_status_1.DocumentStatus !== "undefined" && document_status_1.DocumentStatus) === "function" ? _a : Object)
], UpdateDocumentDto.prototype, "documentStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDocumentDto.prototype, "updatedBy", void 0);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePredefinedField = void 0;
const class_validator_1 = __webpack_require__(10);
class CreatePredefinedField {
}
exports.CreatePredefinedField = CreatePredefinedField;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePredefinedField.prototype, "fieldName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePredefinedField.prototype, "value", void 0);


/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("mime-types");

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCommentDto = void 0;
const class_validator_1 = __webpack_require__(10);
class CreateCommentDto {
}
exports.CreateCommentDto = CreateCommentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "documentId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['admin', 'student', 'dean', 'department-worker']),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "userRole", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCommentDto.prototype, "userName", void 0);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ACCEPTED_FILE_TYPES = void 0;
exports.ACCEPTED_FILE_TYPES = ['application/pdf'];


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const bff_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
const config_1 = __webpack_require__(21);
async function bootstrap() {
    const app = await core_1.NestFactory.create(bff_module_1.BffModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    await app.listen(configService.get('PORT'));
}
bootstrap();

})();

/******/ })()
;