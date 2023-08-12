import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('sipay')
export class Sipay {
    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    salesId: number;

    @Column()
    invoiceId: string;

    @Column()
    hashKey: string;

    @Column()
    orderNo: string;

    @Column()
    orderId: string;

    @Column({ type: 'json' }) @Column()
    data: string;
}
