import { Availability } from "../entities/Availability";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { AvailabilityMutationResponse } from "../types/AvailabilityMutationResponse";
import { CreateAvailabilityInput } from "src/types/CreateAvailabilityInput";
import { LessThan, MoreThan } from "typeorm";

@Resolver(_of => Availability)
export class AvailabilityResolver {

    @Mutation(_return => AvailabilityMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createAvailability(
        @Ctx() myContext: MyContext,
        @Arg("createAvailabilityInput") {startTime, endTime, dayOfWeek}: CreateAvailabilityInput
    ) : Promise<AvailabilityMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            if(endTime - startTime < 1800000 || startTime < 0 || endTime >= 86400000 || dayOfWeek < 1 || dayOfWeek > 7  || endTime % 1800000 !== 0 || startTime % 1800000 !== 0) {
                throw new Error('Invalid availability slot');
            }

            const availabilities = await transactionEntityManager.find(Availability, {
                where: {
                    tutorId,
                    dayOfWeek,
                    startTime: LessThan(endTime),
                    endTime: MoreThan(startTime)
                }
            });

            if(availabilities.length > 1) {
                throw new Error('Invalid availability slot');
            }


            const existingAvailability = await transactionEntityManager.findOne(Availability, {
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
                if(availabilities.length > 0) {
                    throw new Error('Invalid availability slot');
                }
                const availability = transactionEntityManager.create(Availability, {
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
                message: "Subject connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => AvailabilityMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async deleteAvailability(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("availabilityId", _type => ID) availabilityId: string
    ) : Promise<AvailabilityMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            await transactionEntityManager.delete(Availability, availabilityId);


            return {
                code: 200,
                success: true,
                message: "Subject connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [Availability])
    @UseMiddleware(checkAuthTutor)
    async getMyAvailabilities(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Availability[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Availability).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Availability])
    async getTutorAvailabilities(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<Availability[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Availability).find({
            where: {
                tutorId
            }
        });
    }





}