import { ColumnNumericTransformer } from "src/common/transformers/numeric.transformer";
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

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    price: number; 

    @Column()
    credit: number;

    @Column()
    status: number;
}
