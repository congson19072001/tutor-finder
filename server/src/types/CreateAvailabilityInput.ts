
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAvailabilityInput {

    @Field()
    startTime: number

    @Field()
    endTime: number

    @Field()
    dayOfWeek: number

}