import { UserProfile } from "../entities/UserProfile";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class UserProfileMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    userProfile?: UserProfile;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}