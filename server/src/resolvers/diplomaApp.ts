import { DiplomaApplication, DiplomaType } from "../entities/DiplomaApplication";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TutorApplication } from "../entities/TutorApplication";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { DiplomaAppMutationResponse } from "../types/DiplomaAppMutationResponse";
import { CreateDiplomaInput } from "src/types/CreateDiplomaInput";

@Resolver(_of => DiplomaApplication)
export class DiplomaApplicationResolver {

    @Mutation(_return => DiplomaAppMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createDiplomaApp(
        @Ctx() myContext: MyContext,
        @Arg("createDiplomaAppInput") {degree, type, university, specialization, badgeUrl, startYear, endYear}: CreateDiplomaInput
    ) : Promise<DiplomaAppMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }




            const existingDiploma = await transactionEntityManager.findOne(DiplomaApplication, {
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
                throw new Error('DiplomaApplication already exists');
            } else{
                const dtype = type as DiplomaType;
                
                const diplomaApp = transactionEntityManager.create(DiplomaApplication, {
                    tutorId,
                    degree,
                    specialization,
                    startYear,
                    endYear,
                    university,
                    badgeUrl,
                    type: dtype
                });
                await transactionEntityManager.save(diplomaApp);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "DiplomaApplication connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => DiplomaAppMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async deleteDiplomaApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("diplomaId", _type => ID) diplomaId: string
    ) : Promise<DiplomaAppMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }

            await transactionEntityManager.delete(DiplomaApplication, diplomaId);


            return {
                code: 200,
                success: true,
                message: "DiplomaApplication connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [DiplomaApplication])
    @UseMiddleware(checkAuthTutor)
    async getMyDiplomasApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<DiplomaApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(DiplomaApplication).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [DiplomaApplication])
    async getTutorDiplomasApp(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<DiplomaApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(DiplomaApplication).find({
            where: {
                tutorId
            }
        });
    }





}