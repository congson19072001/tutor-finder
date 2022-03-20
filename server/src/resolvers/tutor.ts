import { Tutor } from "../entities/Tutor";
import { Arg,  Ctx,  FieldResolver,  Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import argon2 from "argon2";
import { TutorMutationResponse } from "../types/TutorMutationResponse";
import { LoginInput } from "../types/LoginInput";
import { MyContext } from "../types/MyContext";
import { COOKIE_NAME } from "../constants";
//import { Subject } from "../entities/Subject";
import { checkAuthAdmin } from "../middleware/checkAuth";
import { Subject } from "../entities/Subject";
import { TutorProfile } from "../entities/TutorProfile";

import { Speciality } from "../entities/Speciality";
import { Certification } from "../entities/Certification";
import { Diploma } from "../entities/Diploma";
import { Schedule } from "../entities/Schedule";
import { Availability } from "../entities/Availability";
import {Review} from "../entities/Review";
import { TutorApplication } from "../entities/TutorApplication";
import { TutorBalance } from "../entities/TutorBalance";
import { SubjectTutor } from "../entities/SubjectTutor";
import { CertificationApplication } from "../entities/CertificationApplication";
import { DiplomaApplication } from "../entities/DiplomaApplication";
import { AvailabilityApplication } from "../entities/AvailabilityApplication";
import { ForgotPasswordInput } from "../types/ForgotPassword";
import { ChangePasswordInput } from "../types/ChangePasswordInput";
import { TokenModel } from "../models/Token";
import { sendEmail } from "../utils/sendEmail";
import { v4 as uuidv4} from "uuid"; 

@Resolver(_of => Tutor)
export class TutorResolver {

    

    @FieldResolver(_return => [Subject])
    async subjects(
        @Root() root: Tutor,
        @Ctx() { dataLoaders : {tutorSubjectsLoader}} : MyContext
    ): Promise<Subject[] | undefined> {
        return await tutorSubjectsLoader.load(root.id);
    }

    @FieldResolver(_return => [Speciality])
    async specialities(
        @Root() root: Tutor,
        @Ctx() { dataLoaders : {tutorSpecialitiesLoader}} : MyContext
    ): Promise<Speciality[] | undefined> {
        return await tutorSpecialitiesLoader.load(root.id);
    }

    @FieldResolver(_return => [Certification])
    async certifications(
        @Root() root: Tutor
    ): Promise<Certification[] | undefined> {
        return await Certification.find({tutorId: root.id});
    }

    @FieldResolver(_return => [Diploma])
    async diplomas(
        @Root() root: Tutor
    ): Promise<Diploma[] | undefined> {
        return await Diploma.find({tutorId: root.id});
    }

    @FieldResolver(_return => [Schedule])
    async schedules(
        @Root() root: Tutor
    ): Promise<Schedule[] | undefined> {
        return await Schedule.find({tutorId: root.id});
    }

    @FieldResolver(_return => [Availability])
    async availabilities(
        @Root() root: Tutor
    ): Promise<Availability[] | undefined> {
        return await Availability.find({tutorId: root.id});
    }

    @FieldResolver(_return => [Review])
    async reviews(
        @Root() root: Tutor
    ): Promise<Review[] | undefined> {
        return await Review.find({tutorId: root.id});
    }

    @Query(_return => Tutor, {nullable: true})
    async meTutor(
        @Ctx() ctx: MyContext
    ): Promise<Tutor| undefined | null> {
        if(!ctx.req.session.tutorId) {
            return null;
        }
        const tutor = await Tutor.findOne(ctx.req.session.tutorId, {relations: ["profile", "balance"]});
        return tutor;

    }

    @Query(_return => [Tutor], {nullable: true})
    async getAllTutors(
    ): Promise<Tutor[] | undefined> {
        try {
            return await Tutor.find();
        
        }catch(errors){
            console.log(errors);
            return undefined;
        }
    }

    @Mutation(_return => TutorMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async verifyTutor(
        @Arg("tutorId") tutorId: string,
        @Ctx() myContext: MyContext
    ): Promise<TutorMutationResponse> {
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

                const profile = transactionEntityManager.create(TutorProfile, {
                    bio : tutor.bio,
                    gender : tutor.gender,
                    age : tutor.age,
                    address : tutor.address,
                    country : tutor.country,
                    videoUrl : tutor.videoUrl,
                    timezone : tutor.timezone,
                    avatar : tutor.avatar,
                    advanceNotice : tutor.advanceNotice,
                    bookingWindow : tutor.bookingWindow,
                });
                const tutorBalance = transactionEntityManager.create(TutorBalance, {
                    ammount : 0,
                    unit : tutor.country == "Vietnam" ? "VND" : "USD",
                });
                await transactionEntityManager.save(profile);
                const newTutor = transactionEntityManager.create(Tutor, {
                    username : tutor.username,
                    email: tutor.email,
                    password: tutor.password,
                    fullName: tutor.fullName,
                    salary: tutor.salary,
                    balance: tutorBalance,
                    profile: profile
                    
                });
                await transactionEntityManager.save(newTutor);

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
                const newST = transactionEntityManager.create(SubjectTutor, {
                    tutorId: newTutor.id,
                    subjectId : subject.id
                })
                await transactionEntityManager.save(newST);
                subject.numberOfTutors = subject.numberOfTutors + 1;
                await transactionEntityManager.increment(Subject, {id : subject.id}, "numberOfTutors", 1);

                const certifications = await transactionEntityManager.find(CertificationApplication, {tutorId: tutor.id});
                certifications.forEach(async (certification) => {
                    const newCertification = transactionEntityManager.create(Certification, {
                        certificate : certification.certificate,
                        subject : certification.subject,
                        description : certification.description,
                        issuedBy : certification.issuedBy,
                        badgeUrl : certification.badgeUrl,
                        startYear : certification.startYear,
                        endYear : certification.endYear,
                        tutorId : newTutor.id
                    });
                    await transactionEntityManager.save(newCertification);
                    await transactionEntityManager.delete(CertificationApplication, certification.id);
                });

                const diplomas = await transactionEntityManager.find(DiplomaApplication, {tutorId: tutor.id});
                diplomas.forEach(async (diploma) => {
                    const newDiploma = transactionEntityManager.create(Diploma, {
                        degree : diploma.degree,
                        type : diploma.type,
                        university : diploma.university,
                        specialization : diploma.specialization,
                        badgeUrl : diploma.badgeUrl,
                        startYear : diploma.startYear,
                        endYear : diploma.endYear,
                        tutorId : newTutor.id
                    });
                    await transactionEntityManager.save(newDiploma);
                    await transactionEntityManager.delete(DiplomaApplication, diploma.id);
                });

                const availabilities = await transactionEntityManager.find(AvailabilityApplication, {tutorId: tutor.id});
                availabilities.forEach(async (availability) => {
                    const newAvailability = transactionEntityManager.create(Availability, {
                        dayOfWeek : availability.dayOfWeek,
                        startTime : availability.startTime,
                        endTime : availability.endTime,
                        tutorId : newTutor.id
                    });
                    await transactionEntityManager.save(newAvailability);
                    await transactionEntityManager.delete(AvailabilityApplication, availability.id);
                });

                await transactionEntityManager.delete(TutorApplication, tutor.id);


                





                return {
                    code: 200,
                    success: true,
                    message: "Tutor is now verified",
                }
        });

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

    @Mutation(_return => Boolean)
    async forgotPasswordTutor(
        @Arg("forgotPasswordInput") forgotPasswordInput: ForgotPasswordInput
    ) : Promise<boolean> {
        const tutor = await Tutor.findOne({email: forgotPasswordInput.email});
        if(!tutor) {
            return true;
        }
        await TokenModel.findOneAndDelete({userId: tutor.id})
        const resetToken = uuidv4();
        const hashedResetToken = await argon2.hash(resetToken);



        await new TokenModel({
            userId: tutor.id,
            token: hashedResetToken
        }).save();



        await sendEmail(forgotPasswordInput.email, `<a href="http://localhost:3000/change-password?token=${resetToken}&userId=${tutor.id}">Click here to reset your password</a>`);
        return true;
    }

    @Mutation(_return => TutorMutationResponse)
    async changePasswordTutor(
        @Ctx() ctx: MyContext,
        @Arg('token') token: string,
        @Arg('tutorId') tutorId: string,
        @Arg('changePasswordInput') changePasswordInput: ChangePasswordInput
    ): Promise<TutorMutationResponse>{
        if(changePasswordInput.newPassword.length <= 5){
            return { 
                code:400,
                success: false, 
                message: 'Invalid password', 
                errors:[
                    {field: 'newPassword', message: 'Length must be greater than 5'}
                ]
            }
        }
            try {
                const resePasswordToken = await TokenModel.findOne({userId: tutorId});
                if(!resePasswordToken) {
                    return {
                        code: 400,
                        success: false,
                        message: "Token invalid or expired",
                        errors: [
                            {
                                field: 'token',
                                message: 'Token invalid or expired'
                            }
                        ]
                    }
                }
                const resetPasswordTokenValid = argon2.verify(resePasswordToken.token, token);
                if(!resetPasswordTokenValid) {
                    return {
                        code: 400,
                        success: false,
                        message: "Token invalid or expired",
                        errors: [
                            {
                                field: 'token',
                                message: 'Token invalid or expired'
                            }
                        ]
                    }
                }
                const tutor = await Tutor.findOne({id: tutorId});
                if(!tutor) {
                    return {
                        code: 400,
                        success: false,
                        message: "Tutor not found",
                        errors: [
                            {
                                field: 'token',
                                message: 'Tutor not found'
                            }
                        ]
                    }
                }
                const updatedPassword = await argon2.hash(changePasswordInput.newPassword);
                await Tutor.update({id: tutorId}, {password: updatedPassword});
                await resePasswordToken.deleteOne();
                ctx.req.session.userId = tutor.id;
                return {
                    code: 200,
                    success: true,
                    message: "Password successfully changed",
                    tutor
                }

            } catch (error) {
                console.log(error)
                return { 
                    code:500,
                    success: false, 
                    message: 'Internal server error'
                }
            }
    }
}