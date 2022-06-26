export class UserCreatedEvent{
    constructor(public readonly userID: string, public readonly email:string){}
}