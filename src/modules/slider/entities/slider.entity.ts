import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slider')
export class Slider {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    queue: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    status: number;
}
