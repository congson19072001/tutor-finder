import { Review } from "../entities/Review";
import { Arg, Ctx, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Tutor } from "../entities/Tutor";
import { MyContext } from "../types/MyContext";
import { checkAuthTutor, checkAuthUser } from "../middleware/checkAuth";
import { ReviewMutationResponse } from "../types/ReviewMutationResponse";
import { CreateReviewInput } from "../types/CreateReviewInput";
import { User } from "../entities/User";

@Resolver(_of => Review)
export class ReviewResolver {

    @Mutation(_return => ReviewMutationResponse)
    @UseMiddleware(checkAuthUser)
    async createReview(
        @Ctx() myContext: MyContext,
        @Arg("createReviewInput") {tutorId, subject, content, score}: CreateReviewInput
    ) : Promise<ReviewMutationResponse> {
        const userId = myContext.req.session.userId;
        const connection = myContext.connection;
        return await connection.transaction(async transactionEntityManager =>{
            const tutor = await transactionEntityManager.findOne(Tutor,tutorId);
            if(!tutor) {
                throw new Error('Tutor not found');
            }

            const user = await transactionEntityManager.findOne(User,userId);
            if(!user) {
                throw new Error('User not found');
            }




            const existingReview = await transactionEntityManager.findOne(Review, {
                where: {
                    userId,
                    tutorId,
                    subject
                }
            });


    
            if(existingReview) {
                // If existing review, update it
                existingReview.content = content;
                existingReview.score = score;
                await transactionEntityManager.save(existingReview);
            } else{
                
                const review = transactionEntityManager.create(Review, {
                    userId,
                    tutorId,
                    subject,
                    content,
                    score
                });
                await transactionEntityManager.save(review);
            }


            
            

            return {
                code: 200,
                success: true,
                message: "Review connected to tutor successfully",
                
            }
        });
    }

    @Mutation(_return => ReviewMutationResponse)
    @UseMiddleware(checkAuthUser)
    async deleteReview(
        @Ctx() {req: {session: {userId}}, connection}: MyContext,
        @Arg("reviewId", _type => ID) reviewId: string
    ) : Promise<ReviewMutationResponse> {
        return await connection.transaction(async transactionEntityManager =>{

            const user = await transactionEntityManager.findOne(User,userId);
            if(!user) {
                throw new Error('User not found');
            }

            await transactionEntityManager.delete(Review, reviewId);


            return {
                code: 200,
                success: true,
                message: "Review deleted successfully",
                
            }
        });
    }

    @Query(_return => [Review])
    @UseMiddleware(checkAuthUser)
    async getMyReviews(
        @Ctx() {req: {session: {userId}}, connection}: MyContext
    ) : Promise<Review[]> {
        const user = await connection.getRepository(User).findOne(userId);
        if(!user) {
            throw new Error('User not found');
        }
        return await connection.getRepository(Review).find({
            where: {
                userId
            }
        });
    }

    @Query(_return => [Review])
    @UseMiddleware(checkAuthTutor)
    async getReviewsAboutMe(
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext
    ) : Promise<Review[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Review).find({
            where: {
                tutorId
            }
        });
    }

    @Query(_return => [Review])
    async getTutorReviews(
        @Arg("tutorId", _type => ID) tutorId: string,
        @Ctx() {connection}: MyContext
    ) : Promise<Review[]> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId);
        if(!tutor) {
            throw new Error('Tutor not found');
        }
        return await connection.getRepository(Review).find({
            where: {
                tutorId
            }
        });
    }





}