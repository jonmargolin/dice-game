# DiceGame


## Start the app
  To run the application in production mode **docker-compose up**
  </br> 
  To run the application in development in docker  run **docker-compose -f docker-compose-dev**
   </br>
   To run the only the dice service run **nx serve dice-service**
   To run only the ui run **nx serve dice-app**

   ### Application components
    dice-app  react application 
    dice- service   nest-js application
    redis  for cash and in memory store.
</br>

### Game Flow 
 each user have up to 10 round 
 </br>
 User can roll the dice once for a round if the user wants to terminate the  round he can send  request to end the round and the other users will  get notified.
 </br>
 each user can decide if they want to re-roll the dice or to kip the dice.
 when  the end the round, timer will be triggered up to 10 seconds for the other users to re-roll the dice.
 when the end the round al users  will get  the result  of the round the user with the highest  dice  sum and the lowest  run number will be the winner.

 ###  sequence diagram
![alt text](https://github.com/jonmargolin/dice-game/blob/main/diagram.png?raw=true)