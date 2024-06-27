import { NextFunction, Request, Response } from "express";
import IEndpointMiddleware from "./IEndpointMiddleware";
import IEndpointValidator from "./IEndpointValidator";

export type EndpointFunction<R, S, T> = (req: R, res: S) => Promise<T>;
export type EndpointMethods = "post" | "get" | "patch" | "put" | "delete";

export default interface IEndpoint<R extends Request, S extends Response, T> {
    method: EndpointMethods,
    function: EndpointFunction<R, S, T>,
    validators: IEndpointValidator[],
    middlewares: IEndpointMiddleware[],
    auth: boolean,
    path: string
}