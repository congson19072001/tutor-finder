import { AvailabilityApplication } from "../entities/AvailabilityApplication";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TutorApplication } from "../entities/TutorApplication";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { AvailabilityMutationResponse } from "../types/AvailabilityMutationResponse";
import { CreateAvailabilityInput } from "src/types/CreateAvailabilityInput";
import { LessThan, MoreThan } from "typeorm";

@Resolver(_of => AvailabilityApplication)
export class AvailabilityApplicationResolver {

    @Mutation(_return => AvailabilityMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createAvailabilityApp(
        @Ctx() myContext: MyContext,
        @Arg("createAvailabilityInput") {startTime, endTime, dayOfWeek}: CreateAvailabilityInput
    ) : Promise<AvailabilityMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }

            if(endTime - startTime < 1800000 || startTime < 0 || endTime >= 86400000 || dayOfWeek < 1 || dayOfWeek > 7  || endTime % 1800000 !== 0 || startTime % 1800000 !== 0) {
                throw new Error('Invalid availability slot');
            }

            const availabilitiesapp = await transactionEntityManager.find(AvailabilityApplication, {
                where: {
                    tutorId,
                    dayOfWeek,
                    startTime: LessThan(endTime),
                    endTime: MoreThan(startTime)
                }
            });

            if(availabilitiesapp.length > 1) {
                throw new Error('Invalid availability slot');
            }


            const existingAvailability = await transactionEntityManager.findOne(AvailabilityApplication, {
                where: {
                    tutorId,
                    dayOfWeek,
                    startTime
                }
            });


    
            if(existingAvailability) {
                // if availability exists, update it
                existingAvailability.endTime = endTime;
                await transactionEntityManager.save(existingAvailability);

            } else{
                if(availabilitiesapp.length > 0) {
                    throw new Error('Invalid availability slot');
                }
                const availability = transactionEntityManager.create(AvailabilityApplication, {
                    tutorId,
                    startTime,
                    endTime,
                    dayOfWeek
                });
                await transactionEntityManager.save(availability);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Availability connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => AvailabilityMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async deleteAvailabilityApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("availabilityId", _type => ID) availabilityId: string
    ) : Promise<AvailabilityMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }

            await transactionEntityManager.delete(AvailabilityApplication, availabilityId);


            return {
                code: 200,
                success: true,
                message: "Availability connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [AvailabilityApplication])
    @UseMiddleware(checkAuthTutor)
    async getMyAvailabilitiesApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<AvailabilityApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(AvailabilityApplication).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [AvailabilityApplication])
    async getTutorAvailabilitiesApp(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<AvailabilityApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(AvailabilityApplication).find({
            where: {
                tutorId
            }
        });
    }





}