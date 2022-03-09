import { Certification } from "../entities/Certification";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class CertificationMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    certification?: Certification;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}