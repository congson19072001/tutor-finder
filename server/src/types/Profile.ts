import { Field, InterfaceType } from "type-graphql";

@InterfaceType()
export abstract class IProfile {
    @Field({nullable: true})
    gender?: string

    @Field({nullable: true})
    age?: number

    @Field()
    address: string
    
    @Field({nullable: true})
    bio?: string

    @Field()
    province : string

    @Field({nullable: true})
    avatar?: string

    


}