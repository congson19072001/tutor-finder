import { Diploma, DiplomaType } from "../entities/Diploma";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { DiplomaMutationResponse } from "../types/DiplomaMutationResponse";
import { CreateDiplomaInput } from "../types/CreateDiplomaInput";

@Resolver(_of => Diploma)
export class DiplomaResolver {

    @Mutation(_return => DiplomaMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createDiploma(
        @Ctx() myContext: MyContext,
        @Arg("createDiplomaInput") {degree, type, university, specialization, badgeUrl, startYear, endYear}: CreateDiplomaInput
    ) : Promise<DiplomaMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }




            const existingDiploma = await transactionEntityManager.findOne(Diploma, {
                where: {
                    tutorId,
                    degree,
                    specialization,
                    university,
                    startYear,
                    endYear
                }
            });


    
            if(existingDiploma) {
                throw new Error('Diploma already exists');
            } else{
                const dtype = type as DiplomaType;
                
                const diploma = transactionEntityManager.create(Diploma, {
                    tutorId,
                    degree,
                    specialization,
                    startYear,
                    endYear,
                    university,
                    badgeUrl,
                    type: dtype
                });
                await transactionEntityManager.save(diploma);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Diploma connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => DiplomaMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async deleteDiploma(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("diplomaId", _type => ID) diplomaId: string
    ) : Promise<DiplomaMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            await transactionEntityManager.delete(Diploma, diplomaId);


            return {
                code: 200,
                success: true,
                message: "Diploma deleted successfully",
                
            }
        });
    }

    @Query(_return => [Diploma])
    @UseMiddleware(checkAuthTutor)
    async getMyDiplomas(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Diploma[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Diploma).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Diploma])
    async getTutorDiplomas(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<Diploma[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Diploma).find({
            where: {
                tutorId
            }
        });
    }





}