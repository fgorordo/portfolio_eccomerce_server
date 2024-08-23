import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashPassword } from '../utils';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    fullName: string;

    @Column('text', {unique: true})
    email: string;

    @Column('text', {select: false})
    password: string;

    @Column('bool', {select: false, default: true})
    isActive: boolean;

    @CreateDateColumn({type: 'timestamp', select: false})
    cratedAt: Date;

    @UpdateDateColumn({type: 'timestamp', select: false})
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hashPassword(this.password)
    }

    @BeforeInsert()
    setDefaultValues() {
        if (this.isActive == undefined) {
            this.isActive = true;
        };
    }
    
    @BeforeInsert()
    normalizeValues() {
        this.email = this.email.trim().toLowerCase();
    }

    @BeforeUpdate()
    normalizeValuesBeforeUpdate() {
        this.normalizeValues();
    }
    
}
