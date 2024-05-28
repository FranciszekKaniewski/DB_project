import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        length: 150,
        type: "varchar",
    })
    title: string;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    startDate: string;

    @Column({
        type: "datetime",
        default: () => "CURRENT_TIMESTAMP",
    })
    endDate: string;

    @Column({
        type: "varchar",
    })
    type: 'soft'|'hard';

    @Column({
        type: "boolean",
        default: false,
    })
    reminder: boolean;

    @Column({
        type: "boolean",
        default: false,
    })
    done: boolean;
}
