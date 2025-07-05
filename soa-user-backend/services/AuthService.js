const bcrypt = require("bcrypt");
const uuid = require("uuid");

const { ApiError } = require('common-lib');

const userRepository = require("../repositories/UserRepository");
const errorMessagesEnum = require("../error/ErrorMessagesEnum");

const roleService = require("./RoleService");
const sessionService = require("./SessionService");
const {jwtService} = require("common-lib");

const UserAuthDto = require("../dtos/user/UserAuthDto");
const UserEntity = require("../entities/UserEntity");
const TokenPairDto = require("../dtos/jwt/TokenPairDto");

class AuthService {
    async registration(userData) {
        const { email, password } = userData;

        const candidate = await userRepository.getUserByEmail(email);
        if (candidate) throw ApiError.badRequest(errorMessagesEnum.USER_ALREADY_EXISTS);

        const userRole = await roleService.getRoleByName("USER");
        const hashPassword = await bcrypt.hash(password, 5);

        const userEntity = new UserEntity(userData);
        userEntity.password = hashPassword;
        userEntity.role_id = userRole.role_id;
        const user = await userRepository.createUser(userEntity);

        const userAuthDto = new UserAuthDto(user);

        return {...userAuthDto};
    }

    async login(userLoginData) {
        const { email, password } = userLoginData;

        const user = await userRepository.getUserByEmail(email);
        if (!user) throw ApiError.badRequest(errorMessagesEnum.USER_NOT_REGISTERED);

        const userRole = await roleService.getRole(user.role_id);

        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) throw ApiError.badRequest(errorMessagesEnum.USER_INVALID_PASSWORD);

        user.access_hash = uuid.v4();
        user.refresh_hash = uuid.v4();

        await userRepository.saveModel(user);
        const userAuthDto = new UserAuthDto(user);

        const tokens = this.generateTokenPair(userAuthDto, userRole, user);

        const sessionId = await sessionService.startSession(user.user_id);

        return {...userAuthDto, tokens: tokens, sessionId};
    }

    async logout(accessToken, sessionId) {
        const data = jwtService.verifyToken(accessToken);
        const user = await userRepository.getUserByFields([{access_hash: data.accessHash}]);
        if (user) {
            await sessionService.endSession(sessionId);
            await userRepository.updateUser({access_hash: "", refresh_hash: ""}, user.user_id);
        }
    }

    async refreshSession(refreshToken) {
        if (!refreshToken) throw ApiError.unauthorized();

        const userData = jwtService.verifyToken(refreshToken);
        if (!userData) throw ApiError.unauthorized();

        const user = await userRepository.getUserByFields([
            {refresh_hash: userData.refreshHash},
        ]);
        if (!user) throw ApiError.unauthorized();

        const userRole = await roleService.getRole(user.role_id);

        user.access_hash = uuid.v4();
        user.refresh_hash = uuid.v4();

        await userRepository.saveModel(user);
        const userAuthDto = new UserAuthDto(user);

        const tokens = this.generateTokenPair(userAuthDto, userRole, user);

        return {...userAuthDto, tokens: tokens};
    }

    generateTokenPair(userAuthDto, role, user) {
        const tokenPairDto = new TokenPairDto(userAuthDto);

        tokenPairDto.role_name = role.name;
        tokenPairDto.access_hash = user.access_hash;
        tokenPairDto.refresh_hash = user.refresh_hash;

        return jwtService.generateTokens(tokenPairDto);
    }
}

module.exports = new AuthService();