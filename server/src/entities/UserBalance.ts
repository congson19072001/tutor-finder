import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type UnitType = "VND" | "USD" | "EUR";

@ObjectType()
@Entity()
export class UserBalance {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type => Number)
    @Column("numeric", { precision: 15, scale: 5, default: 0 })
    ammount!: number;

    @Field(_type => String)
    @Column({
        type: "enum",
        enum: ["VND", "USD", "EUR"],
        default: "VND"
    })
    unit!: UnitType;

    @Field(_type => Number)
    @Column({ default: 0 })
    hourNumber!: number;

    @Field(_type => Number)
    @Column({ default: 0 })
    discount!: number;

    @Field(_type => ID, { nullable: true })
    @Column({ nullable: true })
    tutorId: string;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;



}