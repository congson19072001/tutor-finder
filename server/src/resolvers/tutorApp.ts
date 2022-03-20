import { TutorApplication } from "../entities/TutorApplication";
import { Arg,  Ctx,  FieldResolver,  Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import argon2 from "argon2";
import { TutorAppMutationResponse } from "../types/TutorAppMutationResponse";
import { validateRegisterInput } from "../utils/validateRegisterInput";
import { LoginInput } from "../types/LoginInput";
import { MyContext } from "../types/MyContext";
import { checkAuthAdmin, checkAuthTutor } from "../middleware/checkAuth";
import { TutorRegisterInput } from "../types/TutorRegisterInput";
import { CertificationApplication } from "../entities/CertificationApplication";
import { DiplomaApplication } from "../entities/DiplomaApplication";
import { AvailabilityApplication } from "../entities/AvailabilityApplication";
import { FillTutorApplicationInput } from "../types/FillTutorApplicationInput";
import { Subject } from "../entities/Subject";

@Resolver(_of => TutorApplication)
export class TutorApplicationResolver {


    @FieldResolver(_return => [CertificationApplication])
    async certificationApplications(
        @Root() root: TutorApplication
    ): Promise<CertificationApplication[] | undefined> {
        return await CertificationApplication.find({tutorId: root.id});
    }

    @FieldResolver(_return => [DiplomaApplication])
    async diplomaApplications(
        @Root() root: TutorApplication
    ): Promise<DiplomaApplication[] | undefined> {
        return await DiplomaApplication.find({tutorId: root.id});
    }

    @FieldResolver(_return => [AvailabilityApplication])
    async availabilityApplications(
        @Root() root: TutorApplication
    ): Promise<AvailabilityApplication[] | undefined> {
        return await AvailabilityApplication.find({tutorId: root.id});
    }

    @Query(_return => TutorApplication, {nullable: true})
    async meTutorApp(
        @Ctx() ctx: MyContext
    ): Promise<TutorApplication| undefined | null> {
        if(!ctx.req.session.tutorId) {
            return null;
        }
        const tutor = await TutorApplication.findOne(ctx.req.session.tutorId);
        return tutor;

    }

    @Query(_return => [TutorApplication], {nullable: true})
    @UseMiddleware(checkAuthAdmin)
    async getAllTutorApplications(
    ): Promise<TutorApplication[] | undefined> {
        try {
            return await TutorApplication.find();
        
        }catch(errors){
            console.log(errors);
            return undefined;
        }
    }

    @Mutation(_return => TutorAppMutationResponse)
    async registerTutorApp(
        @Arg("tutorRegisterInput") tutorRegisterInput: TutorRegisterInput,
        @Ctx() ctx: MyContext
    ) : Promise<TutorAppMutationResponse> {
        const validateRegisterInputErrors = validateRegisterInput(tutorRegisterInput);
        if(validateRegisterInputErrors !== null) {
            return {
                code: 400,
                success: false,
                ...validateRegisterInputErrors
            }
        }
        try{
            const {username, email, password, fullName} = tutorRegisterInput;
            const existingTutor = await TutorApplication.findOne({where: [{email}, {username}]});
            if (existingTutor) {
                return {
                    code: 400,
                    success: false,
                    message: "TutorApplication already exists",
                    errors: [
                        {
                            field: existingTutor.username === username ? 'username' : 'email', 
                            message: `${ existingTutor.username === username ? 'Username' : 'Email'} already exists`
                        }
                    ]
                }
            }
            const hashedPassword = await argon2.hash(password);
            
            const newTutor = TutorApplication.create({
                email,
                username,
                password: hashedPassword,
                fullName
            });
            await newTutor.save();
            ctx.req.session.tutorId = newTutor.id;
            return {
                code: 200,
                success: true,
                message: "TutorApplication registration successfully",
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

    @Mutation(_return => TutorAppMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async fillTutorApplication(
        @Arg("fillTutorAppInput") fillTutorAppInput: FillTutorApplicationInput,
        @Ctx() ctx: MyContext
    ) : Promise<TutorAppMutationResponse> {
        try {
            const tutor = await TutorApplication.findOne(ctx.req.session.tutorId);
            if(!tutor) {
                return {
                    code: 400,
                    success: false,
                    message: "TutorApplication not found"
                }
            }
            const {
                subjectId,
                gender,
                age,
                address,
                bio,
                country,
                avatar,
                advanceNotice,
                salary,
                timezone,
                videoUrl,
                bookingWindow
            } = fillTutorAppInput;
            await TutorApplication.update({id: tutor.id}, {
                subjectId : subjectId ? subjectId : tutor.subjectId,
                gender: gender ? gender : tutor.gender,
                age: age ? age : tutor.age,
                address: address ? address : tutor.address,
                bio: bio ? bio : tutor.bio,
                country: country ? country : tutor.country,
                avatar: avatar ? avatar : tutor.avatar,
                advanceNotice: advanceNotice ? advanceNotice : tutor.advanceNotice,
                salary: salary ? salary : tutor.salary,
                timezone: timezone ? timezone : tutor.timezone,
                videoUrl: videoUrl ? videoUrl : tutor.videoUrl,
                bookingWindow: bookingWindow ? bookingWindow : tutor.bookingWindow
            });
            
            return {
                code: 200,
                success: true,
                message: "TutorApplication filled successfully",
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

    @Mutation(_return => TutorAppMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async finishTutorApplication(
        @Ctx() {req: {session: {tutorId: tutorId}}, connection}: MyContext
    ): Promise<TutorAppMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication, tutorId);
            if(!tutor) {
                return {
                    code: 400,
                    success: false,
                    message: "Tutor not found",
                    errors: [{
                        field: "tutorId",
                        message: "Tutor not found"
                    }]
                }
            }
            if(!tutor.isValid){
                let subject = await transactionEntityManager.findOne(Subject, tutor.subjectId);
                if(!subject){
                    return {
                        code: 400,
                        success: false,
                        message: "Subject not found",
                        errors: [{
                            field: "subjectId",
                            message: "Subject not found"
                        }]
                    }
                }
                let errors = [];
                let isValid = true; 
                for (const [key, val] of Object.entries(tutor)) {
                    if((val === null || val === undefined) && key !== "certificationApplications" && key !== "diplomaApplications" && key !== "availabilityApplications") {
                        errors.push({
                            field: key,
                            message: `${key} is required}`
                        });
                        isValid = false;
                    } 
                }

                if (!isValid) {
                    return {
                        code: 400,
                        success: false,
                        message: "TutorApplication not filled",
                        errors : errors
                    }
                }
                await transactionEntityManager.update(TutorApplication, tutor.id, {isValid: true});
                
            }



            return {
                code: 200,
                success: true,
                message: "Tutor is valid from now on"
            }
        });
    }

    @Mutation(_return => TutorAppMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async rejectTutor(
        @Arg("tutorId") tutorId: string,
        @Ctx() myContext: MyContext
    ): Promise<TutorAppMutationResponse> {
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication, tutorId);
                if(!tutor) {
                    return {
                        code: 400,
                        success: false,
                        message: "Tutor not found",
                        errors: [{
                            field: "tutorId",
                            message: "Tutor not found"
                        }]
                    }
                }
                if(!tutor.isValid){
                    return {
                        code: 400,
                        success: false,
                        message: "Tutor is not valid",
                        errors: [{
                            field: "tutorId",
                            message: "Tutor is not valid"
                        }]
                    }
                }
                const certifications = await transactionEntityManager.find(CertificationApplication, {tutorId: tutor.id});
                if(certifications.length > 0) {
                    certifications.forEach(async (certification) => {
                        await transactionEntityManager.delete(CertificationApplication, certification.id);
                    });

                }
                const diplomas = await transactionEntityManager.find(DiplomaApplication, {tutorId: tutor.id});
                if(diplomas.length > 0) {
                    diplomas.forEach(async (diploma) => {
                        await transactionEntityManager.delete(DiplomaApplication, diploma.id);
                    });
                }

                const availabilities = await transactionEntityManager.find(AvailabilityApplication, {tutorId: tutor.id});
                if(availabilities.length > 0) {
                    availabilities.forEach(async (availability) => {
                        await transactionEntityManager.delete(AvailabilityApplication, availability.id);
                    });
                }
                
                await transactionEntityManager.delete(TutorApplication, {id: tutor.id});
                return {
                    code: 200,
                    success: true,
                    message: "Tutor is rejected"
                }
        });

    }


    @Mutation(_return => TutorAppMutationResponse)
    async loginTutorApp(
        @Arg('loginInput') loginInput: LoginInput,
        @Ctx() ctx: MyContext
        )
     : Promise<TutorAppMutationResponse>{
        const {usernameOrEmail, password} = loginInput;
        try{
            const existingTutor = await TutorApplication.findOne(
                usernameOrEmail.includes("@") ? {email: usernameOrEmail} : {username: usernameOrEmail});
            if(!existingTutor) {
                return {
                    code: 400,
                    success: false,
                    message: "TutorApplication not found",
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
                message: "TutorApplication login successfully",
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

    
}