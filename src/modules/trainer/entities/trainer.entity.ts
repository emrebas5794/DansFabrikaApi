import { PrimaryColumn, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity('trainer')
export class Trainer {    
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    name: string;

    @Column()
    birthday: Date;
    
    @Column()
    email: string;
    
    @Column()
    phone: string;
    
    @Column({ select: false })
    password: string;

    @Column()
    image: string;
    
    @Column()
    description: string;
    
    @Column()
    status: number;
}
