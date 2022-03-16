import { Schedule } from "../entities/Schedule";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor, checkAuthUser } from "../middleware/checkAuth";
import { ScheduleMutationResponse } from "../types/ScheduleMutationResponse";
import { CreateScheduleInput } from "../types/CreateScheduleInput";
import { User } from "../entities/User";

@Resolver(_of => Schedule)
export class ScheduleResolver {

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthUser)
    async createScheduleByUser(
        @Ctx() myContext: MyContext,
        @Arg("createScheduleInput") {partnerId, startTime, endTime, type, subject, recurrenceRule}: CreateScheduleInput
    ) : Promise<ScheduleMutationResponse> {
        const userId = myContext.req.session.userId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,partnerId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            const user = await transactionEntityManager.findOne(User,userId);
            if(!user) {
                throw new Error('User not found');
            }




            const existingSchedule = await transactionEntityManager.findOne(Schedule, {
                where: {
                    userId,
                    tutorId: partnerId,
                    subject,
                    type,
                    startTime,
                    endTime
                }
            });


    
            if(existingSchedule) {
                throw new Error('Schedule already exists');
            } else{
                
                const schedule = transactionEntityManager.create(Schedule, {
                    userId,
                    tutorId: partnerId, 
                    startTime, 
                    endTime, 
                    type, 
                    subject, 
                    recurrenceRule
                });
                await transactionEntityManager.save(schedule);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Schedule created successfully",
                
            }
        });
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthUser)
    async createScheduleByTutor(
        @Ctx() myContext: MyContext,
        @Arg("createScheduleInput") {partnerId, startTime, endTime, type, subject, recurrenceRule}: CreateScheduleInput
    ) : Promise<ScheduleMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const user = await transactionEntityManager.findOne(User,partnerId);
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            
            if(!user) {
                throw new Error('User not found');
            }




            const existingSchedule = await transactionEntityManager.findOne(Schedule, {
                where: {
                    tutorId,
                    userId: partnerId,
                    subject,
                    type,
                    startTime,
                    endTime
                }
            });


    
            if(existingSchedule) {
                throw new Error('Schedule already exists');
            } else{
                
                const schedule = transactionEntityManager.create(Schedule, {
                    userId : partnerId,
                    tutorId, 
                    startTime, 
                    endTime, 
                    type, 
                    subject, 
                    recurrenceRule
                });
                await transactionEntityManager.save(schedule);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Schedule created successfully",
                
            }
        });
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async acceptScheduleTutor(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("scheduleId", _type => ID) scheduleId: string
    ) : Promise<ScheduleMutationResponse> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        const schedule = await connection.getRepository(Schedule).findOne(scheduleId);
        if(!schedule) {
            throw new Error('Schedule not found');
        }
        if(schedule.tutorId !== tutorId) {
            throw new Error('Schedule not found');
        }
        if(schedule.status !== 'pending') {
            throw new Error('Schedule not found');
        }
        schedule.status = 'accepted';
        await connection.getRepository(Schedule).save(schedule);
        return {
            code: 200,
            success: true,
            message: "Schedule accepted successfully"
        }
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async acceptScheduleUser(
        @Ctx() {req: {session: {userId}}, connection}: MyContext,
        @Arg("scheduleId", _type => ID) scheduleId: string
    ) : Promise<ScheduleMutationResponse> {
        const user = await connection.getRepository(User).findOne(userId);
        if(!user) {
            throw new Error('User not found');
        }
        const schedule = await connection.getRepository(Schedule).findOne(scheduleId);
        if(!schedule) {
            throw new Error('Schedule not found');
        }
        if(schedule.userId !== userId) {
            throw new Error('Schedule not found');
        }
        if(schedule.status !== 'pending') {
            throw new Error('Schedule not found');
        }
        schedule.status = 'accepted';
        await connection.getRepository(Schedule).save(schedule);
        return {
            code: 200,
            success: true,
            message: "Schedule accepted successfully"
        }
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async cancelScheduleUser(
        @Ctx() {req: {session: {userId}}, connection}: MyContext,
        @Arg("scheduleId", _type => ID) scheduleId: string
    ) : Promise<ScheduleMutationResponse> {
        const user = await connection.getRepository(User).findOne(userId);
        if(!user) {
            throw new Error('User not found');
        }
        const schedule = await connection.getRepository(Schedule).findOne(scheduleId);
        if(!schedule) {
            throw new Error('Schedule not found');
        }
        if(schedule.userId !== userId) {
            throw new Error('Schedule not found');
        }
        if(schedule.status !== 'finished' && schedule.status !== 'accepted') {
            throw new Error('Schedule not found');
        }
        schedule.status = 'canceled';
        await connection.getRepository(Schedule).save(schedule);
        return {
            code: 200,
            success: true,
            message: "Schedule accepted successfully"
        }
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async cancelScheduleTutor(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("scheduleId", _type => ID) scheduleId: string
    ) : Promise<ScheduleMutationResponse> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('User not found');
        }
        const schedule = await connection.getRepository(Schedule).findOne(scheduleId);
        if(!schedule) {
            throw new Error('Schedule not found');
        }
        if(schedule.tutorId !== tutorId) {
            throw new Error('Schedule not found');
        }
        if(schedule.status !== 'finished' && schedule.status !== 'accepted') {
            throw new Error('Schedule not found');
        }
        schedule.status = 'canceled';
        await connection.getRepository(Schedule).save(schedule);
        return {
            code: 200,
            success: true,
            message: "Schedule accepted successfully"
        }
    }

    @Mutation(_return => ScheduleMutationResponse)
    @UseMiddleware(checkAuthUser)
    async deleteSchedule(
        @Ctx() {req: {session: {userId}}, connection}: MyContext,
        @Arg("scheduleId", _type => ID) scheduleId: string
    ) : Promise<ScheduleMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{

            const user = await transactionEntityManager.findOne(User,userId);
            if(!user) {
                throw new Error('User not found');
            }

            await transactionEntityManager.delete(Schedule, scheduleId);


            return {
                code: 200,
                success: true,
                message: "Schedule connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [Schedule])
    @UseMiddleware(checkAuthUser)
    async getMySchedules(
        @Ctx() {req: {session: {userId}}, connection}: MyContext
    ) : Promise<Schedule[]> {
        const user = await connection.getRepository(User).findOne(userId);
        if(!user) {
            throw new Error('User not found');
        }
        return await connection.getRepository(Schedule).find({
            where: {
                userId
            }
        });
    }

    @Query(_return => [Schedule])
    @UseMiddleware(checkAuthUser)
    async getTutorMySchedules(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Schedule[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Schedule).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Schedule])
    @UseMiddleware(checkAuthTutor)
    async getSchedulesAboutMe(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Schedule[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Schedule).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Schedule])
    async getTutorSchedules(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<Schedule[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Schedule).find({
            where: {
                tutorId
            }
        });
    }





}