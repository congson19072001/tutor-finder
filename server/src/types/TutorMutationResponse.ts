import { Tutor } from "../entities/Tutor";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class TutorMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    tutor?: Tutor;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}