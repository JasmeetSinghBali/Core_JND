> # Github Actions CI/CD

- [x] **Consider events like pull,push,code changes in the repo in response to these event a automated workflow is triggered which is executed like build->testing->deployment**

- [x] **Continuous Integeration means that when any dev pushes code to the repo then the code is automatically tested and functional code components/changes from dev are merged  with the main source code**

> ## Actions tab in github

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

- [x] **then only thing left is to stage and commit the code along with this new workflows in the remote master branch of repo**

                            git add .
                            git commit -m "ci: workflow"
                            git push origin master

> ## test out the ci: workflow by creating a pull request
                        
                        # create new branch and move into it 
                        git checkout -b testing

                        # now make some changes in the code for test to fail
                        # then add and commit code 
                        git add .
                        git commit
                        git push origin testci

                        # go to github > compare & pull request 