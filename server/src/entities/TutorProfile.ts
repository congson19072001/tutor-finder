import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


export type TutorGender = "Male" | "Female";
export type Province = "An Giang"|"Bà Rịa - Vũng Tàu"|"Bắc Giang"|"Bắc Kạn"|"Bạc Liêu"|"Bắc Ninh"|"Bến Tre"|"Bình Định"|"Bình Dương"|"Bình Phước"|"Bình Thuận"|"Cà Mau"|"Cao Bằng"|"Đắk Lắk"|"Đắk Nông"|"Điện Biên"|"Đồng Nai"|"Đồng Tháp"|"Gia Lai"|"Hà Giang"|"Hà Nam"|"Hà Tĩnh"|"Hải Dương"|"Hậu Giang"|"Hòa Bình"|"Hưng Yên"|"Khánh Hòa"|"Kiên Giang"|"Kon Tum"|"Lai Châu"|"Lâm Đồng"|"Lạng Sơn"|"Lào Cai"|"Long An"|"Nam Định"|"Nghệ An"|"Ninh Bình"|"Ninh Thuận"|"Phú Thọ"|"Quảng Bình"|"Quảng Nam"|"Quảng Ngãi"|"Quảng Ninh"|"Quảng Trị"|"Sóc Trăng"|"Sơn La"|"Tây Ninh"|"Thái Bình"|"Thái Nguyên"|"Thanh Hóa"|"Thừa Thiên Huế"|"Tiền Giang"|"Trà Vinh"|"Tuyên Quang"|"Vĩnh Long"|"Vĩnh Phúc"|"Yên Bái"|"Phú Yên"|"Cần Thơ"|"Đà Nẵng"|"Hải Phòng"|"Hà Nội"|"TP HCM";
export type TutorNotice = "at_least_1_hour" | "at_least_3_hour" | "at_least_6_hour" | "at_least_12_hour" | "at_least_1_day" | "at_least_2_day";
export type TutorBookingWindow = "2_week" | "3_week" | "1_month" | "2_month";

@ObjectType()
@Entity()
export class TutorProfile extends BaseEntity {

    @Field(_type=>ID)
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field(_type=>String)
    @Column({default: ""})
    bio: string;

    @Field(_type=>String)
    @Column({
        type: "enum",
        enum: ["Male", "Female"],
        default: "Male"
    })
    gender: TutorGender;
    

    @Field(_type=>String,{nullable: true})
    @Column({nullable: true})
    age: number;

    @Field(_type=>String)
    @Column({default: ""})
    address!: string;

    @Field()
    @Column({
        type: "enum",
        enum: ["An Giang","Bà Rịa - Vũng Tàu","Bắc Giang","Bắc Kạn","Bạc Liêu","Bắc Ninh","Bến Tre","Bình Định","Bình Dương","Bình Phước","Bình Thuận","Cà Mau","Cao Bằng","Đắk Lắk","Đắk Nông","Điện Biên","Đồng Nai","Đồng Tháp","Gia Lai","Hà Giang","Hà Nam","Hà Tĩnh","Hải Dương","Hậu Giang","Hòa Bình","Hưng Yên","Khánh Hòa","Kiên Giang","Kon Tum","Lai Châu","Lâm Đồng","Lạng Sơn","Lào Cai","Long An","Nam Định","Nghệ An","Ninh Bình","Ninh Thuận","Phú Thọ","Quảng Bình","Quảng Nam","Quảng Ngãi","Quảng Ninh","Quảng Trị","Sóc Trăng","Sơn La","Tây Ninh","Thái Bình","Thái Nguyên","Thanh Hóa","Thừa Thiên Huế","Tiền Giang","Trà Vinh","Tuyên Quang","Vĩnh Long","Vĩnh Phúc","Yên Bái","Phú Yên","Cần Thơ","Đà Nẵng","Hải Phòng","Hà Nội","TP HCM"],
        default: "Hà Nội"
    })
    province: Province;

    @Field(_type=>String)
    @Column({default: "https://pic.onlinewebfonts.com/svg/img_264570.png"})
    avatar: string;

    @Field()
    @Column({
        type: "enum",
        enum: ["at_least_1_hour", "at_least_3_hour", "at_least_6_hour", "at_least_12_hour", "at_least_1_day", "at_least_2_day"],
        default: "at_least_1_day"
    })
    advanceNotice: TutorNotice;

    @Field()
    @Column({
        type: "enum",
        enum: ["2_week", "3_week", "1_month", "2_month"],
        default: "2_week"
    })
    bookingWindow: TutorBookingWindow;


    @Field()
    @CreateDateColumn({type: 'timestamptz'})
    createdAt: Date;

    @Field()
    @UpdateDateColumn({type: 'timestamptz'})
    updatedAt: Date;
}
