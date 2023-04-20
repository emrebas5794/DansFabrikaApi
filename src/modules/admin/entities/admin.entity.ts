import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('admin')
export class Admin {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({ select: false })
    password: string;

    @Column()
    role: number;

    @Column()
    status: number;
}
