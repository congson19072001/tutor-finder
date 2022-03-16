import { CertificationApplication } from "../entities/CertificationApplication";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { TutorApplication } from "../entities/TutorApplication";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { CertificationMutationResponse } from "../types/CertificationMutationResponse";
import { CreateCertificationInput } from "src/types/CreateCertificationInput";

@Resolver(_of => CertificationApplication)
export class CertificationApplicationResolver {

    @Mutation(_return => CertificationMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createCertificationApp(
        @Ctx() myContext: MyContext,
        @Arg("createCertificationInput") {certificate, subject, description, issuedBy, badgeUrl, startYear, endYear}: CreateCertificationInput
    ) : Promise<CertificationMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }




            const existingCertification = await transactionEntityManager.findOne(CertificationApplication, {
                where: {
                    tutorId,
                    certificate,
                    subject,
                    startYear,
                    endYear
                }
            });


    
            if(existingCertification) {
                throw new Error('CertificationApplication already exists');
            } else{
                
                const certificationApplication = transactionEntityManager.create(CertificationApplication, {
                    tutorId,
                    certificate,
                    subject,
                    startYear,
                    endYear,
                    description,
                    issuedBy,
                    badgeUrl
                });
                await transactionEntityManager.save(certificationApplication);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Certification connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => CertificationMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async deleteCertificationApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("certificationId", _type => ID) certificationId: string
    ) : Promise<CertificationMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(TutorApplication,tutorId);
            if(!tutor) {
                throw new Error('TutorApplication not found');
            }

            await transactionEntityManager.delete(CertificationApplication, certificationId);


            return {
                code: 200,
                success: true,
                message: "Certification connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [CertificationApplication])
    @UseMiddleware(checkAuthTutor)
    async getMyCertificationsApp(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<CertificationApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(CertificationApplication).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [CertificationApplication])
    async getTutorCertificationsApp(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<CertificationApplication[]> {
        const tutor = await connection.getRepository(TutorApplication).findOne(tutorId);
        if(!tutor) {
            throw new Error('TutorApplication not found');
        }
        return await connection.getRepository(CertificationApplication).find({
            where: {
                tutorId
            }
        });
    }





}