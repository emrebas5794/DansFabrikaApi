import { ColumnNumericTransformer } from "src/common/transformers/numeric.transformer";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('bills')
export class Bill {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    processType: number;

    @Column()
    process: number;

    @Column()
    description: string;

    @Column({ type: 'timestamp', precision: 3 })
    processDate: any;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    price: number;
}
