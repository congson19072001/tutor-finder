import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
//import { User } from "./User";
export type AgeType = "Kid" | "PrimaryStudent" | "SecondaryStudent" | "HighSchoolStudent" | "CollegeStudent" | "Adult" | "Professional";

@ObjectType()
@Entity()
export class Request extends BaseEntity{

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=> String)
    @Column()
    subject!: string

    @Field(_type=>ID)
    @Column()
    userId!: string;

    @Field(_type=>String)
    @Column()
    title!: string;

    @Field(_type=>String)
    @Column()
    content!: string;

    @Field(_type=>Number)
    @Column()
    lowestPrice!: number;

    @Field(_type=>Number)
    @Column()
    highestPrice!: number;

    // @Field(_type=>String)
    // @Column()
    // ageRange: 


    // @Field(_type => String)
    // @Column({
    //     type: "enum",
    //     enum: ["Education", "Work Experience", "Certification"],
    //     default: "Certification"
    // })
    // type!: ResumeType;

    @Field()
    @Column()
    description!: string;

    @Field()
    @Column()
    startYear!: number;

    @Field(_type => Number, { nullable: true })
    @Column({nullable: true})
    endYear: number;


    // @Field(_type => User, { nullable: true })
    // @ManyToOne(_type => User, user => user.requests)
    // @JoinColumn({ name: "userId" })
    // user: Promise<User>;


}