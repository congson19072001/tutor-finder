import { Review } from "../entities/Review";
import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";

@ObjectType({implements: IMutationResponse})
export class ReviewMutationResponse implements IMutationResponse {
    code: number;
    success: boolean;
    message?: string;

    @Field({nullable: true})
    review?: Review;

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[];
}