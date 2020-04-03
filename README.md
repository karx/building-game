## The Building Game
Based on game created by SethBling in Minecraft 
https://www.youtube.com/watch?v=qBOHvRQ3orE


## Extra
Wanted to build on stream however the infra has failed me.

## Infra Talk
* Will be using firebase as the Central state machine.
* Will have a firebase admin service running maybe? To process the actions
* The FE is divided into two parts. The controller & the status dashboard.

#### The controller
This is the main UI for the game. This is where all user inputs are taken.
We need a good Paint/Building mechanism for this. 

Let's explore the depths and width of OSS to find one for us.

#### The status Dashboard
Will only display current status of the game, etc.


## Flow Talk

```
Refer image/scan
```
![photo_2020-04-03_21-45-44](https://user-images.githubusercontent.com/7826138/78382589-bbb6a280-75f4-11ea-80c3-f3911d663faf.jpg)


## Devlop Talk

We use sass for styling, use the following: 

```
    sass --watch .\bg-styles.scss:.\style.css
```

The deployment is done using Netlify.


