import { Field, InputType } from "type-graphql";
import { IRegisterInput } from "./RegisterInput";

@InputType()
export class TutorRegisterInput implements IRegisterInput{
    @Field()
    username: string

    @Field()
    email: string

    @Field()
    password: string

    @Field()
    fullName: string


}