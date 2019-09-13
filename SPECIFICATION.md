## Introduction

At The University of Edinburgh, the first programming languages students learn is Haskell, a statically typed, purely functional language with type inference and lazy evaluation. Unfortunately, there are a very limited number of learning resources for Haskell. For the very few resources available, none of them offer exercises in the context of computation and logic problems (e.g. finite state machines, kmaps, ...) The task for my Honours Project is to build an effective educational tool to help students learn Haskell to solve computation and logic problems.

## Motivation

When students learn computer programming, they often have a difficult time getting used to thinking in a computational manner. Thinking computationally is often a prerequisite to solving computer science problems and implementing software. It is however expected for there to be some initial difficulty in getting used to a radically new mindset; even for the simplest of tasks, computers need to be told how to do something step by step (imperative) or what needs to be done to do something (functional). People do not need to be told step by step nor do they need to be told what needs to be done to accomplish very simple tasks. 

## Model

I will model my project on the popular online programming website, Leetcode. The aim of Leetcode is to give students and software engineers a platform to improve their computational thinking ability by solving classical algorithm problems (e.g. find the kth biggest number in an array, implement code to find the longest increasing subsequence, design an algorithm for sorting linked lists, ...) Leetcode provides an online code editor which is somewhat similar to a programming text editor that does not allow plugins. Leetcode serialises and deserialises data structures into strings so the user does not have to worry about IO, this enables the user to focus solely on problem solving. 

If I wanted to solve the sort linked lists problem, I would write code that sorts linked lists and I would press the submit button. Test cases would run in the background and my code would be considered correct if all test cases pass and incorrect if a test case fails. Thus, each problem has a correct solution and a test suite with complete test case coverage. 

I could submit computation and logic programming questions to Leetcode but there are two problems. Firstly, Leetcode does not support Haskell and secondly it does not have a category for computation and logic problem. Instead I would have to submit the questions in a language other than Haskell and I would have to categorise them according to what algorithms would be required to solve computation and logic problems (e.g. for implementing DPLL, the categories would be: DFS and backtracking). This would confuse first years as algorithms and data structures is taught in the second year.

## Technical details

The idea will be realised as a web app implemented in JS using React. The web app will be hosted in the cloud as an Azure App Service. The GHC and a socket server receiving code to/from the web app will be put on a VM hosted in the Cloud with Azure. A CI/CD (continuous integration/continuous deployment) pipeline will be configured to automate the build (transpilation of ES6+ -> ES5, minimisation of JS code), execution of test suite and deployment to production. When a commit (code change) is made, the commit travels through the pipeline (as water travels through pipes) all the way to production so the developer does not have to worry about system administration.

## Scope for future expansion (e.g. if I was MInf)

Replace the code editor with a blocks editor for Haskell. The blocks editor will represent programming concepts such as variables, functions and algebraic data types as blocks which can be connected to create a computer program. There are some exempler blocks world editors (e.g. Blockly) available for languages such as JavaScript and Python. Blocky however does not support Haskell.

The blocks editor would be embedded into a series of programming exercises related to general algorithm problems and specific problems related to the content in INF1-CL. Problems in the former set will involve working with many different types of programming structures and algorithms such as: lists, dictionaries, trees, graphs, linked lists, union find, sorting and dynamic programming. Problems in the latter set (to be expanded)