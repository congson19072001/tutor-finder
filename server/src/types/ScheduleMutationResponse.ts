import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Schedule } from "../entities/Schedule";

@ObjectType({implements: IMutationResponse})
export class ScheduleMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    schedule?: Schedule;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}