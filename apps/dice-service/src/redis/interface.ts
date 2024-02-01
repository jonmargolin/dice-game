export  interface IShowResult  {
  
    userCount: string,
    activeUser: string,
  };
  export class ShowResult  {
    activeUser: string [];
    userCount: number ;
    constructor(userCount: number, activeUser: string[], ){
        this.userCount = userCount;
        this.activeUser = activeUser
    }

  }