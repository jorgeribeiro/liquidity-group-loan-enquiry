import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  loan_date: Date
  
  @Column()
  age: number
  
  @Column()
  job: string
  
  @Column()
  marital: string
  
  @Column()
  education: string
  
  @Column()
  default: string
  
  @Column()
  balance: number
}