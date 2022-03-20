import argon2 from "argon2";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { Admin } from "../entities/Admin";
import { checkAuthAdmin } from "../middleware/checkAuth";
import { AdminMutationResponse } from "../types/AdminMutationResponse";
import { LoginInput } from "../types/LoginInput";
import { MyContext } from "../types/MyContext";
import { AdminRegisterInput } from "../types/AdminRegisterInput";
import { validateRegisterInput } from "../utils/validateRegisterInput";

@Resolver(_of => Admin)
export class AdminResolver {


    @Query(_return => Admin, {nullable: true})
    async meAdmin(
        @Ctx() ctx: MyContext
    ): Promise<Admin| undefined | null> {
        if(!ctx.req.session.adminId) {
            return null;
        }
        const admin = await Admin.findOne(ctx.req.session.adminId);
        return admin;

    }
    @Mutation(_return => AdminMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async registerAdmin(
        @Arg("registerInput") registerInput: AdminRegisterInput,
        @Ctx() ctx: MyContext
    ) : Promise<AdminMutationResponse> {
        const validateRegisterInputErrors = validateRegisterInput(registerInput);
        if(validateRegisterInputErrors !== null) {
            return {
                code: 400,
                success: false,
                ...validateRegisterInputErrors
            }
        }
        try{
            const {username, email, password, fullName} = registerInput;
            const existingAdmin = await Admin.findOne({where: [{email}, {username}]});
            if (existingAdmin) {
                return {
                    code: 400,
                    success: false,
                    message: "Admin already exists",
                    errors: [
                        {
                            field: existingAdmin.username === username ? 'username' : 'email', 
                            message: `${ existingAdmin.username === username ? 'Username' : 'Email'} already exists`
                        }
                    ]
                }
            }
            const hashedPassword = await argon2.hash(password);
            const newAdmin = Admin.create({
                email,
                username,
                password: hashedPassword,
                fullName
            });
            await newAdmin.save();
            ctx.req.session.adminId = newAdmin.id;
            return {
                code: 200,
                success: true,
                message: "Admin registration successfully",
                admin: newAdmin
            }
        } catch(err) {
            console.log(err);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${err.message}`
            }
        }
    }

    @Mutation(_return => AdminMutationResponse)
    async loginAdmin(
        @Arg('loginInput') loginInput: LoginInput,
        @Ctx() ctx: MyContext
        )
     : Promise<AdminMutationResponse>{
        const {usernameOrEmail, password} = loginInput;
        try{
            const existingAdmin = await Admin.findOne(
                usernameOrEmail.includes("@") ? {email: usernameOrEmail} : {username: usernameOrEmail});
            if(!existingAdmin) {
                return {
                    code: 400,
                    success: false,
                    message: "Admin not found",
                    errors: [
                        {
                            field: 'usernameOrEmail', 
                            message: 'Username or email incorrect'
                        }
                    ]
                }
            }
            const validPassword = await argon2.verify(existingAdmin.password,password);
            if(!validPassword) {
                return {
                    code: 400,
                    success: false,
                    message: "Password incorrect",
                    errors: [
                        {
                            field: 'password', 
                            message: 'Password incorrect'
                        }
                    ]
                }
            }

            // Create session and return cookie
            ctx.req.session.adminId = existingAdmin.id;

            return{
                code: 200,
                success: true,
                message: "Admin login successfully",
                admin: existingAdmin
            }

        } catch(err) {
            console.log(err);
            return {
                code: 500,
                success: false,
                message: `Internal server error ${err.message}`
            }
        }
    }

    @Mutation(_return => Boolean)
    logout(
        @Ctx() ctx: MyContext
    ) : Promise<boolean> {
        return new Promise((resolve, _reject) => {
            ctx.res.clearCookie(COOKIE_NAME);
            ctx.req.session.destroy(err => {
                if(err) {
                    console.log(err);
                    resolve(false);
                }
                resolve(true);
            });
        })
    }
}