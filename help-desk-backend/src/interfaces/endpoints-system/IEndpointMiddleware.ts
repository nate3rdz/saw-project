import { MIDDLEWARES_NAME } from "../../middlewares/index";

export default interface IEndpointMiddleware{
    identifier: MIDDLEWARES_NAME,
    dest: 'pre' | 'post'
}