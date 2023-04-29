import { PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";

export class Attendance {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    attendanceDate: Date;

    @Column()
    courseId: number;
    
    @Column()
    lessonId: number;
    
    @Column()
    studentId: number;}
