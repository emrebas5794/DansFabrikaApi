import { ColumnNumericTransformer } from "src/common/transformers/numeric.transformer";
import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('sales')
export class Sales {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    studentId: number;

    @Column()
    credit: number;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    price: number;
    
    @Column()
    type: number;
    
    @Column({ type: 'timestamp', precision: 3 })
    sellBy: Date;

    @ManyToOne(() => Student, (student) => student.id)
    student: Student
}
