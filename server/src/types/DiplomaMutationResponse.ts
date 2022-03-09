import { Diploma } from "../entities/Diploma";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class DiplomaMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    diploma?: Diploma;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}