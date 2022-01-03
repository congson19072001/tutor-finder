import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSubjectInput {
    @Field()
    title: string

    @Field()
    description: string

}