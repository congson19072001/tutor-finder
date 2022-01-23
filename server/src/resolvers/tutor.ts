import { Tutor } from "../entities/Tutor";
import { Arg,  Ctx,  FieldResolver,  Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import argon2 from "argon2";
import { TutorMutationResponse } from "../types/TutorMutationResponse";
import { RegisterInput } from "../types/RegisterInput";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { MyContext } from "../types/MyContext";
import { COOKIE_NAME } from "../constants";
//import { Subject } from "../entities/Subject";
import { checkAuthAdmin } from "../middleware/checkAuth";
import { Subject } from "../entities/Subject";
import { TutorProfile } from "../entities/TutorProfile";
import { TutorGender, Province } from "../entities/TutorProfile";

@Resolver(_of => Tutor)
export class TutorResolver {

    // @FieldResolver(_return => [Subject])
    // async subjects(@Root() root : Tutor){
    //     return await Subject.find({tutorId: root.id});
    // }
    //

    @FieldResolver(_return => [Subject])
    async subjects(
        @Root() root: Subject,
        @Ctx() { dataLoaders : {subjectsLoader}} : MyContext
    ): Promise<Subject[] | undefined> {
        return await subjectsLoader.load(root.id);
    }

    @Query(_return => Tutor, {nullable: true})
    async meTutor(
        @Ctx() ctx: MyContext
    ): Promise<Tutor| undefined | null> {
        if(!ctx.req.session.tutorId) {
            return null;
        }
        const tutor = await Tutor.findOne(ctx.req.session.tutorId, {relations: ["profile"]});
        return tutor;

    }
    @Mutation(_return => TutorMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async registerTutor(
        @Arg("registerInput") registerInput: RegisterInput,
        @Ctx() ctx: MyContext
    ) : Promise<TutorMutationResponse> {
        const validateRegisterInputErrors = validateRegisterInput(registerInput);
        if(validateRegisterInputErrors !== null) {
            return {
                code: 400,
                success: false,
                ...validateRegisterInputErrors
            }
        }
        try{
            const {username, email, password, fullName, salary, avatar, province, bio, address, age, gender} = registerInput;
            const existingTutor = await Tutor.findOne({where: [{email}, {username}]});
            if (existingTutor) {
                return {
                    code: 400,
                    success: false,
                    message: "Tutor already exists",
                    errors: [
                        {
                            field: existingTutor.username === username ? 'username' : 'email', 
                            message: `${ existingTutor.username === username ? 'Username' : 'Email'} already exists`
                        }
                    ]
                }
            }
            let nProvince = province as Province;
            let nGender = gender as TutorGender;
            const hashedPassword = await argon2.hash(password);
            const tProfile = TutorProfile.create({
                bio,
                address,
                age,
                province: nProvince,
                gender: nGender,
                avatar
                
            });
            await tProfile.save();
            const newTutor = Tutor.create({
                email,
                username,
                password: hashedPassword,
                fullName, 
                salary, 
                profile: tProfile
                
            });
            await newTutor.save();
            ctx.req.session.tutorId = newTutor.id;
            return {
                code: 200,
                success: true,
                message: "Tutor registration successfully",
                tutor: newTutor
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

    @Mutation(_return => TutorMutationResponse)
    async loginTutor(
        @Arg('loginInput') loginInput: LoginInput,
        @Ctx() ctx: MyContext
        )
     : Promise<TutorMutationResponse>{
        const {usernameOrEmail, password} = loginInput;
        try{
            const existingTutor = await Tutor.findOne(
                usernameOrEmail.includes("@") ? {email: usernameOrEmail} : {username: usernameOrEmail});
            if(!existingTutor) {
                return {
                    code: 400,
                    success: false,
                    message: "Tutor not found",
                    errors: [
                        {
                            field: 'usernameOrEmail', 
                            message: 'Username or email incorrect'
                        }
                    ]
                }
            }
            const validPassword = await argon2.verify(existingTutor.password,password);
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
            ctx.req.session.tutorId = existingTutor.id;

            return{
                code: 200,
                success: true,
                message: "Tutor login successfully",
                tutor: existingTutor
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