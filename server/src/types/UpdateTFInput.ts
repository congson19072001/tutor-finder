import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateTFInput {
    @Field({nullable: true})
    bio?: string

    @Field({nullable: true})
    avatar?: string

    @Field({nullable: true})
    gender?:  "Male" | "Female"

    @Field({nullable: true})
    age?: number

    @Field({nullable: true})
    address?: string

    @Field({nullable: true})
    country?: string

    @Field({nullable: true})
    videoUrl?: string

    @Field({nullable: true})
    timezone?: string

    @Field({nullable: true})
    advanceNotice?: "at_least_1_hour" | "at_least_3_hour" | "at_least_6_hour" | "at_least_12_hour" | "at_least_1_day" | "at_least_2_day"

    @Field({nullable: true})
    bookingWindow?: "2_week" | "3_week" | "1_month" | "2_month"


}