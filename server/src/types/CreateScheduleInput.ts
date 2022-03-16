import { Field, InputType } from "type-graphql";


@InputType()
export class CreateScheduleInput {
    @Field()
    startTime : Date;

    @Field()
    partnerId : string;

    @Field()
    endTime : Date;

    @Field()
    status: string;

    @Field()
    type: string;

    @Field()
    subject: string;

    @Field()
    recurrenceRule: string;
}