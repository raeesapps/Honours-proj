## Introduction

At The University of Edinburgh, the first computer science course students study is a course giving an introduction to computation, logic and functional programming. In the logic section of that course, syllogisms are taught to students. A syllogism is an argument that has two propositions and a conclusion derived from the two propositions. E.g. Socrates is a man. All men are mortal. Therefore, Socrates is mortal. For my honours project, I would like to create a tool to help students learn syllogisms.

## Types of questions

1st type: an argument will be presented in symbolic form (e.g. BARBARA; P1 = MaP, P2 = SaM, C = SaP) and the student will need to shade venn diagrams (one venn diagram for each of MaP, SaM, SaP and one for the intersection of S,M,P) appropriately to show the argument is valid. An invalid argument can be presented and it is up to the student to illustrate the contradiction.

2nd type: an argument will be presented in either symbolic form or as a venn diagram and the student will need to prove that it is a valid argument. If it is presented as a venn diagram then the student will need to write the symbolically. The student may use any appropriate method of proof.

3rd type: the student will be presented with one of any of the 256 possible categorical syllogisms; the student must identify the reasoning error. Possible reasoning errors include: ‘Exclusive premises’, ‘Affirmative conclusion from a negative premise’, ‘Negative conclusion from the affirmative premise’, ‘Existential fallacy’. There will always be an option 'no error' for a syllogism that doesn't have a reasoning error. 

4th type: Given a major and minor premise, the student must select the conclusions that follow and the conclusions that do not follow. Both the premises and conclusions may be expressed in symbolic form or in venn diagram form.

In all of the particular types of questions, the argument can be represented with plain symbols (e.g. S,M,P) or real world objects. If they are represented with real world objects then there is scope for using NLP (n-gram model) to select real world objects (in place of S, M, P) that make sense. If they make sense then it is much easier for the student to relate to them and it may make reasoning about the syllogism easier than if the combination of real-world objects makes no sense (S = surgeons, M = phones, P = houses)

## Technical details

The idea will be realised as a web app implemented in JS using React. The web app will be hosted in the cloud as an Azure App Service. A CI/CD (continuous integration/continuous deployment) pipeline will be configured to automate the build (transpilation of ES6+ -> ES5, minimisation of JS code), execution of test suite and deployment to production. When a commit (code change) is made, the commit travels through the pipeline (as water travels through pipes) all the way to production so the developer does not have to worry about system administration.

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `pnpm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `pnpm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `pnpm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
