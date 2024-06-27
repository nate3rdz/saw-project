import UserLoginTwoTest from "./user-login-two.middleware.js";
import UserLoginTest from "./user-login.middleware.js";

export const MIDDLEWARES_ARRAY = [
    'UserLoginTest',
    'UserLoginTestTwo'
] as const;
export type MIDDLEWARES_NAME = typeof MIDDLEWARES_ARRAY[number];

export const MIDDLEWARES: Record<MIDDLEWARES_NAME, (...args: any) => any> = {
    'UserLoginTest': UserLoginTest.function,
    'UserLoginTestTwo': UserLoginTwoTest.function
};