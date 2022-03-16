import { Field, InputType } from "type-graphql";


@InputType()
export class CreateSpecialityInput {

    @Field()
    title: string;

    @Field()
    subjectId: string;

    @Field()
    description: string;
}