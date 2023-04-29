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
    price: number;
    
    @Column()
    type: number;
    
    @Column()
    sellBy: Date;

    @ManyToOne(() => Student, (student) => student.id)
    student: Student
}
