import { Field, InputType } from "type-graphql";

@InputType()
export class FillTutorApplicationInput {
    @Field({nullable: true})
    gender?: string

    @Field({nullable: true})
    age?: number

    @Field({nullable: true})
    address?: string

    @Field({nullable: true})
    bio?: string

    @Field({nullable: true})
    country? : string

    @Field({nullable: true})
    avatar?: string

    @Field({nullable: true})
    salary?: number

    @Field({nullable: true})
    timezone?: string

    @Field({nullable: true})
    videoUrl?: string

    @Field({nullable: true})
    advanceNotice?: string

    @Field({nullable: true})
    bookingWindow?: string

}