# webservice

Prerequisites:

You should have git installed in your system
you should have node installed in your system
you need mocha and npm to test the unit cases in your system


Setup:

after cloning the build, start the node server from the file source/main.js
to run the unit testing you can run npm run test



Instructions:

Git (30%)
All students must use the Github forking workflow and their repositories (main branch which must include code for this assignment) must be in-sync. Check this by asking students to create pull requests between their main branch and their assignment branch. There should be no changes. Verify that all assignment changes are in main branch.

Verify that students have added TAs and instructors as collaborators to the GitHub repository.

Verify that students have README.md file in their git repository and it contains instructions on how to build, test and deploy their application including any pre-requisites for a programming language, frameworks, and third-party libraries.
Verify that the dev environment is not set up in Downloads folder.
Git repositories should be cloned locally using git/ssh protocol and not https.
Verify this by running git remote -v the command in the cloned repository in the VM.
Validate that students have created a fork of the organization repository are working on it.
Verify that the student has made no direct commits to their organization repository.
Git Repository Content Check (10%)
Check the repository for any IDE-specific files. IDE configuration files must not be in the repository.
Verify their .gitignore configuration.
Check the repository for build artifacts such as .class, .jar, .war files and build, node_modules directory. None of these should be checked into the repository.
Check for dependencies. Dependencies from the Maven repository or npm should not be committed to the git repository.
Continuous Integration (30%)
GitHub Action workflow is triggered when PR is opened.
GitHub Repository has branch protection configured to prevent PRs from merging when a workflow fails.
 
