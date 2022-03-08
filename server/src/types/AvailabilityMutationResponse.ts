import { Availability } from "../entities/Availability";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class AvailabilityMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    availability?: Availability;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}