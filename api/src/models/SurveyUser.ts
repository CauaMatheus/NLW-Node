import {
  Column, CreateDateColumn, Entity, PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('surveysUsers')
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  userID: string;

  @Column()
  surveyId: string;

  @Column()
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default SurveyUser;
