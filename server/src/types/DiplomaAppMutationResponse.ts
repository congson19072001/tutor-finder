import { DiplomaApplication } from "../entities/DiplomaApplication";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class DiplomaAppMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    diploma?: DiplomaApplication;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}