import { Student } from "src/modules/student/entities/student.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type: number;

    @Column()
    title: string;

    @Column()
    message: string;

    @Column()
    studentId: number;

    @Column()
    status: number;

    @ManyToOne(() => Student, student => student.id)
    student: Student
}
