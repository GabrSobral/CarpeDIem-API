import { PrimaryColumn, Column, ManyToOne, JoinColumn, Entity } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User';

@Entity('refresh_token')
class RefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  expires_in: Number;

  @PrimaryColumn()
  user_id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, { cascade: true })
  JoinUser: User;


  constructor(){
    if(!this.id){
      this.id = uuid();
    }
  }
}
export { RefreshToken }