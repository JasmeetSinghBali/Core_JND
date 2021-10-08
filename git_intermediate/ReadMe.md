> ## Git Intermediate Topics (Version Control)

> ### The Perfect Commit

- [x] add the right changes
- [x] compose a good commit message!

> Effective use of staging area

**The idea is to only combine commits from the same topic and treat it as a single commit**

- [x] say we make changes to three files A,B,C it is not a good practice to cram every change in 1 commit.
- [x] the bigger the commits gets it becomes confusing for your future self and collegues.
- [x] here comes to the rescue **staging area** in git

                                # Bad Practice
                                file-A file-B file-C

                                commit-1 = file-A(full) + file-B(full) + file-C(full)


                                # Good Practice
                                file-A file-B file-C

                                commit-1 = file-A(full) + file-B(a part of it)
                                commit-2 = file-B(part of it) + file-C(full)

> git diff & git add -p index.html

                                git diff index.html
                                # will show the difference in state of index.html between local & remote repo(at github)

                                git add -p index.html
                                # git will go through the entire change in the index.html chunk by chunk and ask us to include a specific chunk change inside of index.html to be staged or not

                                y for yes & n for no

> Commit messages(git commit) to open up editor to add commit messages/body

- [x] Subject = concise summary of what happened
- [x] Body = more detailed explaination

  - [x] change
  - [x] reason for change
  - [x] what impact it creates
  - [x] anything to watch for/note to self/or other for future dev

                        # make sure git config has core.editor set up
                        git config --global core.editor "code --wait"

                        # after staging
                        git add .

                        # use the git commit to open editor that can be used to add commit messages and body
                        git commit

> In the editor

                        First line is Subject for the commit
                        space
                        Body of the Commit

> git log to have a look at your commit message
