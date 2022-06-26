> Event & Tasks Scheduling in Nestjs

              nest new events-tasks-schedule-nestjs

- nestjs/event-emitter
- nestjs/schedule
- @types/cron (dev depend)

              npm run start:dev

ref1: https://docs.nestjs.com/techniques/task-scheduling
ref2: https://docs.nestjs.com/techniques/events

> Steps

1. setup event emitter and scheduler module inside imports array app.module.ts

2. create user controller route with dto request

3. and app-service to create user i.e CREATE operation with DB with event emitter and scheduler

4. now say the scenario is that after a user is created we need process an event of sending user an email & welcome gift.

5. now the addition email & welcome gift have to decoupled with the main createUser function in app.service as the end user is only concerned wheather the user was created or not.

6. **create a event dir in src root that holds the event payload for in our case email and userId of user just created.**

7. **then use OnEvent decorator to listen to the new user created event.**

8. **OnEvent decorator can be used to register multiple listners for single event emitted.**

9. **scheduling in nestjs via @Cron decorator & CronExpression that give u methods to actually schedule jobs**

10. **sometimes their is a requirement to trigger code dynamically i.e intiate an job dynamically where the cause was some dynamic change in code or event emitted then we use SchedulerRegistery**

Note- schedulerRegistery runs in-memory so if the app is clustered then use this wisely or using another approach than scheduler registery would be better
