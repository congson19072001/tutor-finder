import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
    @Field({nullable: true})
    gender?: string

    @Field({nullable: true})
    age?: number

    @Field({nullable: true})
    address?: string
    
    @Field({nullable: true})
    bio?: string

    @Field()
    province : string

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

    @Field({nullable: true})
    salary?: number

    


}