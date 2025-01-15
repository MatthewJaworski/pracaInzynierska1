/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/auth/src/authorization/authorization.controller.ts":
/*!*****************************************************************!*\
  !*** ./apps/auth/src/authorization/authorization.controller.ts ***!
  \*****************************************************************/
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
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const local_auth_guard_1 = __webpack_require__(/*! ./guards/local-auth-guard */ "./apps/auth/src/authorization/guards/local-auth-guard.ts");
const current_user_decorator_1 = __webpack_require__(/*! ../current-user-decorator */ "./apps/auth/src/current-user-decorator.ts");
const User_1 = __webpack_require__(/*! ../../../../libs/common/entities/User */ "./libs/common/entities/User.ts");
const authorization_service_1 = __webpack_require__(/*! ./authorization.service */ "./apps/auth/src/authorization/authorization.service.ts");
const express_1 = __webpack_require__(/*! express */ "express");
const jwt_auth_guard_1 = __webpack_require__(/*! ./guards/jwt-auth-guard */ "./apps/auth/src/authorization/guards/jwt-auth-guard.ts");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
let AuthorizationController = class AuthorizationController {
    constructor(authorizationService) {
        this.authorizationService = authorizationService;
    }
    async login(user, response) {
        await this.authorizationService.login(user, response);
        const { password, ...safeUser } = user;
        return response.send(safeUser);
    }
    async refreshTokens(request, response) {
        const authHeader = request.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Refresh token is missing');
        }
        const refreshToken = authHeader.split(' ')[1];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token is missing');
        }
        await this.authorizationService.refreshTokens(refreshToken, response);
        return response.send({ message: 'Tokens refreshed' });
    }
    async validateUser(user) {
        return user;
    }
};
exports.AuthorizationController = AuthorizationController;
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof User_1.User !== "undefined" && User_1.User) === "function" ? _b : Object, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object, typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "refreshTokens", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, microservices_1.MessagePattern)('validate_user'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof User_1.User !== "undefined" && User_1.User) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthorizationController.prototype, "validateUser", null);
exports.AuthorizationController = AuthorizationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof authorization_service_1.AuthorizationService !== "undefined" && authorization_service_1.AuthorizationService) === "function" ? _a : Object])
], AuthorizationController);


/***/ }),

/***/ "./apps/auth/src/authorization/authorization.module.ts":
/*!*************************************************************!*\
  !*** ./apps/auth/src/authorization/authorization.module.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthorizationModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const authorization_service_1 = __webpack_require__(/*! ./authorization.service */ "./apps/auth/src/authorization/authorization.service.ts");
const user_module_1 = __webpack_require__(/*! ../users/user.module */ "./apps/auth/src/users/user.module.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt.strategy */ "./apps/auth/src/authorization/strategies/jwt.strategy.ts");
const local_strategy_1 = __webpack_require__(/*! ./strategies/local.strategy */ "./apps/auth/src/authorization/strategies/local.strategy.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const joi = __webpack_require__(/*! joi */ "joi");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const User_1 = __webpack_require__(/*! ../../../../libs/common/entities/User */ "./libs/common/entities/User.ts");
const rabbit_module_1 = __webpack_require__(/*! @app/common/rabbitmq/rabbit.module */ "./libs/common/src/rabbitmq/rabbit.module.ts");
const authorization_controller_1 = __webpack_require__(/*! ./authorization.controller */ "./apps/auth/src/authorization/authorization.controller.ts");
let AuthorizationModule = class AuthorizationModule {
};
exports.AuthorizationModule = AuthorizationModule;
exports.AuthorizationModule = AuthorizationModule = __decorate([
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
                    PORT: joi.string().required(),
                    RABBITMQ_URL: joi.string().required(),
                    RABBITMQ_USERS_QUEUE: joi.string().required(),
                    JWT_SECRET_KEY: joi.string().required(),
                    JWT_ACCESS_TOKEN_EXPIRATION_TIME: joi.string().required(),
                    JWT_REFRESH_TOKEN_EXPIRATION_TIME: joi.string().required(),
                }),
                envFilePath: './apps/auth/.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: process.env.DATABASE_HOST,
                port: parseInt(process.env.DATABASE_PORT),
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                entities: [User_1.User],
                synchronize: true,
                options: {
                    trustServerCertificate: true,
                },
            }),
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET_KEY'),
                    signOptions: {
                        expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            user_module_1.UserModule,
            rabbit_module_1.RabbitModule,
        ],
        controllers: [authorization_controller_1.AuthorizationController],
        providers: [authorization_service_1.AuthorizationService, jwt_strategy_1.JwtStrategy, local_strategy_1.LocalStrategy],
    })
], AuthorizationModule);


/***/ }),

/***/ "./apps/auth/src/authorization/authorization.service.ts":
/*!**************************************************************!*\
  !*** ./apps/auth/src/authorization/authorization.service.ts ***!
  \**************************************************************/
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
exports.AuthorizationService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ../users/user.service */ "./apps/auth/src/users/user.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
let AuthorizationService = class AuthorizationService {
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Credentials are invalid');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credentials are invalid');
        }
        return user;
    }
    async login(user, response) {
        const TokenPayload = { userId: user.id, role: user.role };
        const accessToken = this.jwtService.sign(TokenPayload, {
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`,
        });
        const refreshToken = this.jwtService.sign(TokenPayload, {
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`,
        });
        response.cookie('Authentication', accessToken, {
            httpOnly: true,
            path: '/',
            maxAge: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME') * 1000,
        });
        response.cookie('Refresh', refreshToken, {
            httpOnly: true,
            path: '/',
            maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME') * 1000,
        });
    }
    async refreshTokens(refreshToken, response) {
        try {
            const { userId } = this.jwtService.verify(refreshToken, {
                secret: this.configService.get('JWT_SECRET_KEY'),
            });
            const user = await this.userService.getUserById(userId);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            await this.login(user, response);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthorizationService = AuthorizationService;
exports.AuthorizationService = AuthorizationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _c : Object])
], AuthorizationService);


/***/ }),

/***/ "./apps/auth/src/authorization/guards/jwt-auth-guard.ts":
/*!**************************************************************!*\
  !*** ./apps/auth/src/authorization/guards/jwt-auth-guard.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.JwtAuthGuard = JwtAuthGuard;


/***/ }),

/***/ "./apps/auth/src/authorization/guards/local-auth-guard.ts":
/*!****************************************************************!*\
  !*** ./apps/auth/src/authorization/guards/local-auth-guard.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
}
exports.LocalAuthGuard = LocalAuthGuard;


/***/ }),

/***/ "./apps/auth/src/authorization/strategies/jwt.strategy.ts":
/*!****************************************************************!*\
  !*** ./apps/auth/src/authorization/strategies/jwt.strategy.ts ***!
  \****************************************************************/
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
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const user_service_1 = __webpack_require__(/*! ../../users/user.service */ "./apps/auth/src/users/user.service.ts");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(userService, configService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    return request?.Authentication;
                },
            ]),
            secretOrKey: configService.get('JWT_SECRET_KEY'),
        });
        this.userService = userService;
    }
    async validate({ userId }) {
        try {
            return await this.userService.getUserById(userId);
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),

/***/ "./apps/auth/src/authorization/strategies/local.strategy.ts":
/*!******************************************************************!*\
  !*** ./apps/auth/src/authorization/strategies/local.strategy.ts ***!
  \******************************************************************/
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
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_local_1 = __webpack_require__(/*! passport-local */ "passport-local");
const authorization_service_1 = __webpack_require__(/*! ../authorization.service */ "./apps/auth/src/authorization/authorization.service.ts");
let LocalStrategy = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy) {
    constructor(authorizationService) {
        super({ usernameField: 'email' });
        this.authorizationService = authorizationService;
    }
    async validate(email, password) {
        return await this.authorizationService.validateUser(email, password);
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof authorization_service_1.AuthorizationService !== "undefined" && authorization_service_1.AuthorizationService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),

/***/ "./apps/auth/src/current-user-decorator.ts":
/*!*************************************************!*\
  !*** ./apps/auth/src/current-user-decorator.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = exports.getCurrentUserByContext = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const getCurrentUserByContext = (context) => {
    return context.switchToHttp().getRequest().user;
};
exports.getCurrentUserByContext = getCurrentUserByContext;
exports.CurrentUser = (0, common_1.createParamDecorator)((_data, context) => (0, exports.getCurrentUserByContext)(context));


/***/ }),

/***/ "./apps/auth/src/users/user.controller.ts":
/*!************************************************!*\
  !*** ./apps/auth/src/users/user.controller.ts ***!
  \************************************************/
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
exports.UserController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const create_user_dto_1 = __webpack_require__(/*! @app/common/dtos/create-user.dto */ "./libs/common/src/dtos/create-user.dto.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/auth/src/users/user.service.ts");
const update_user_dto_1 = __webpack_require__(/*! @app/common/dtos/update-user.dto */ "./libs/common/src/dtos/update-user.dto.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async handleUserCreated(data) {
        return await this.userService.createUser(data);
    }
    async handleUsersCreated(data) {
        return await this.userService.createUserMany(data);
    }
    async handleGetUser(id) {
        return await this.userService.getUser(id);
    }
    async handleUpdateUser(data) {
        return await this.userService.updateUser(data);
    }
};
exports.UserController = UserController;
__decorate([
    (0, microservices_1.MessagePattern)('create_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUserCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)('create_user_many'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUsersCreated", null);
__decorate([
    (0, microservices_1.MessagePattern)('get_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleGetUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('update_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "handleUpdateUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('/api/user'),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),

/***/ "./apps/auth/src/users/user.module.ts":
/*!********************************************!*\
  !*** ./apps/auth/src/users/user.module.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_controller_1 = __webpack_require__(/*! ./user.controller */ "./apps/auth/src/users/user.controller.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./apps/auth/src/users/user.service.ts");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const User_1 = __webpack_require__(/*! ../../../../libs/common/entities/User */ "./libs/common/entities/User.ts");
const rabbit_module_1 = __webpack_require__(/*! @app/common/rabbitmq/rabbit.module */ "./libs/common/src/rabbitmq/rabbit.module.ts");
const common_2 = __webpack_require__(/*! @app/common */ "./libs/common/src/index.ts");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([User_1.User]), rabbit_module_1.RabbitModule, common_2.AuthModule],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),

/***/ "./apps/auth/src/users/user.service.ts":
/*!*********************************************!*\
  !*** ./apps/auth/src/users/user.service.ts ***!
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const User_1 = __webpack_require__(/*! ../../../../libs/common/entities/User */ "./libs/common/entities/User.ts");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcryptjs */ "bcryptjs");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async createUser(request) {
        return this.handleTransaction(async (manager) => {
            const user = manager.create(User_1.User, {
                ...request,
                password: await bcrypt.hash(request.password, 10),
            });
            await manager.save(User_1.User, user);
        });
    }
    async createUserMany(request) {
        return this.handleTransaction(async (manager) => {
            const users = await Promise.all(request.map(async (userDto) => {
                return manager.create(User_1.User, {
                    ...userDto,
                    password: await bcrypt.hash(userDto.password, 10),
                });
            }));
            await manager.save(User_1.User, users);
        });
    }
    async updateUser(request) {
        return this.handleTransaction(async (manager) => {
            const user = await manager.preload(User_1.User, { ...request });
            if (!user) {
                throw new Error('User not found');
            }
            await manager.save(User_1.User, user);
        });
    }
    async getUser(id) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) {
            return { success: false, data: null };
        }
        const { password, ...userWithoutPassword } = user;
        return { success: true, data: userWithoutPassword };
    }
    async getUserByEmail(email) {
        return this.repository.findOne({ where: { email } });
    }
    async getUserById(id) {
        return this.repository.findOne({ where: { id } });
    }
    async handleTransaction(operation) {
        const queryRunner = this.repository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await operation(queryRunner.manager);
            await queryRunner.commitTransaction();
            return { success: true };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], UserService);


/***/ }),

/***/ "./libs/common/entities/User.ts":
/*!**************************************!*\
  !*** ./libs/common/entities/User.ts ***!
  \**************************************/
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
exports.User = void 0;
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 15 }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "bankAccount", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "accountCurrency", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bankName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "albumNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "semester", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "studyForm", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "studyLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "permanentStreet", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], User.prototype, "permanentCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], User.prototype, "permanentPostalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10 }),
    __metadata("design:type", String)
], User.prototype, "permanentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "correspondenceStreet", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "correspondenceCity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "correspondencePostalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 10, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "correspondenceNumber", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);


/***/ }),

/***/ "./libs/common/src/auth/auth.module.ts":
/*!*********************************************!*\
  !*** ./libs/common/src/auth/auth.module.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const rabbit_module_1 = __webpack_require__(/*! ../rabbitmq/rabbit.module */ "./libs/common/src/rabbitmq/rabbit.module.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cookieParser = __webpack_require__(/*! cookie-parser */ "cookie-parser");
const services_1 = __webpack_require__(/*! ../constants/services */ "./libs/common/src/constants/services.ts");
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

/***/ "./libs/common/src/auth/jwt-auth.guard.ts":
/*!************************************************!*\
  !*** ./libs/common/src/auth/jwt-auth.guard.ts ***!
  \************************************************/
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
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const microservices_1 = __webpack_require__(/*! @nestjs/microservices */ "@nestjs/microservices");
const rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
const services_1 = __webpack_require__(/*! ../constants/services */ "./libs/common/src/constants/services.ts");
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

/***/ "./libs/common/src/common/common.module.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/common/common.module.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const common_service_1 = __webpack_require__(/*! ./common.service */ "./libs/common/src/common/common.service.ts");
const rabbit_service_1 = __webpack_require__(/*! ../rabbitmq/rabbit.service */ "./libs/common/src/rabbitmq/rabbit.service.ts");
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

/***/ "./libs/common/src/common/common.service.ts":
/*!**************************************************!*\
  !*** ./libs/common/src/common/common.service.ts ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CommonService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
let CommonService = class CommonService {
};
exports.CommonService = CommonService;
exports.CommonService = CommonService = __decorate([
    (0, common_1.Injectable)()
], CommonService);


/***/ }),

/***/ "./libs/common/src/constants/services.ts":
/*!***********************************************!*\
  !*** ./libs/common/src/constants/services.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DOCUMENTS_SERVICE = exports.AUTH_SERVICE = void 0;
exports.AUTH_SERVICE = 'USERS';
exports.DOCUMENTS_SERVICE = 'DOCUMENTS';


/***/ }),

/***/ "./libs/common/src/dtos/create-user.dto.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/dtos/create-user.dto.ts ***!
  \*************************************************/
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
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const role_1 = __webpack_require__(/*! ../types/role */ "./libs/common/src/types/role.ts");
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
    __metadata("design:type", String)
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
    __metadata("design:type", String)
], CreateUserDto.prototype, "fieldOfStudy", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "year", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "semester", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "studyForm", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
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

/***/ "./libs/common/src/dtos/update-user.dto.ts":
/*!*************************************************!*\
  !*** ./libs/common/src/dtos/update-user.dto.ts ***!
  \*************************************************/
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
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
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

/***/ "./libs/common/src/index.ts":
/*!**********************************!*\
  !*** ./libs/common/src/index.ts ***!
  \**********************************/
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
__exportStar(__webpack_require__(/*! ./common/common.module */ "./libs/common/src/common/common.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./common/common.service */ "./libs/common/src/common/common.service.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/auth.module */ "./libs/common/src/auth/auth.module.ts"), exports);
__exportStar(__webpack_require__(/*! ./auth/jwt-auth.guard */ "./libs/common/src/auth/jwt-auth.guard.ts"), exports);


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

/***/ "./libs/common/src/types/role.ts":
/*!***************************************!*\
  !*** ./libs/common/src/types/role.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


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

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/microservices":
/*!****************************************!*\
  !*** external "@nestjs/microservices" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@nestjs/microservices");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("cookie-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),

/***/ "passport-local":
/*!*********************************!*\
  !*** external "passport-local" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("passport-local");

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
/*!*******************************!*\
  !*** ./apps/auth/src/main.ts ***!
  \*******************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const rabbit_service_1 = __webpack_require__(/*! @app/common/rabbitmq/rabbit.service */ "./libs/common/src/rabbitmq/rabbit.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const authorization_module_1 = __webpack_require__(/*! ./authorization/authorization.module */ "./apps/auth/src/authorization/authorization.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(authorization_module_1.AuthorizationModule);
    const rabbitMqService = app.get(rabbit_service_1.RabbitService);
    app.connectMicroservice(rabbitMqService.getOptions('USERS'));
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configService = app.get(config_1.ConfigService);
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        credentials: true,
    });
    await app.startAllMicroservices();
    await app.listen(configService.get('PORT'));
}
bootstrap();

})();

/******/ })()
;