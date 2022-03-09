
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateReviewInput {

    @Field()
    tutorId: string;

    @Field()
    subject: string;

    @Field()
    content: string;

    @Field()
    score: number;


}