> # Github Actions CI/CD

> #### refer https://docs.github.com/en/actions/quickstart ,make sure that the .github is in the root of your repo

- [x] **Consider events like pull,push,code changes in the repo in response to these event a automated workflow is triggered which is executed like build->testing->deployment**

- [x] **Continuous Integeration means that when any dev pushes code to the repo then the code is automatically tested and functional code components/changes from dev are merged  with the main source code**

> ## CI : Merge code in

- **Navigate to the actions tab in the github you can observe how automated workflow can be created**

                        # refer 225-github-actions-demo directory

                        to create a workflow you need to make a dir named as 
                        .github>workflows>integrate.yml

- **anything written inside integrate.yml act as a automated workflow that triggers on events like push**

> ### Configuring integreate.yml for automated workflow

                            # integrate.yml

                            name: arbitary name
                            
                            # on describes on which events this workflow runs
                            # for the below the workflow will run when a pull request is made to the master branch
                            # now every workflow has 1 or 2 jobs , we have to specify on which VM to run on
                            # we have steps to be executed in the workflow, like to copy source code to VM use checkout actions to bring source code to current working dir
                            # setup node js with setup node action
                            # also specifiying the node-version
                            # then installing the packages with npm ci
                            # then npm test to test the code
                            # then build command so that build compiles properly
                            # if cypress is used in your testig their is github action setup automatically cyress-io
                            on:
                                pull request:
                                    branches: [master]
                            jobs:
                                test_pull_request:
                                    runs-on: ubuntu-latest
                                    steps:
                                        - uses: actions/checkout@v2
                                        - uses: actions/setup-node@v1
                                          with:
                                            node-version:12
                                        - run: npm ci
                                        - run: npm test
                                        - run: npm run build

- [x] **then only thing left is to stage and commit the code along with this new workflows in the remote repo**

                            git add .
                            git commit -m "ci: workflow🎃"

- [x] **create a pull request to check your ci:workflow**

                        git checkout -b testci
                        # make changes to code that fail the test
                        git add .
                        git commit -m "this breaks the test"
                        git push origin testci

- [x] **go to github and compare the pull request , then see details to make sure the code pass all the test undo th changes in source code and push again into test ci and then compare pull request again the workflow will be completed**

***

> ## CD - Release code out to customers
                
                # make sure you are authenticated by firebase account on local system 
                # example of firebase hosting
                firebase init
                firebase deploy --only hosting

- [x] **to authenticate a automate CI server to firebase, this is done by secret token**

                # we do this by providing a firebase token to github
                firebase login:ci
                # copy the token and keep it secret

- [x] **go to githubrepo > settings > secrets > add a new secret name thier as**

                Name: FIREBASE_TOKEN
                Value : "your firebase api_token copied from cli after execution of login:ci"

- [x] **now github encrypts this api key and this way ci server of github can securly interact with the firebase servers**

                # create another deploy.yml in workflows
                # this workflow runs when a merge happens on pull request to the master branch or their is direct push to master branch
                # everything is same as CI , just in cd we use a third party actions to deploy to firebase
                name: Firebase CD

                on:
                push:
                    branches: [ master ]
                
                jobs:
                    deploy:
                        runs-on: ubuntu-latest
                        steps:
                            - uses: actions/checkout@master
                            - uses: actions/setup-node@master
                              with:
                              node-version: 12
                            - run: npm ci
                            - run: npm run build
                            - uses: w9jds/firebase-action@master
                              with:
                                args: deploy --only hosting
                              env: 
                                FIREBASE_TOKEN :${{ secrets.FIREBASE_TOKEN }}

- [x] **finally to use it push to master branch**

                        git add .
                        git commit
                        git push origin master

                        # done ci/cd pipeline setup
***

> ## Publishing npm package package.yml refer package.yml

- [x] **needs helps to tell github actions workflow to execute something after the previous/specific job is complete**

> ## Integrating Apps refer slack.yml

- [x] **suppose we want a slack notification every time a github issue is reported, this can be done by setting up trigger for github issues and then a job that gets executed of posting messages to slack channel with webhooks**

- [x] **can be done via both creating your own workflow or installing app in github actions**

**

> ## Schedule background jobs with github actions refer- cronjobs.yml


- [x] **example how to export data on firebase on regular basis like kinda backing up db everyday**
- [x] **use crontab guru to generate cron schedules a/c to your needs refer https://crontab.guru/** 
