import { Notification } from "src/modules/notification/entities/notification.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('student')
export class Student {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    identity: string;
    
    @Column()
    email: string;
    
    @Column()
    phone: string;
    
    @Column({ select: false })
    password: string;
    
    @Column()
    image: string;
    
    @Column()
    country: string;

    @Column()
    gender: number;
    
    @Column()
    birthday: Date;
    
    @Column()
    credit: number;
    
    @Column()
    score: number;
    
    @Column()
    reference: number;
    
    @Column()
    referenceId: number;
    
    @Column()
    code: number;

    @Column()
    status: number;

    @Column()
    createdDate: Date;

    @OneToMany(() => Notification, notify => notify.student)
    notifications: Notification[]
}
