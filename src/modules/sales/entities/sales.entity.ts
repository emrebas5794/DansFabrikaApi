import { ColumnNumericTransformer } from "src/common/transformers/numeric.transformer";
import { Course } from "src/modules/course/entities/course.entity";
import { Package } from "src/modules/packages/entities/package.entity";
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

    @Column()
    packagesId: number;

    @Column()
    courseId: number;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    price: number;
    
    @Column()
    type: number;
    
    @Column({ type: 'timestamp', precision: 3 })
    sellBy: Date;

    @ManyToOne(() => Student, (student) => student.id)
    student: Student

    @ManyToOne(() => Package, (pack) => pack.id)
    packages: Package

    @ManyToOne(() => Course, (c) => c.id)
    course: Course
}
