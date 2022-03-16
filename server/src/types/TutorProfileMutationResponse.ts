import { TutorProfile } from "../entities/TutorProfile";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class TutorProfileMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    tutorProfile?: TutorProfile;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}