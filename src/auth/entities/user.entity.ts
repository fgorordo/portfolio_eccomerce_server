import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { hashPassword } from '../utils';
import { UserRoles } from '../interfaces';

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

    @Column('bool', {default: true})
    isActive: boolean;

    @Column('text', {array: true, default:[UserRoles.USER]})
    roles: UserRoles[]

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
            this.roles = [UserRoles.USER];
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
