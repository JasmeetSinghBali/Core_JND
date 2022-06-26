/** 
 * AIM- to dispatch event emitters that will send email and gift during the user creation in seprated thread so it do not blocks the main task/thread of createUser via Event Emitter
*/


import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CreateUserRequest } from './dto/create-user.request';
import { UserCreatedEvent } from './events/user-created.event';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2, private schedulerRegistery: SchedulerRegistry){}
  // private logger used during new user creation
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    // 📝 using schedulerRegistery provide many methods a/c to our requirement
    // this.schedulerRegistery.
    return 'Hello World!';
  }
  async createUser(body: CreateUserRequest){
    // first create a new user here DB CREATE query can be made
    this.logger.log('creating new user...',body);
    const userID = "123"

    // 📝emitting the user created event
    this.eventEmitter.emit(
      'user.created',
       new UserCreatedEvent(userID,body.email)
    );

    // 📝 we need to establish a web socket connection after 5 sec of the user creation
    const establishWebSocketTimeout = setTimeout(()=> this.establishWSConnection(userID),5000);
    
    // 📝 registering a schedulerRegistery timeout with the above wstimeout with dynamic name
    this.schedulerRegistery.addTimeout(`${userID}_establish_webSocket`,establishWebSocketTimeout)
  }

  private establishWSConnection(userId: string){
    this.logger.log('establishing web connection with user',userId);
  }

  // 📝listen to event with OnEvent decorator 
  // 1. send email to user
  // 2. send gift to them
  @OnEvent('user.created')
  welcomeNewUser(payload:UserCreatedEvent){
    //send email to the user
    this.logger.log('Welcoming a new user & sending them email',payload.email)
  }
  @OnEvent('user.created',{async: true})
  async sendGifToNewUser(payload:UserCreatedEvent){
    //send gift to the user
    this.logger.log('sending welcome gift to newly created user...',payload.email);
    // simulating that gift dispatch takes 3 seconds like as an async task
    await new Promise<void>((resolve)=>setTimeout(()=>resolve(),3000));
    this.logger.log('bunny sent to newly created user...',payload.email);
  }

  // 📝Scheduling jobs via @Cron decorators
  // example deleting expired users
  // 🎯 further this cron job can be deleted or added by scheduler registery by its name: 'delete_expired_users'
  @Cron(CronExpression.EVERY_10_SECONDS,{name:'delete_expired_users'})
  deleteExpiredUsers(){
    this.logger.log('deleting expired users...');
  }
}
