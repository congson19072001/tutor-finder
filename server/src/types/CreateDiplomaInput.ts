
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateDiplomaInput {

    @Field()
    degree: string;

    @Field()
    type: string;

    @Field()
    university: string;

    @Field()
    specialization: string;

    @Field()
    badgeUrl: string;

    @Field()
    startYear: number

    @Field()
    endYear: number


}