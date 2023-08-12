import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('calendar')
export class Calendar {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    queue: number;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    status: number;
}
