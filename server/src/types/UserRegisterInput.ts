import { Field, InputType } from "type-graphql";
import { IRegisterInput } from "./RegisterInput";

@InputType()
export class UserRegisterInput implements IRegisterInput {
    @Field({nullable: true})
    gender?: string

    @Field({nullable: true})
    age?: number

    @Field({nullable: true})
    address?: "Male" | "Female"

    @Field()
    country: string

    @Field({nullable: true})
    timezone?: string

    @Field({nullable: true})
    avatar?: string
    
    @Field()
    username: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    fullName: string

    // @Field({nullable: true})
    // salary?: number

    


}