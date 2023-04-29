import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class ColumnNumericTransformer {
    to(data: number): number {
        return data;
    }
    from(data: string | any) {
        return parseFloat(data);
    }
}

@Entity('coursestudents')
export class CourseStudent {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    courseId: number;

    @Column()
    studentId: number;
    
    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ type: 'decimal', precision: 11, scale: 2, default: 0, transformer: new ColumnNumericTransformer() })
    paidPrice: number;
    
    @Column()
    status: number;

    @Column()
    createdDate: Date;
}
