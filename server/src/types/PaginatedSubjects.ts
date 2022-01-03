import { Subject } from "../entities/Subject";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedSubjects {
    @Field()
    totalCount!: number

    @Field(_type => Date)
    cursor!: Date

    @Field()
    hasMore!: boolean

    @Field(_type => [Subject])
    paginatedSubjects!: Subject[]
}