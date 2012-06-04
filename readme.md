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

Currently the app assumes two classes <code>TeamAAgent</code> and <code>TeamBAgent</code>. 
You can find the example/default implementations in <code>web/teams/TestTeam.js</code>

Team B is an example on how to collect points and do basic environment sensing.
Team A is an example on how to communicate. They assign roles to each other, but don't use that knowledge for now.

Your AI should be able to beat Team B quiet easily in a best of 5. Team A does not collect any points at all :).


## Feedback

Please file bug reports in the [issues section](https://github.com/Velrok/Agent-vs-Agent/issues?state=open).

I'm happy to hear from you. Just drop me an [email](mailto:waldemar.schwan+agentvsagent@gmail.com).