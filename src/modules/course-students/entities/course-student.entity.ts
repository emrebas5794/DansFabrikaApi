import { ColumnNumericTransformer } from "src/common/transformers/numeric.transformer";
import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('coursestudents')
export class CourseStudent {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    courseId: number;

    @Column()
    studentId: number;
    
    @Column({ type: 'timestamp', precision: 3 })
    startDate: Date;

    @Column({ type: 'timestamp', precision: 3 })
    endDate: Date;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    paidPrice: number;
    
    @Column()
    status: number;

    @Column()
    createdDate: Date;

    @ManyToOne(() => Student, student => student.id)
    student: Student
}
