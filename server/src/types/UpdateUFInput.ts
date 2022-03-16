import { Field, InputType } from "type-graphql";


@InputType()
export class UpdateUFInput {

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
    timezone?: string


}