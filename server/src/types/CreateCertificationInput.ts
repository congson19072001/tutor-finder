
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCertificationInput {

    @Field()
    certificate: string;

    @Field()
    subject: string;

    @Field()
    description: string;

    @Field()
    issuedBy: string;

    @Field()
    badgeUrl: string;

    @Field()
    startYear: number

    @Field()
    endYear: number


}