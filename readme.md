# Agent vs Agent

A javascript based robot vs robot game.

## Details

Agent vs Agent is a game for programmers. The goal of the game is to write an AI that is better in collecting points than the other team.

The game is turn based. The gaming field is a 8x8 discrete field (much like a chess board). Each team gets 3 instances of the programmed agent. The GameMaster dictates the interaction of the agents between each other and their environment.

An agent may choose one of 3 actions: move, communicate or collect.

All points are distributed at random.

To collect a point an agent has to stand on the same base as the point, collect it and return to the teams homebase.

There is no limit to the amount of entities that occupy the same base on the board.

## Install

Checkout the [source from github](https://github.com/Velrok/Agent-vs-Agent).

Use youre favorit browser to open <code>web/index.html</code>.

## How to write youre own AI

First of all you want to take a look at ```javascript/game_objects/AgentPrototype.js```.
It documents all the callbacks. 
For starters you probably want to take a look at ```teams/TestTeam.js```, specially the 'headless chicken' AI is a good example for a very basic working AI.
When you are ready for more complex stuff you may find ```teams/Stephan.js``` and ```teams/velrok.js``` usefull examples. This already implement the AI using a state machine.


## Feedback

Please file bug reports in the [issues section](https://github.com/Velrok/Agent-vs-Agent/issues?state=open).

I'm happy to hear from you. Just drop me an [email](mailto:waldemar.schwan+agentvsagent@gmail.com).