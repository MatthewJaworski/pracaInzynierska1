/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/document/src/aws/S3.service.ts":
/*!*********************************************!*\
  !*** ./apps/document/src/aws/S3.service.ts ***!
  \*********************************************/
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
var S3Service_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.S3Service = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_s3_1 = __webpack_require__(/*! @aws-sdk/client-s3 */ "@aws-sdk/client-s3");
let S3Service = S3Service_1 = class S3Service {
    constructor() {
        this.logger = new common_1.Logger(S3Service_1.name);
        const endpoint = process.env.MINIO_ENDPOINT;
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const useSSL = process.env.MINIO_USE_SSL === 'true';
        const region = process.env.AWS_REGION;
        this.bucketName = process.env.MINIO_BUCKET;
        this.s3Client = new client_s3_1.S3Client({
            endpoint,
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
            tls: useSSL,
        });
    }
    async uploadFile(fileBuffer, filename, mimeType, bucketName) {
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: bucketName,
                Key: filename,
                Body: fileBuffer,
                ContentType: mimeType,
            }));
            this.logger.log(`File '${filename}' uploaded successfully`);
        }
        catch (error) {
            this.logger.error(`Failed to upload file '${filename}':`, error);
            throw error;
        }
    }
    async getFile(filename, bucketName) {
        try {
            const params = {
                Bucket: bucketName,
                Key: filename,
            };
            const data = await this.s3Client.send(new client_s3_1.GetObjectCommand(params));
            const chunks = [];
            for await (const chunk of data.Body) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        }
        catch (error) {
            this.logger.error(`Failed to get file '${filename}':`, error);
            throw error;
        }
    }
    async getFileNames(bucketName) {
        try {
            const data = await this.s3Client.send(new client_s3_1.ListObjectsCommand({
                Bucket: bucketName,
            }));
            return data.Contents.map((object) => object.Key);
        }
        catch (error) {
            this.logger.error('Failed to get file names:', error);
            throw error;
        }
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = S3Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3Service);


/***/ }),

/***/ "./apps/document/src/document.controller.ts":
/*!**************************************************!*\
  !*** ./apps/document/src/document.controller.ts ***!
  \**************************************************/
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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const document_service_1 = __webpack_require__(/*! ./document.service */ "./apps/document/src/document.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const upload_pdf_template_dto_1 = __webpack_require__(/*! @app/common/dtos/upload-pdf-template.dto */ "./libs/common/src/dtos/upload-pdf-template.dto.ts");
const document_sorting_params_1 = __webpack_require__(/*! @app/common/dtos/document-sorting-params */ "./libs/common/src/dtos/document-sorting-params.ts");
const create_predfefined_fields_dto_1 = __webpack_require__(/*! @app/common/dtos/create-predfefined-fields.dto */ "./libs/common/src/dtos/create-predfefined-fields.dto.ts");
let DocumentController = class DocumentController {
    constructor(documentService) {
        this.documentService = documentService;
    }
    createTemplate(createTemplate, context) {
        this.documentService.createTemplate(createTemplate, context);
    }
    getTemplates(context) {
        return this.documentService.getTemplates(context);
    }
    getTemplate(id, context) {
        return this.documentService.getTemplate(id, context);
    }
    getTemplatesForStudent(context) {
        return this.documentService.getTemplatesForStudent(context);
    }
    getTemplatePDFs(context) {
        return this.documentService.getTemplatePDFs(context);
    }
    createPredefinedField(createPredefinedField, context) {
        this.documentService.createPredefinedField(createPredefinedField, context);
    }
    getPredefinedFields(paylod, context) {
        return this.documentService.getFields(paylod, context);
    }
    deletePredefinedField(fieldName, context) {
        this.documentService.deletePredefinedField(fieldName, context);
    }
    updatePredefinedField(updatePredefinedField, context) {
        this.documentService.updatePredefinedField(updatePredefinedField, context);
    }
    updateTemplate(updateTemplate, context) {
        return this.documentService.updateTemplate(updateTemplate, context);
    }
    deleteTemplate(id, context) {
        this.documentService.deleteTemplate(id, context);
    }
    fillTemplate(data, context) {
        this.documentService.fillTemplate(data.request, data.user, context);
    }
    fillField(data, context) {
        const { documentId, ...rest } = data;
        this.documentService.updateDocumentFields(rest, documentId, context);
    }
    async handleSavePDFTemplate(UploadPDFTemplateDTO, context) {
        return await this.documentService.savePDFTemplate(UploadPDFTemplateDTO, context);
    }
    async getTemplateFields(payload, context) {
        return this.documentService.getTemplateFields(payload, context);
    }
    async getDocumentsByUserId(userId, context) {
        return this.documentService.getDocumentsByUserId(userId, context);
    }
    async printDocument(documentId, context) {
        try {
            const result = await this.documentService.printDocument(documentId, context);
            return { success: true, data: result };
        }
        catch (error) {
            console.error('Error handling print_document:', error);
            return { success: false, data: null };
        }
    }
    async getFilteredDocuments(params, context) {
        return await this.documentService.getFilteredDocuments(params, context);
    }
    async updateDocument(data, context) {
        this.documentService.updateDocument(data.documentId, data.request, context);
    }
    async getDocumentDetails(documentId, context) {
        return this.documentService.getDocumentDetails(documentId, context);
    }
    async addAttachment(data, context) {
        return this.documentService.addAttachmentToDocument(data.documentId, data.files, context);
    }
    async getAttachmentFile(attachmentId, context) {
        return this.documentService.getAttachmentFile(attachmentId, context);
    }
};
exports.DocumentController = DocumentController;
__decorate([
    (0, microservices_1.EventPattern)('create_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_c = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "createTemplate", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_templates'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _d : Object]),
    __metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], DocumentController.prototype, "getTemplates", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_f = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], DocumentController.prototype, "getTemplate", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_templates_for_student'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], DocumentController.prototype, "getTemplatesForStudent", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_template_pdfs'),
    __param(0, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_k = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _k : Object]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], DocumentController.prototype, "getTemplatePDFs", null);
__decorate([
    (0, microservices_1.EventPattern)('create_predefined_field'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_m = typeof create_predfefined_fields_dto_1.CreatePredefinedField !== "undefined" && create_predfefined_fields_dto_1.CreatePredefinedField) === "function" ? _m : Object, typeof (_o = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _o : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "createPredefinedField", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_predefined_fields'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_p = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _p : Object]),
    __metadata("design:returntype", typeof (_q = typeof Promise !== "undefined" && Promise) === "function" ? _q : Object)
], DocumentController.prototype, "getPredefinedFields", null);
__decorate([
    (0, microservices_1.EventPattern)('delete_predefined_field'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_r = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _r : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "deletePredefinedField", null);
__decorate([
    (0, microservices_1.EventPattern)('update_predefined_field'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_s = typeof create_predfefined_fields_dto_1.CreatePredefinedField !== "undefined" && create_predfefined_fields_dto_1.CreatePredefinedField) === "function" ? _s : Object, typeof (_t = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _t : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "updatePredefinedField", null);
__decorate([
    (0, microservices_1.EventPattern)('update_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_v = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _v : Object]),
    __metadata("design:returntype", typeof (_w = typeof Promise !== "undefined" && Promise) === "function" ? _w : Object)
], DocumentController.prototype, "updateTemplate", null);
__decorate([
    (0, microservices_1.EventPattern)('delete_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_x = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _x : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "deleteTemplate", null);
__decorate([
    (0, microservices_1.MessagePattern)('fill_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_y = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _y : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "fillTemplate", null);
__decorate([
    (0, microservices_1.EventPattern)('fill_field'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_0 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _0 : Object]),
    __metadata("design:returntype", void 0)
], DocumentController.prototype, "fillField", null);
__decorate([
    (0, microservices_1.MessagePattern)('upload_pdf_template'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_1 = typeof upload_pdf_template_dto_1.UploadPDFTemplateDTO !== "undefined" && upload_pdf_template_dto_1.UploadPDFTemplateDTO) === "function" ? _1 : Object, typeof (_2 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _2 : Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "handleSavePDFTemplate", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_template_fields'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_3 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _3 : Object]),
    __metadata("design:returntype", typeof (_4 = typeof Promise !== "undefined" && Promise) === "function" ? _4 : Object)
], DocumentController.prototype, "getTemplateFields", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_documents_by_user_id'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_5 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _5 : Object]),
    __metadata("design:returntype", typeof (_6 = typeof Promise !== "undefined" && Promise) === "function" ? _6 : Object)
], DocumentController.prototype, "getDocumentsByUserId", null);
__decorate([
    (0, microservices_1.MessagePattern)('print_document'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_7 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _7 : Object]),
    __metadata("design:returntype", typeof (_8 = typeof Promise !== "undefined" && Promise) === "function" ? _8 : Object)
], DocumentController.prototype, "printDocument", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_filtered_documents'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_9 = typeof document_sorting_params_1.DocumentSortParams !== "undefined" && document_sorting_params_1.DocumentSortParams) === "function" ? _9 : Object, typeof (_10 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _10 : Object]),
    __metadata("design:returntype", typeof (_11 = typeof Promise !== "undefined" && Promise) === "function" ? _11 : Object)
], DocumentController.prototype, "getFilteredDocuments", null);
__decorate([
    (0, microservices_1.EventPattern)('update_document'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_12 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _12 : Object]),
    __metadata("design:returntype", Promise)
], DocumentController.prototype, "updateDocument", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_document_details'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_13 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _13 : Object]),
    __metadata("design:returntype", typeof (_14 = typeof Promise !== "undefined" && Promise) === "function" ? _14 : Object)
], DocumentController.prototype, "getDocumentDetails", null);
__decorate([
    (0, microservices_1.MessagePattern)('add_attachment'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_15 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _15 : Object]),
    __metadata("design:returntype", typeof (_16 = typeof Promise !== "undefined" && Promise) === "function" ? _16 : Object)
], DocumentController.prototype, "addAttachment", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_attachment_file'),
    __param(0, (0, microservices_1.Payload)()),
    __param(1, (0, microservices_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_17 = typeof microservices_1.RmqContext !== "undefined" && microservices_1.RmqContext) === "function" ? _17 : Object]),
    __metadata("design:returntype", typeof (_18 = typeof Promise !== "undefined" && Promise) === "function" ? _18 : Object)
], DocumentController.prototype, "getAttachmentFile", null);
exports.DocumentController = DocumentController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof document_service_1.DocumentService !== "undefined" && document_service_1.DocumentService) === "function" ? _a : Object])
], DocumentController);


/***/ }),

/***/ "./apps/document/src/document.module.ts":
/*!**********************************************!*\
  !*** ./apps/document/src/document.module.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DocumentModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const document_controller_1 = __webpack_require__(/*! ./document.controller */ "./apps/document/src/document.controller.ts");
const document_service_1 = __webpack_require__(/*! ./document.service */ "./apps/document/src/document.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const joi = __webpack_require__(/*! joi */ "joi");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const rabbit_module_1 = __webpack_require__(/*! @app/common/rabbitmq/rabbit.module */ "./libs/common/src/rabbitmq/rabbit.module.ts");
const Document_1 = __webpack_require__(/*! libs/common/entities/Document */ "./libs/common/entities/Document.ts");
const TemplatesDocuments_1 = __webpack_require__(/*! libs/common/entities/TemplatesDocuments */ "./libs/common/entities/TemplatesDocuments.ts");
const S3_service_1 = __webpack_require__(/*! ./aws/S3.service */ "./apps/document/src/aws/S3.service.ts");
const TemplateField_1 = __webpack_require__(/*! libs/common/entities/TemplateField */ "./libs/common/entities/TemplateField.ts");
const pdf_service_1 = __webpack_require__(/*! ./pdf/pdf.service */ "./apps/document/src/pdf/pdf.service.ts");
const PredefinedFields_1 = __webpack_require__(/*! libs/common/entities/PredefinedFields */ "./libs/common/entities/PredefinedFields.ts");
const DocumentFieldValue_1 = __webpack_require__(/*! libs/common/entities/DocumentFieldValue */ "./libs/common/entities/DocumentFieldValue.ts");
const Attachment_1 = __webpack_require__(/*! libs/common/entities/Attachment */ "./libs/common/entities/Attachment.ts");
let DocumentModule = class DocumentModule {
};
exports.DocumentModule = DocumentModule;
exports.DocumentModule = DocumentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: joi.object({
                    DATABASE_PORT: joi.string().required(),
                    DATABASE_HOST: joi.string().required(),
                    DATABASE_PASSWORD: joi.string().required(),
                    DATABASE_NAME: joi.string().required(),
                    DATABASE_USERNAME: joi.string().required(),
                    RABBITMQ_URL: joi.string().required(),
                    RABBITMQ_DOCUMENTS_QUEUE: joi.string().required(),
                    AWS_ACCESS_KEY_ID: joi.string().required(),
                    AWS_SECRET_ACCESS_KEY: joi.string().required(),
                    AWS_REGION: joi.string().default('us-east-1'),
                    MINIO_ENDPOINT: joi.string().required(),
                    MINIO_BUCKET: joi.string().required(),
                    MINIO_USE_SSL: joi.boolean().default(false),
                }),
                envFilePath: './apps/document/.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [
                    Document_1.Document,
                    TemplatesDocuments_1.TemplatesDocuments,
                    TemplateField_1.TemplateField,
                    PredefinedFields_1.PredefinedFields,
                    DocumentFieldValue_1.DocumentFieldValue,
                    Attachment_1.Attachment,
                ],
                synchronize: true,
                logging: true,
                options: {
                    trustServerCertificate: true,
                },
            }),
            rabbit_module_1.RabbitModule,
            typeorm_1.TypeOrmModule.forFeature([
                Document_1.Document,
                TemplatesDocuments_1.TemplatesDocuments,
                TemplateField_1.TemplateField,
                PredefinedFields_1.PredefinedFields,
                DocumentFieldValue_1.DocumentFieldValue,
                Attachment_1.Attachment,
            ]),
        ],
        controllers: [document_controller_1.DocumentController],
        providers: [document_service_1.DocumentService, S3_service_1.S3Service, pdf_service_1.PdfService],
    })
], DocumentModule);


/***/ }),

/***/ "./apps/document/src/document.service.ts":
/*!***********************************************!*\
  !*** ./apps/document/src/document.service.ts ***!
  \***********************************************/
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
exports.DocumentService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const Document_1 = __webpack_require__(/*! libs/common/entities/Document */ "./libs/common/entities/Document.ts");
const TemplatesDocuments_1 = __webpack_require__(/*! libs/common/entities/TemplatesDocuments */ "./libs/common/entities/TemplatesDocuments.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const S3_service_1 = __webpack_require__(/*! ./aws/S3.service */ "./apps/document/src/aws/S3.service.ts");
const pdf_service_1 = __webpack_require__(/*! ./pdf/pdf.service */ "./apps/document/src/pdf/pdf.service.ts");
const TemplateField_1 = __webpack_require__(/*! libs/common/entities/TemplateField */ "./libs/common/entities/TemplateField.ts");
const DocumentFieldValue_1 = __webpack_require__(/*! libs/common/entities/DocumentFieldValue */ "./libs/common/entities/DocumentFieldValue.ts");
const PredefinedFields_1 = __webpack_require__(/*! libs/common/entities/PredefinedFields */ "./libs/common/entities/PredefinedFields.ts");
const Attachment_1 = __webpack_require__(/*! libs/common/entities/Attachment */ "./libs/common/entities/Attachment.ts");
let DocumentService = class DocumentService {
    constructor(s3Service, pdfService, repository) {
        this.s3Service = s3Service;
        this.pdfService = pdfService;
        this.repository = repository;
    }
    async savePDFTemplate(file, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        try {
            const fileBuffer = Buffer.from(file.fileData, 'base64');
            await this.s3Service.uploadFile(fileBuffer, file.filename, file.mimetype, 'pdfdocuments');
            channel.ack(originalMsg);
        }
        catch {
            channel.nack(originalMsg, false, false);
            throw new Error('Error saving pdf template');
        }
    }
    async addAttachmentToDocument(documentId, files, context) {
        return this.handleTransaction(async (manager) => {
            const document = await manager.findOne(Document_1.Document, {
                where: { id: documentId },
                relations: ['attachments'],
            });
            if (!document) {
                throw new common_1.BadRequestException('Document not found');
            }
            const attachmentsToSave = [];
            for (const file of files) {
                const fileBuffer = Buffer.from(file.buffer);
                await this.s3Service.uploadFile(fileBuffer, file.originalname, file.mimetype, 'attachments');
                const attachment = manager.create(Attachment_1.Attachment, {
                    document: document,
                    fileName: file.originalname,
                    originalName: file.originalname,
                    mimeType: file.mimetype,
                    size: file.size,
                });
                attachmentsToSave.push(attachment);
            }
            await manager.save(attachmentsToSave);
            return { success: true };
        }, context);
    }
    async createTemplate(template, context) {
        const fileBuffer = Buffer.from(template.file.buffer);
        const fieldsForTemplate = await this.pdfService.getAllFields(fileBuffer);
        await this.handleTransaction(async (manager) => {
            const predefinedFields = await manager.find(PredefinedFields_1.PredefinedFields);
            const templateData = {
                name: template.name,
                description: template.description,
                visibleForStudents: template.visibleForStudents,
                templateFileName: template.file.originalname,
            };
            const templateEntity = manager.create(TemplatesDocuments_1.TemplatesDocuments, templateData);
            const templateFields = fieldsForTemplate.map((field) => {
                return manager.create(TemplateField_1.TemplateField, {
                    fieldName: field.name,
                    dataType: field.type,
                    isOptional: field.isOptional,
                    isUserData: field.isUserData,
                    isPredefined: predefinedFields.some((predefinedField) => predefinedField.fieldName === field.name),
                    isForDeanToFill: field.isForDeanToFill,
                    options: field.options,
                });
            });
            templateEntity.templateFields = templateFields;
            await this.s3Service.uploadFile(fileBuffer, template.file.originalname, template.file.mimetype, 'pdfdocuments');
            await manager.save(TemplatesDocuments_1.TemplatesDocuments, templateEntity);
        }, context);
    }
    async getTemplates(context) {
        return this.handleTransaction(async (manager) => {
            const templates = await manager.find(TemplatesDocuments_1.TemplatesDocuments);
            return { success: true, data: templates };
        }, context);
    }
    async getTemplateFields({ templateId, userType, }, context) {
        return this.handleTransaction(async (manager) => {
            const templateFields = await manager.find(TemplateField_1.TemplateField, {
                where: { template: { id: templateId } },
            });
            let filteredFields = [];
            if (userType === 'student') {
                filteredFields = templateFields.filter((field) => this.getIsForStudentToFill(field));
            }
            else if (userType === 'dean') {
                filteredFields = templateFields.filter((field) => field.isForDeanToFill);
            }
            else {
                filteredFields = templateFields;
            }
            return { success: true, data: filteredFields };
        }, context);
    }
    async getFields({ page, pageSize, }, context) {
        return this.handleTransaction(async (manager) => {
            const fields = await manager.find(PredefinedFields_1.PredefinedFields, {
                skip: (page - 1) * pageSize,
                take: pageSize,
            });
            const total = await manager.count(PredefinedFields_1.PredefinedFields);
            return { fields, total };
        }, context);
    }
    async getTemplate(id, context) {
        return this.handleTransaction(async (manager) => {
            const template = await manager.findOne(TemplatesDocuments_1.TemplatesDocuments, {
                where: { id: id },
            });
            return { success: true, data: template };
        }, context);
    }
    async getTemplatesForStudent(context) {
        return this.handleTransaction(async (manager) => {
            const templates = await manager.find(TemplatesDocuments_1.TemplatesDocuments, {
                where: { visibleForStudents: true },
            });
            return { success: true, data: templates };
        }, context);
    }
    async getTemplatePDFs(context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        try {
            const filesNames = await this.s3Service.getFileNames('pdfdocuments');
            channel.ack(originalMsg);
            return { success: true, data: filesNames };
        }
        catch {
            channel.nack(originalMsg, false, false);
            throw new Error('Error getting pdf files');
        }
    }
    async updateTemplate(updateTemplateData, context) {
        const { file, ...updateData } = updateTemplateData;
        return this.handleTransaction(async (manager) => {
            const template = await manager.findOne(TemplatesDocuments_1.TemplatesDocuments, {
                where: { id: updateTemplateData.id },
                relations: ['templateFields'],
            });
            if (!template) {
                throw new Error('Template not found');
            }
            if (file && updateData.newTemplate) {
                const fileBuffer = Buffer.from(file.buffer);
                await this.s3Service.uploadFile(fileBuffer, file.originalname, file.mimetype, 'pdfdocuments');
                const fieldsForTemplate = await this.pdfService.getAllFields(fileBuffer);
                const existingFieldsMap = new Map();
                for (const field of template.templateFields) {
                    existingFieldsMap.set(field.fieldName, field);
                }
                const newFieldsMap = new Map();
                for (const field of fieldsForTemplate) {
                    newFieldsMap.set(field.name, field);
                }
                const fieldsToAdd = [];
                const fieldsToUpdate = [];
                const fieldsToRemove = [];
                for (const [fieldName, fieldData] of newFieldsMap.entries()) {
                    if (existingFieldsMap.has(fieldName)) {
                        const existingField = existingFieldsMap.get(fieldName);
                        let needsUpdate = false;
                        if (existingField.dataType !== fieldData.type ||
                            existingField.isOptional !== fieldData.isOptional ||
                            existingField.isUserData !== fieldData.isUserData ||
                            existingField.isPredefined !== fieldData.isPredefined ||
                            existingField.isForDeanToFill !== fieldData.isForDeanToFill ||
                            JSON.stringify(existingField.options) !==
                                JSON.stringify(fieldData.options)) {
                            needsUpdate = true;
                        }
                        if (needsUpdate) {
                            Object.assign(existingField, {
                                dataType: fieldData.type,
                                isOptional: fieldData.isOptional,
                                isUserData: fieldData.isUserData,
                                isPredefined: fieldData.isPredefined,
                                isForDeanToFill: fieldData.isForDeanToFill,
                                options: fieldData.options,
                            });
                            fieldsToUpdate.push(existingField);
                        }
                        existingFieldsMap.delete(fieldName);
                    }
                    else {
                        const newField = manager.create(TemplateField_1.TemplateField, {
                            fieldName: fieldData.name,
                            dataType: fieldData.type,
                            isOptional: fieldData.isOptional,
                            isUserData: fieldData.isUserData,
                            isPredefined: fieldData.isPredefined,
                            isForDeanToFill: fieldData.isForDeanToFill,
                            options: fieldData.options,
                        });
                        fieldsToAdd.push(newField);
                    }
                }
                fieldsToRemove.push(...existingFieldsMap.values());
                if (fieldsToAdd.length > 0) {
                    await manager.save(TemplateField_1.TemplateField, fieldsToAdd);
                    template.templateFields.push(...fieldsToAdd);
                }
                if (fieldsToUpdate.length > 0) {
                    await manager.save(TemplateField_1.TemplateField, fieldsToUpdate);
                }
                if (fieldsToRemove.length > 0) {
                    const fieldIdsToRemove = fieldsToRemove.map((field) => field.id);
                    await manager.delete(TemplateField_1.TemplateField, fieldIdsToRemove);
                }
            }
            Object.assign(template, updateData);
            if (updateData.newTemplate)
                template.templateFileName = file.originalname;
            await manager.save(TemplatesDocuments_1.TemplatesDocuments, template);
            return { success: true };
        }, context);
    }
    async updatePredefinedField(data, context) {
        return this.handleTransaction(async (manager) => {
            const predefinedField = await manager.findOne(PredefinedFields_1.PredefinedFields, {
                where: { fieldName: data.fieldName },
            });
            if (!predefinedField) {
                throw new common_1.BadRequestException('Predefined field not found');
            }
            predefinedField.value = data.value;
            predefinedField.fieldName = data.fieldName;
            await manager.save(PredefinedFields_1.PredefinedFields, predefinedField);
        }, context);
    }
    async deleteTemplate(id, context) {
        this.handleTransaction(async (manager) => {
            const template = await manager.findOne(TemplatesDocuments_1.TemplatesDocuments, {
                where: { id },
                relations: ['documents', 'templateFields'],
            });
            if (template) {
                await manager.remove(template);
            }
        }, context);
    }
    async updateDocumentFields(request, documentId, context) {
        this.handleTransaction(async (manager) => {
            const document = await manager.findOne(Document_1.Document, {
                where: { id: documentId },
                relations: ['fieldValues', 'fieldValues.templateField'],
            });
            if (!document) {
                throw new common_1.BadRequestException('Document not found');
            }
            const { fields = {}, signatures = {} } = request;
            const allFields = { ...fields, ...signatures };
            for (const field of document.fieldValues) {
                const fieldName = field.templateField.fieldName;
                if (allFields.hasOwnProperty(fieldName)) {
                    const value = allFields[fieldName];
                    field.value = value?.toString();
                }
            }
            await manager.save(Document_1.Document, document);
        }, context);
    }
    async fillTemplate(request, user, context) {
        this.handleTransaction(async (manager) => {
            const template = await manager.findOne(TemplatesDocuments_1.TemplatesDocuments, {
                where: { id: request.templateId },
                relations: ['templateFields'],
            });
            if (!template) {
                throw new common_1.BadRequestException('Template not found');
            }
            const document = manager.create(Document_1.Document, {
                createdBy: request.userId,
                updatedBy: request.userId,
                createdDate: new Date(),
                updatedDate: new Date(),
                documentTemplate: template,
                documentStatus: 'submitted',
            });
            await manager.save(Document_1.Document, document);
            const allFields = { ...request.fields, ...request.signatures };
            const fieldValuesToSave = [];
            for (const templateField of template.templateFields) {
                const fieldName = templateField.fieldName;
                let value = allFields[fieldName];
                if (templateField.isUserData) {
                    value = user[fieldName];
                    if (value === undefined || value === null) {
                        throw new common_1.BadRequestException(`User data for field '${fieldName}' not found`);
                    }
                }
                if (templateField.isPredefined) {
                    const predefinedField = await manager.findOne(PredefinedFields_1.PredefinedFields, {
                        where: { fieldName: fieldName },
                    });
                    if (predefinedField) {
                        value = predefinedField.value;
                    }
                    else {
                        throw new common_1.BadRequestException(`Predefined field '${fieldName}' not found`);
                    }
                }
                const fieldValue = manager.create(DocumentFieldValue_1.DocumentFieldValue, {
                    document: document,
                    templateField: templateField,
                    value: value?.toString() || '',
                });
                fieldValuesToSave.push(fieldValue);
            }
            await manager.save(DocumentFieldValue_1.DocumentFieldValue, fieldValuesToSave);
        }, context);
    }
    async getDocumentsByUserId(userId, context) {
        return this.handleTransaction(async (manager) => {
            const documents = await manager.find(Document_1.Document, {
                where: { createdBy: userId },
                relations: ['documentTemplate'],
            });
            return {
                success: true,
                data: documents,
            };
        }, context);
    }
    async deletePredefinedField(fieldName, context) {
        this.handleTransaction(async (manager) => {
            await manager.delete(PredefinedFields_1.PredefinedFields, { fieldName: fieldName });
        }, context);
    }
    async printDocument(documentId, channel) {
        const channelRef = channel.getChannelRef();
        const originalMsg = channel.getMessage();
        try {
            const document = await this.handleTransaction(async (manager) => {
                const doc = await manager.findOne(Document_1.Document, {
                    where: { id: documentId },
                    relations: [
                        'fieldValues',
                        'fieldValues.templateField',
                        'documentTemplate',
                    ],
                });
                if (!doc) {
                    throw new common_1.NotFoundException('Document not found');
                }
                return doc;
            });
            const templateFileName = document.documentTemplate.templateFileName;
            const templateFileBuffer = await this.s3Service.getFile(templateFileName, 'pdfdocuments');
            if (!templateFileBuffer) {
                throw new common_1.NotFoundException('Template file not found');
            }
            const dataToFill = {};
            for (const fieldValue of document.fieldValues) {
                const fieldName = fieldValue.templateField.fieldName;
                let value = fieldValue.value;
                dataToFill[fieldName] = value;
            }
            const filledPdfBuffer = await this.pdfService.fillPdfForm(templateFileBuffer, dataToFill);
            channelRef.ack(originalMsg);
            return filledPdfBuffer;
        }
        catch (error) {
            console.error('Error handling print_document:', error.message);
            channelRef.nack(originalMsg, false, false);
            throw error;
        }
    }
    async getFilteredDocuments(params, context) {
        return this.handleTransaction(async (manager) => {
            const queryBuilder = manager
                .getRepository(Document_1.Document)
                .createQueryBuilder('document')
                .leftJoinAndSelect('document.documentTemplate', 'template');
            const validSortFields = [
                'createdDate',
                'updatedDate',
                'documentStatus',
                'templateName',
            ];
            if (params.sortField) {
                if (!validSortFields.includes(params.sortField)) {
                    throw new common_1.BadRequestException('Invalid sort field');
                }
                const sortOrder = params.sortOrder || 'ASC';
                const sortColumn = params.sortField === 'templateName'
                    ? 'template.name'
                    : `document.${params.sortField}`;
                queryBuilder.orderBy(sortColumn, sortOrder);
            }
            const page = params.page > 0 ? params.page : 1;
            const pageSize = params.pageSize > 0 ? params.pageSize : 10;
            queryBuilder.skip((page - 1) * pageSize).take(pageSize);
            const [documents, total] = await queryBuilder.getManyAndCount();
            return {
                documents: documents,
                total: total,
            };
        }, context);
    }
    async updateDocument(id, updateDocumentDto, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        try {
            const document = await this.repository.findOne({ where: { id } });
            if (!document) {
                throw new common_1.NotFoundException(`Document with ID ${id} not found`);
            }
            Object.assign(document, updateDocumentDto);
            Object.assign(document, { updatedDate: new Date() });
            await this.repository.save(document);
            channel.ack(originalMsg);
        }
        catch {
            channel.nack(originalMsg, false, false);
            throw new Error('Error updating document');
        }
    }
    async createPredefinedField(createPredefinedField, context) {
        this.handleTransaction(async (manager) => {
            const predefinedField = manager.create(PredefinedFields_1.PredefinedFields, {
                fieldName: createPredefinedField.fieldName,
                value: createPredefinedField.value,
            });
            await manager.save(PredefinedFields_1.PredefinedFields, predefinedField);
        }, context);
    }
    async getDocumentDetails(documentId, context) {
        return this.handleTransaction(async (manager) => {
            const document = await manager.findOne(Document_1.Document, {
                where: { id: documentId },
                relations: [
                    'fieldValues',
                    'fieldValues.templateField',
                    'documentTemplate',
                    'attachments',
                ],
            });
            return document;
        }, context);
    }
    async getAttachmentFile(attachmentId, context) {
        const channel = context.getChannelRef();
        const originalMsg = context.getMessage();
        try {
            const attachment = await this.handleTransaction(async (manager) => {
                return await manager.findOne(Attachment_1.Attachment, {
                    where: { id: attachmentId },
                });
            });
            if (!attachment) {
                throw new common_1.NotFoundException('Attachment not found');
            }
            const attachmentBuffer = await this.s3Service.getFile(attachment.fileName, 'attachments');
            const attachmentBufferBase64 = attachmentBuffer.toString('base64');
            channel.ack(originalMsg);
            return { attachmentBuffer: attachmentBufferBase64, attachment };
        }
        catch {
            channel.nack(originalMsg, false, false);
            throw new Error('Error getting attachment file');
        }
    }
    async handleTransaction(operation, context) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await operation(queryRunner.manager);
            await queryRunner.commitTransaction();
            if (context) {
                const channel = context.getChannelRef();
                const originalMsg = context.getMessage();
                channel.ack(originalMsg);
            }
            return result;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            if (context) {
                const channel = context.getChannelRef();
                const originalMsg = context.getMessage();
                channel.nack(originalMsg, false, false);
            }
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    getIsForStudentToFill(field) {
        return !field.isUserData && !field.isForDeanToFill && !field.isPredefined;
    }
};
exports.DocumentService = DocumentService;
exports.DocumentService = DocumentService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(Document_1.Document)),
    __metadata("design:paramtypes", [typeof (_a = typeof S3_service_1.S3Service !== "undefined" && S3_service_1.S3Service) === "function" ? _a : Object, typeof (_b = typeof pdf_service_1.PdfService !== "undefined" && pdf_service_1.PdfService) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object])
], DocumentService);


/***/ }),

/***/ "./apps/document/src/pdf/pdf.service.ts":
/*!**********************************************!*\
  !*** ./apps/document/src/pdf/pdf.service.ts ***!
  \**********************************************/
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
exports.PdfService = void 0;
const predefined_fields_names_1 = __webpack_require__(/*! @app/common/constants/predefined-fields-names */ "./libs/common/src/constants/predefined-fields-names.ts");
const user_property_1 = __webpack_require__(/*! @app/common/constants/user-property */ "./libs/common/src/constants/user-property.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const pdf_lib_1 = __webpack_require__(/*! pdf-lib */ "pdf-lib");
let PdfService = class PdfService {
    constructor() { }
    async getAllFields(file) {
        const pdfDoc = await pdf_lib_1.PDFDocument.load(file);
        const form = pdfDoc.getForm();
        const fields = form.getFields();
        const fieldsData = fields.map((field) => {
            const fieldName = field.getName();
            const isOptional = field.isRequired() === false;
            let options = undefined;
            if (field instanceof pdf_lib_1.PDFDropdown ||
                field instanceof pdf_lib_1.PDFRadioGroup ||
                field instanceof pdf_lib_1.PDFOptionList) {
                options = field.getOptions();
            }
            return {
                name: fieldName,
                type: field.constructor.name,
                isUserData: user_property_1.USER_PROPERTY[fieldName] ?? false,
                isOptional,
                isPredefined: false,
                isForDeanToFill: this.getIsForDean(field),
                options,
            };
        });
        return fieldsData;
    }
    getAcademicYear() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return month > 8 ? `${year}/${year + 1}` : `${year - 1}/${year}`;
    }
    getIsForDean(field) {
        const fieldName = field.getName();
        return fieldName.includes('dean') && !predefined_fields_names_1.PREDEFINED_FIELD_NAMES[fieldName];
    }
    async fillPdfForm(pdfBuffer, formData) {
        const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBuffer);
        const form = pdfDoc.getForm();
        if (!form) {
            throw new Error('The PDF does not contain any form fields.');
        }
        for (const [fieldName, value] of Object.entries(formData)) {
            const field = form.getFieldMaybe(fieldName);
            if (!field) {
                console.warn(`Field '${fieldName}' not found in the PDF form.`);
                continue;
            }
            if (field instanceof pdf_lib_1.PDFTextField) {
                field.setText(String(value));
            }
            else if (field instanceof pdf_lib_1.PDFDropdown) {
                field.select(String(value));
            }
            else if (field instanceof pdf_lib_1.PDFCheckBox) {
                if (value === true || value === 'true') {
                    field.check();
                }
                else {
                    field.uncheck();
                }
            }
            else if (field instanceof pdf_lib_1.PDFRadioGroup) {
                if (value) {
                    field.select(String(value));
                }
            }
            else if (field instanceof pdf_lib_1.PDFSignature) {
                await this.addSignatureToField(pdfDoc, field, value);
            }
            else {
                console.warn(`Unhandled field type for field '${fieldName}'.`);
            }
        }
        form.flatten();
        const pdfBytes = await pdfDoc.save();
        return Buffer.from(pdfBytes);
    }
    async addSignatureToField(pdfDoc, signatureField, base64Signature) {
        try {
            const base64Data = base64Signature.replace(/^data:image\/\w+;base64,/, '');
            const signatureImageBytes = Buffer.from(base64Data, 'base64');
            const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
            const widgets = signatureField.acroField.getWidgets();
            const widget = widgets[0];
            const rect = widget.getRectangle();
            const page = pdfDoc.getPages()[0];
            page.drawImage(signatureImage, {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
            });
        }
        catch (error) {
            console.error('Error adding signature to field:', error);
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PdfService);


/***/ }),

/***/ "./libs/common/entities/Attachment.ts":
/*!********************************************!*\
  !*** ./libs/common/entities/Attachment.ts ***!
  \********************************************/
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
exports.Attachment = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const Document_1 = __webpack_require__(/*! ./Document */ "./libs/common/entities/Document.ts");
let Attachment = class Attachment {
};
exports.Attachment = Attachment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Attachment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Attachment.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document_1.Document, (document) => document.attachments, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", typeof (_a = typeof Document_1.Document !== "undefined" && Document_1.Document) === "function" ? _a : Object)
], Attachment.prototype, "document", void 0);
exports.Attachment = Attachment = __decorate([
    (0, typeorm_1.Entity)()
], Attachment);


/***/ }),

/***/ "./libs/common/entities/Document.ts":
/*!******************************************!*\
  !*** ./libs/common/entities/Document.ts ***!
  \******************************************/
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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Document = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const TemplatesDocuments_1 = __webpack_require__(/*! ./TemplatesDocuments */ "./libs/common/entities/TemplatesDocuments.ts");
const DocumentFieldValue_1 = __webpack_require__(/*! ./DocumentFieldValue */ "./libs/common/entities/DocumentFieldValue.ts");
const Attachment_1 = __webpack_require__(/*! ./Attachment */ "./libs/common/entities/Attachment.ts");
let Document = class Document {
};
exports.Document = Document;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Document.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Document.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Document.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Document.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "documentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Document.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Document.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TemplatesDocuments_1.TemplatesDocuments, (template) => template.documents, {
        nullable: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", typeof (_c = typeof TemplatesDocuments_1.TemplatesDocuments !== "undefined" && TemplatesDocuments_1.TemplatesDocuments) === "function" ? _c : Object)
], Document.prototype, "documentTemplate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DocumentFieldValue_1.DocumentFieldValue, (fieldValue) => fieldValue.document, {
        cascade: ['remove'],
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], Document.prototype, "fieldValues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Attachment_1.Attachment, (attachment) => attachment.document, {
        cascade: ['remove'],
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], Document.prototype, "attachments", void 0);
exports.Document = Document = __decorate([
    (0, typeorm_1.Entity)()
], Document);


/***/ }),

/***/ "./libs/common/entities/DocumentFieldValue.ts":
/*!****************************************************!*\
  !*** ./libs/common/entities/DocumentFieldValue.ts ***!
  \****************************************************/
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
exports.DocumentFieldValue = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const Document_1 = __webpack_require__(/*! ./Document */ "./libs/common/entities/Document.ts");
const TemplateField_1 = __webpack_require__(/*! ./TemplateField */ "./libs/common/entities/TemplateField.ts");
let DocumentFieldValue = class DocumentFieldValue {
};
exports.DocumentFieldValue = DocumentFieldValue;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DocumentFieldValue.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], DocumentFieldValue.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Document_1.Document, (document) => document.fieldValues, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", typeof (_a = typeof Document_1.Document !== "undefined" && Document_1.Document) === "function" ? _a : Object)
], DocumentFieldValue.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TemplateField_1.TemplateField, (templateField) => templateField.fieldValues, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", typeof (_b = typeof TemplateField_1.TemplateField !== "undefined" && TemplateField_1.TemplateField) === "function" ? _b : Object)
], DocumentFieldValue.prototype, "templateField", void 0);
exports.DocumentFieldValue = DocumentFieldValue = __decorate([
    (0, typeorm_1.Entity)()
], DocumentFieldValue);


/***/ }),

/***/ "./libs/common/entities/PredefinedFields.ts":
/*!**************************************************!*\
  !*** ./libs/common/entities/PredefinedFields.ts ***!
  \**************************************************/
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
exports.PredefinedFields = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let PredefinedFields = class PredefinedFields {
};
exports.PredefinedFields = PredefinedFields;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PredefinedFields.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PredefinedFields.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PredefinedFields.prototype, "value", void 0);
exports.PredefinedFields = PredefinedFields = __decorate([
    (0, typeorm_1.Entity)()
], PredefinedFields);


/***/ }),

/***/ "./libs/common/entities/TemplateField.ts":
/*!***********************************************!*\
  !*** ./libs/common/entities/TemplateField.ts ***!
  \***********************************************/
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
exports.TemplateField = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const TemplatesDocuments_1 = __webpack_require__(/*! ./TemplatesDocuments */ "./libs/common/entities/TemplatesDocuments.ts");
const DocumentFieldValue_1 = __webpack_require__(/*! ./DocumentFieldValue */ "./libs/common/entities/DocumentFieldValue.ts");
let TemplateField = class TemplateField {
};
exports.TemplateField = TemplateField;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TemplateField.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplateField.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplateField.prototype, "dataType", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TemplateField.prototype, "isOptional", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TemplateField.prototype, "isUserData", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TemplateField.prototype, "isPredefined", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TemplateField.prototype, "isForDeanToFill", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Array)
], TemplateField.prototype, "options", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => TemplatesDocuments_1.TemplatesDocuments, (template) => template.templateFields, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", typeof (_a = typeof TemplatesDocuments_1.TemplatesDocuments !== "undefined" && TemplatesDocuments_1.TemplatesDocuments) === "function" ? _a : Object)
], TemplateField.prototype, "template", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DocumentFieldValue_1.DocumentFieldValue, (fieldValue) => fieldValue.templateField),
    __metadata("design:type", Array)
], TemplateField.prototype, "fieldValues", void 0);
exports.TemplateField = TemplateField = __decorate([
    (0, typeorm_1.Entity)()
], TemplateField);


/***/ }),

/***/ "./libs/common/entities/TemplatesDocuments.ts":
/*!****************************************************!*\
  !*** ./libs/common/entities/TemplatesDocuments.ts ***!
  \****************************************************/
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
exports.TemplatesDocuments = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const Document_1 = __webpack_require__(/*! ./Document */ "./libs/common/entities/Document.ts");
const TemplateField_1 = __webpack_require__(/*! ./TemplateField */ "./libs/common/entities/TemplateField.ts");
let TemplatesDocuments = class TemplatesDocuments {
};
exports.TemplatesDocuments = TemplatesDocuments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TemplatesDocuments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplatesDocuments.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplatesDocuments.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TemplatesDocuments.prototype, "visibleForStudents", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document_1.Document, (document) => document.documentTemplate, {
        cascade: ['remove'],
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], TemplatesDocuments.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TemplatesDocuments.prototype, "templateFileName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TemplateField_1.TemplateField, (field) => field.template, {
        cascade: ['remove'],
        onDelete: 'CASCADE',
        orphanedRowAction: 'delete',
    }),
    __metadata("design:type", Array)
], TemplatesDocuments.prototype, "templateFields", void 0);
exports.TemplatesDocuments = TemplatesDocuments = __decorate([
    (0, typeorm_1.Entity)()
], TemplatesDocuments);


/***/ }),

/***/ "./libs/common/src/constants/predefined-fields-names.ts":
/*!**************************************************************!*\
  !*** ./libs/common/src/constants/predefined-fields-names.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PREDEFINED_FIELD_NAMES = void 0;
exports.PREDEFINED_FIELD_NAMES = {
    dean: true,
    qualityOfEducationDean: true,
    academicYear: true,
};


/***/ }),

/***/ "./libs/common/src/constants/user-property.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/constants/user-property.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_PROPERTY = void 0;
exports.USER_PROPERTY = {
    id: true,
    email: true,
    password: true,
    role: true,
    phoneNumber: true,
    bankAccount: true,
    accountNumber: true,
    accountCurrency: true,
    bankName: true,
    firstName: true,
    lastName: true,
    albumNumber: true,
    fieldOfStudy: true,
    year: true,
    semester: true,
    studyForm: true,
    studyLevel: true,
    permanentStreet: true,
    permanentCity: true,
    permanentPostalCode: true,
    permanentNumber: true,
    correspondenceStreet: true,
    correspondenceCity: true,
    correspondencePostalCode: true,
    correspondenceNumber: true,
};


/***/ }),

/***/ "./libs/common/src/dtos/create-predfefined-fields.dto.ts":
/*!***************************************************************!*\
  !*** ./libs/common/src/dtos/create-predfefined-fields.dto.ts ***!
  \***************************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./libs/common/src/dtos/document-sorting-params.ts":
/*!*********************************************************!*\
  !*** ./libs/common/src/dtos/document-sorting-params.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/common/src/dtos/upload-pdf-template.dto.ts":
/*!*********************************************************!*\
  !*** ./libs/common/src/dtos/upload-pdf-template.dto.ts ***!
  \*********************************************************/
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
exports.UploadPDFTemplateDTO = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class UploadPDFTemplateDTO {
}
exports.UploadPDFTemplateDTO = UploadPDFTemplateDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadPDFTemplateDTO.prototype, "filename", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadPDFTemplateDTO.prototype, "mimetype", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UploadPDFTemplateDTO.prototype, "fileData", void 0);


/***/ }),

/***/ "./libs/common/src/rabbitmq/rabbit.module.ts":
/*!***************************************************!*\
  !*** ./libs/common/src/rabbitmq/rabbit.module.ts ***!
  \***************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const rabbit_service_1 = __webpack_require__(/*! ./rabbit.service */ "./libs/common/src/rabbitmq/rabbit.service.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
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

/***/ "./libs/common/src/rabbitmq/rabbit.service.ts":
/*!****************************************************!*\
  !*** ./libs/common/src/rabbitmq/rabbit.service.ts ***!
  \****************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const common_2 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
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
    async processRequest({ pattern, payload, service, timeoutMs = 2000, }) {
        try {
            return (0, rxjs_1.firstValueFrom)(service.send(pattern, payload).pipe((0, rxjs_1.timeout)(timeoutMs)));
        }
        catch (error) {
            common_2.Logger.error(`Failed to process request with pattern: ${pattern}`, error.message);
            throw error;
        }
    }
    async processEvent({ pattern, payload, service, }) {
        service.emit(pattern, payload);
    }
};
exports.RabbitService = RabbitService;
exports.RabbitService = RabbitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], RabbitService);


/***/ }),

/***/ "@aws-sdk/client-s3":
/*!*************************************!*\
  !*** external "@aws-sdk/client-s3" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "pdf-lib":
/*!**************************!*\
  !*** external "pdf-lib" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("pdf-lib");

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("typeorm");

/***/ })

/******/ 	});
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
/*!***********************************!*\
  !*** ./apps/document/src/main.ts ***!
  \***********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const document_module_1 = __webpack_require__(/*! ./document.module */ "./apps/document/src/document.module.ts");
const rabbit_service_1 = __webpack_require__(/*! @app/common/rabbitmq/rabbit.service */ "./libs/common/src/rabbitmq/rabbit.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(document_module_1.DocumentModule);
    const rabbitMqService = app.get(rabbit_service_1.RabbitService);
    app.connectMicroservice(rabbitMqService.getOptions('DOCUMENTS', false));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;