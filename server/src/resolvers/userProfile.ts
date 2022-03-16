import { UserProfile } from "../entities/UserProfile";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { UserProfileMutationResponse } from "../types/UserProfileMutationResponse";
import { checkAuthUser } from "src/middleware/checkAuth";
import { UpdateUFInput } from "../types/UpdateUFInput";
import { MyContext } from "../types/MyContext";
import { User } from "../entities/User";


@Resolver(_of => UserProfile)
export class UserProfileResolver {

    @Mutation(_returns => UserProfileMutationResponse, { nullable: true })
    @UseMiddleware(checkAuthUser)
    async updateUserProfile(
        @Arg("updateUserProfileInput") updateUserProfileInput: UpdateUFInput,
        @Ctx() {req: {session: {userId}}, connection}: MyContext,
    ): Promise<UserProfileMutationResponse> {
        const user = await connection.getRepository(User).findOne(userId);
        if (!user) {
            return {
                code: 401,
                success: false,
                message: "Unauthorized",
                errors: [{
                    field: "updateUserProfileInput",
                    message: "User not found"
                }]
            };

        }
        const userProfile = user.profile;
        connection.getRepository(UserProfile).merge(userProfile, updateUserProfileInput);
        await connection.getRepository(UserProfile).save(userProfile);
        return {
            code: 200,
            success: true,
            message: "User profile updated successfully",
            userProfile
        };
        
        
        
    }
    

    

}