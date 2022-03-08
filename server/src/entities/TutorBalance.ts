import { Field, ID, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export type UnitType = "VND" | "USD" | "EUR";

@ObjectType()
@Entity()
export class TutorBalance {
    @Field(_type => ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type => Number)
    @Column("numeric", { precision: 15, scale: 5 })
    ammount!: number;

    @Field(_type => String)
    @Column({
        type: "enum",
        enum: ["VND", "USD", "EUR"],
        default: "VND"
    })
    unit!: UnitType;

    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;



}