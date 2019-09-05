## Introduction

At The University of Edinburgh, the first programming languages students learn is Haskell, a statically typed, purely functional language with type inference and lazy evaluation. Unfortunately, Haskell is not a popular language outside research and academia which means there are a limited number of learning resources for students. The task for my Honours Project is to build an effective educational tool to help students learn Haskell.

## Motivation

When I first started learning computer programming, I had a difficult time learning the syntax of the language. Whilst solving problems, I had to juggle problem solving and learning the syntax of the programming language. I found myself having to google questions such as 'Syntax for a new integer array' and 'What types of brackets should I use to create a method'. I feel it would be better if beginners could learn both problem solving and syntax whilst only needing to focus on problem solving. 

## Blockly

My honours project will address this problem, I will create a blocks editor specifically for Haskell. The blocks editor will represent programming concepts such as variables, functions and algebraic data types as blocks which can be connected to create a computer program. There are some exempler blocks world editors (e.g. Blockly) available for languages such as JavaScript and Python. Blocky however does not support Haskell. 

## Web app

The blocks editor will be embedded into a series of programming exercises related to general algorithm problems and specific problems related to the content in INF1-CL. Problems in the former set will involve working with many different types of programming structures and algorithms such as: lists, dictionaries, trees, graphs, linked lists, union find, sorting and dynamic programming. Problems in the latter set (to be expanded)

As the learner gets more familiar with the syntax of Haskell, they can disable the blocks editor. The blocks editor will act as training wheels.

I will also explore gamification to keep the exercises fun for the students who will be using my educational tool. (Un)original ideas for this include creating a leaderboard and creating quizes. I will do some further research to come up with some original ideas. 