import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('packages')
export class Package {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number; 

    @Column()
    status: number;
}
