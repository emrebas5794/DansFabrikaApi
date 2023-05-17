import { DanceLevel } from "src/modules/dance-level/entities/dance-level.entity";
import { DanceType } from "src/modules/dance-type/entities/dance-type.entity";
import { Trainer } from "src/modules/trainer/entities/trainer.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class ColumnNumericTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string | any) {
        return parseFloat(data);
    }
}

@Entity('course')
export class Course {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    danceTypeId: number;

    @Column()
    danceLevelId: number;

    @Column()
    capacity: number;

    @Column()
    trainerId: number;

    @Column()
    description: string;

    @Column({ type: 'timestamp', precision: 3 })
    startDate: Date | string;

    @Column({ type: 'timestamp', precision: 3 })
    endDate: Date | string;

    @Column()
    courseType: number;

    @Column()
    onSale: number;

    @Column()
    image: string;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    price: number;

    @Column()
    status: number;

    @Column()
    createdDate: Date;

    @ManyToOne(() => Trainer, (trainer) => trainer.id)
    trainer: Trainer

    @ManyToOne(() => DanceType, (danceType) => danceType.id)
    danceType: Trainer

    @ManyToOne(() => DanceLevel, (danceLevel) => danceLevel.id)
    danceLevel: Trainer

}