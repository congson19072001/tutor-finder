import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Speciality } from "../entities/Speciality";

@ObjectType({implements: IMutationResponse})
export class SpecialityMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    speciality?: Speciality;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}