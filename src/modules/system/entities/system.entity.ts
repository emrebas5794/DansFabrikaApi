import { IConfig } from "src/common/models/config.model";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('system')
export class System {

    @PrimaryColumn()
    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column()
    sale: boolean;
}
