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
exports.CommentsModule = void 0;
const common_1 = __webpack_require__(3);
const comments_controller_1 = __webpack_require__(4);
const comments_service_1 = __webpack_require__(5);
const joi = __webpack_require__(9);
const config_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(6);
const rabbit_module_1 = __webpack_require__(11);
const Comment_1 = __webpack_require__(7);
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
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
                    RABBITMQ_COMMENTS_QUEUE: joi.string().required(),
                }),
                envFilePath: './apps/comments/.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [Comment_1.Comment],
                synchronize: true,
                logging: true,
                options: {
                    trustServerCertificate: true,
                },
            }),
            rabbit_module_1.RabbitModule,
            typeorm_1.TypeOrmModule.forFeature([Comment_1.Comment]),
        ],
        controllers: [comments_controller_1.CommentsController],
        providers: [comments_service_1.CommentsService],
    })
], CommentsModule);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsController = void 0;
const common_1 = __webpack_require__(3);
const comments_service_1 = __webpack_require__(5);
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    getHello() {
        return this.commentsService.getHello();
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], CommentsController.prototype, "getHello", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof comments_service_1.CommentsService !== "undefined" && comments_service_1.CommentsService) === "function" ? _a : Object])
], CommentsController);


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
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommentsService = void 0;
const common_1 = __webpack_require__(3);
const typeorm_1 = __webpack_require__(6);
const Comment_1 = __webpack_require__(7);
const typeorm_2 = __webpack_require__(8);
let CommentsService = class CommentsService {
    constructor(repository) {
        this.repository = repository;
    }
    getHello() {
        return 'Hello World!';
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Comment_1.Comment)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], CommentsService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 7 */
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
exports.Comment = void 0;
const typeorm_1 = __webpack_require__(8);
let Comment = class Comment {
};
exports.Comment = Comment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "documentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "userRole", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Comment.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Comment.prototype, "createdDate", void 0);
exports.Comment = Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 11 */
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
const rabbit_service_1 = __webpack_require__(12);
const microservices_1 = __webpack_require__(13);
const config_1 = __webpack_require__(10);
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
/* 12 */
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
const config_1 = __webpack_require__(10);
const microservices_1 = __webpack_require__(13);
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
/* 13 */
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

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
const comments_module_1 = __webpack_require__(2);
const rabbit_service_1 = __webpack_require__(12);
const common_1 = __webpack_require__(3);
console.log('Database Config:', {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(comments_module_1.CommentsModule);
    const rabbitMqService = app.get(rabbit_service_1.RabbitService);
    app.connectMicroservice(rabbitMqService.getOptions('COMMENTS'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.startAllMicroservices();
}
bootstrap();

})();

/******/ })()
;