import { Speciality } from "../entities/Speciality";
import { Arg, Ctx, FieldResolver, ID, Mutation, Query, Resolver, Root, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthAdmin, checkAuthTutor } from "../middleware/checkAuth";
import { SpecialityMutationResponse } from "../types/SpecialityMutationResponse";
import { CreateSpecialityInput } from "../types/CreateSpecialityInput";
import { Subject } from "../entities/Subject";
import { Admin } from "../entities/Admin";
import { SpecialityTutor } from "../entities/SpecialityTutor";
import { SubjectTutor } from "../entities/SubjectTutor";

@Resolver(_of => Speciality)
export class SpecialityResolver {

    @FieldResolver(_return => [Tutor])
    async tutors(
        @Root() root: Speciality,
        @Ctx() { dataLoaders : {specialityTutorsLoader}} : MyContext
    ): Promise<Tutor[] | undefined> {
        return await specialityTutorsLoader.load(root.id);
    }

    @Mutation(_return => SpecialityMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async createSpeciality(
        @Ctx() myContext: MyContext,
        @Arg("createSpecialityInput") {subjectId, title, description}: CreateSpecialityInput
    ) : Promise<SpecialityMutationResponse> {
        const adminId = myContext.req.session.adminId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{

            const admin = await transactionEntityManager.findOne(Admin,adminId);
            if(!admin) {
                throw new Error('Admin not found');
            }
            const subject = await transactionEntityManager.findOne(Subject,subjectId);
            if(!subject) {
                throw new Error('Subject not found');
            }


            const existingSpeciality = await transactionEntityManager.findOne(Speciality, {
                where: {
                    subjectId,
                    title
                }
            });


    
            if(existingSpeciality) {
                // If existing speciality, update it
                existingSpeciality.description = description;
                await transactionEntityManager.save(existingSpeciality);
            } else{
                
                const speciality = transactionEntityManager.create(Speciality, {
                    subjectId,
                    title,
                    description
                });
                await transactionEntityManager.save(speciality);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Speciality connected to subject successfully",
                
            }
        });
    }

    @Mutation(_return => SpecialityMutationResponse)
    @UseMiddleware(checkAuthAdmin)
    async deleteSpeciality(
        @Ctx() {req: {session: {adminId}}, connection}: MyContext,
        @Arg("specialityId", _type => ID) specialityId: string
    ) : Promise<SpecialityMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const admin = await transactionEntityManager.findOne(Admin,adminId);
            if(!admin) {
                throw new Error('Admin not found');
            }

            await transactionEntityManager.delete(Speciality, specialityId);


            return {
                code: 200,
                success: true,
                message: "Speciality deleted successfully",
                
            }
        });
    }

    @Query(_return => [Speciality])
    async getSpecialitiesBySubject(
        @Ctx() myContext: MyContext,
        @Arg("subjectId", _type => ID) subjectId: string
    ) : Promise<Speciality[]> {
        const connection = myContext.connection;
        const subject = await connection.getRepository(Subject).findOne(subjectId);
        if(!subject) {
            throw new Error('Subject not found');
        }
        return await connection.getRepository(Speciality).find({
            where: {
                subjectId
            }
        });
    }

    @Query(_return => SpecialityMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async connectSpecialityToTutor(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("specialityId", _type => ID) specialityId: string
    ) : Promise<SpecialityMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor, tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }
            const speciality = await transactionEntityManager.findOne(Speciality, specialityId);
            if(!speciality) {
                throw new Error('Speciality not found');
            }
            const specialityTutor = await transactionEntityManager.findOne(SpecialityTutor,{
                where: {
                    tutorId,
                    specialityId
                }
            });
            const subjectTutor = await transactionEntityManager.findOne(SubjectTutor,{
                where: {
                    tutorId,
                    subjectId: speciality.subjectId
                }
            });
            if(!specialityTutor) {
                const specialityTutor = transactionEntityManager.create(SpecialityTutor, {
                    tutorId,
                    specialityId
                });
                await transactionEntityManager.save(specialityTutor);
                await transactionEntityManager.increment(Speciality, {id : specialityId}, "numberOfTutors", 1);
                if(!subjectTutor) {
                    const subjectTutor = transactionEntityManager.create(SubjectTutor, {
                        tutorId,
                        subjectId: speciality.subjectId
                    });
                    await transactionEntityManager.save(subjectTutor);
                    await transactionEntityManager.increment(Subject, {id : speciality.subjectId}, "numberOfTutors", 1);
                }
                

            }


                return {
                    code: 200,
                    success: true,
                    message: "Speciality connected to Tutor successfully",
                    
                } 
        });
    }





}