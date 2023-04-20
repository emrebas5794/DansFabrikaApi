import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
    country: number;

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
}
