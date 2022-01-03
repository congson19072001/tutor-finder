import { MyContext } from "../types/MyContext"
import { MiddlewareFn } from "type-graphql"
import { AuthenticationError } from "apollo-server-core"

export const checkAuthUser: MiddlewareFn<MyContext> = ({context}, next) => {
    if (!context.req.session!.userId) {
        throw new AuthenticationError("you must be logged in as an user")
    }
    return next()
}

export const checkAuthTutor: MiddlewareFn<MyContext> = ({context}, next) => {
    if (!context.req.session!.tutorId) {
        throw new AuthenticationError("you must be logged in as a tutor")
    }
    return next()
}

export const checkAuthAdmin: MiddlewareFn<MyContext> = ({context}, next) => {
    if (!context.req.session!.adminId) {
        throw new AuthenticationError("you must be logged in as an admin")
    }
    return next()
}
