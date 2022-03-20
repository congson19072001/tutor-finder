import { TutorProfile } from "../entities/TutorProfile";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { TutorProfileMutationResponse } from "../types/TutorProfileMutationResponse";
import { checkAuthTutor } from "../middleware/checkAuth";
import { UpdateTFInput } from "../types/UpdateTFInput";
import { MyContext } from "../types/MyContext";
import { Tutor } from "../entities/Tutor";


@Resolver(_of => TutorProfile)
export class TutorProfileResolver {

    @Mutation(_returns => TutorProfileMutationResponse, { nullable: true })
    @UseMiddleware(checkAuthTutor)
    async updateTutorProfile(
        @Arg("updateTutorProfileInput") updateTutorProfileInput: UpdateTFInput,
        @Ctx() {req: {session: {tutorId}}, connection}: MyContext,
    ): Promise<TutorProfileMutationResponse> {
        const tutor = await connection.getRepository(Tutor).findOne(tutorId, {relations: ["profile"]});
        if (!tutor) {
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
                errors: [{
                    field: "updateTutorProfileInput",
                    message: "Tutor not found"
                }]
            };

        }
        const tutorProfile = tutor.profile;
        connection.getRepository(TutorProfile).merge(tutorProfile, updateTutorProfileInput);
        await connection.getRepository(TutorProfile).save(tutorProfile);
        return {
            code: 200,
            success: true,
            message: "Tutor profile updated successfully",
            tutorProfile
        };
        
        
        
    }
    

    

}