import { Subject } from "../entities/Subject";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class SubjectMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    subject?: Subject;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}