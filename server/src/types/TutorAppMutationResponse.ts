import { TutorApplication } from "../entities/TutorApplication";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class TutorAppMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    tutor?: TutorApplication;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}