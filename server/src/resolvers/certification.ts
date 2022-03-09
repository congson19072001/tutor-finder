import { Certification } from "../entities/Certification";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor } from "../middleware/checkAuth";
import { CertificationMutationResponse } from "../types/CertificationMutationResponse";
import { CreateCertificationInput } from "src/types/CreateCertificationInput";

@Resolver(_of => Certification)
export class CertificationResolver {

    @Mutation(_return => CertificationMutationResponse)
    @UseMiddleware(checkAuthTutor)
    async createCertification(
        @Ctx() myContext: MyContext,
        @Arg("createCertificationInput") {certificate, subject, description, issuedBy, badgeUrl, startYear, endYear}: CreateCertificationInput
    ) : Promise<CertificationMutationResponse> {
        const tutorId = myContext.req.session.tutorId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }




            const existingCertification = await transactionEntityManager.findOne(Certification, {
                where: {
                    tutorId,
                    certificate,
                    subject,
                    startYear,
                    endYear
                }
            });


    
            if(existingCertification) {
                throw new Error('Certification already exists');
            } else{
                
                const certification = transactionEntityManager.create(Certification, {
                    tutorId,
                    certificate,
                    subject,
                    startYear,
                    endYear,
                    description,
                    issuedBy,
                    badgeUrl
                });
                await transactionEntityManager.save(certification);
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
    async deleteCertification(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
        @Arg("certificationId", _type => ID) certificationId: string
    ) : Promise<CertificationMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            await transactionEntityManager.delete(Certification, certificationId);


            return {
                code: 200,
                success: true,
                message: "Certification connected to tutor successfully",
                
            }
        });
    }

    @Query(_return => [Certification])
    @UseMiddleware(checkAuthTutor)
    async getMyCertifications(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Certification[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Certification).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Certification])
    async getTutorCertifications(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<Certification[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Certification).find({
            where: {
                tutorId
            }
        });
    }





}