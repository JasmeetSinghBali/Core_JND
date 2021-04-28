# Git Basics

- Distributed Version Control System
- Helps to manage Software that comprise of small to large teams.
- Track history manage versions in software.

***

## Configuring Git

- git --version to see that wheather you have installed git correctly.

#### Levels & basic git config

 - SYSTEM --system (All users)
 - GLOBAL --global (all repo of the current user)
 - LOCAL  --local  (the current repo)



              git config --global user.name "your name"
              git config --global user.email "your email"
              git config --global core.editor "code --wait"

- code refers to visual studio code you can set a/c to your fav code editor.

              git config --global -e

- to edit all config for git use above command              

#### Configuring end of lines

- ****in windows end of line is marked via \r(carriage return) or \n(line field)****

- to make sure that the cr is avoided and git only takes account to the line field so that conflict dont arises when two different persons commit.

         git config --global core.autocrlf true/input

- ****if on windows then set to true****
- ****if on linux or mac set to input****

#### for Help on git config

        git config -h

***

# Taking Snapshots of the project

        mkdir yourProject
        cd yourProject

- Initialize repo
        git init

- to see the .git hidden directory
        ls -a

- open .git

        open .git

### git workflow

- ****creating a commit of our edited dir or files is like creating a snapshot of the project.****

## What is Stagin Area/Index

- ****It contains the files we are proposing for the next commit.****

- ****Staging area helps to revew before commiting****

        git add file1 file2
        git status
        git commit -m "Initial Commit"

### NOTE-> Staging area is never empty it always has the reflection of the latest commit/software version that we commited.

- ****Suppose we  deleted file2 then we proceed as****

       git add file2
       git commit -m "deleted file2"

- ****each commit in git has a unique ID,author,time,data,complete snapshot****

## Git efficiency

- Compress the content.
- Does not store duplicate content.

## tracking files and Staging

- ****Git do not tracks your file automatically****

      git status

- to know which files are tracked(green) which are not(red)

## Skipping the staging area

 ****to directly commit and add i.e skip the staging area a stands for all and m for commit.****

     git commit -am ""

***

# Removing Files from staging area and working directory.

-  say u have file 1 and file 2 staged.

    rm file2.txt

****to see the files in staging area****

    git ls-files

    file1
    file2

****to commit the removal of file2****

    git add file2
    git ls-files

    file1

****to remove file from both staging and working directory at once****

    git rm file2.txt/*.txt

- where the *.txt specifies pattern i.e all text files.


## Renaming and moving Files

    mv file1.txt main.js

- ****the above command renames file1.txt to main.js****

- ****below command to rename files in both working dir and staging area****

    git mv main.js file.js

## Ignoring Files

- make a new file in the root level of your project .gitignore

      touch .gitignore

- Inside .gitignore

      *.txt           //to ignore all txt files
      node_modules/   //to ignore node_modules directory
      .env            //ignore .env file

## To remove files or dir that were accidently staged

      git rm --cached filename or git rm -r --cached dirname

- ****cached only removes from index/staging area.****

# Viewing the staged and unstaged changes

****diff --staged helps to view staged files and dir line by line****
      git diff --staged

      Output
      diff --git a/file1.js b/file1.js    // it is comparing two version of same file a is old copy and b is new one.
      index metadata                
      ---a/file1.js                 //--- sign represent changes in old copy
      +++b/file2.js                 //+++ sign represetn changes in new copy

      @@-1,3 +1,5 @@                // chunks of changing -1 representing the old copy from line 1
                                    // +1 representing changes in the new copy from line 1

# Logs history of our commits

      git log

- Head refers to the current branch we are working on.

      git log --oneline --reverse

- ****above command shows the commit from the first time you commited to the latest you commited.****

# Viewing a commit

     git show uiqueidentifier(d6019)

- ****Above command shows the history of the commit refernece with its unique id****

      git show HEAD

- ****To show the latest commit****

      git show HEAD~1/2/3/4

- ****In above command if 1 then it show latest commit 2 then before the latest commit if 3 then the 3rd last commit in history.****

- ****To know all the commits made in past summary ****

      git ls-tree HEAD~1

-****wheer blob represents files and tree represents directories.****

***

# Unstaging files

    git restore --staged file1 file2 *.js or git restore --staged .

- ****the above command restore helps to unstage the files,dir,sequence of files with pattern if they are accidently staged****

      git status -s

- ****will show the files/dir changes are in the staging area or not****

***
# Discarding local changes

     git restore file1

- ****the above command will copy the old version of file1 form staging area and discard the new changes that we made in file1****

      git restore .

- ****the above command undo all the local changes****

      git clean -fd

- **** the clean command helps to remove files from staging area also with f as force and d as whole directory.****

# Restoring a file that was deleted

- git rm file1 removes file 1 from staging and working directory.

- git restore --source=HEAD~1 file1 will restore the file 1 in the staging area.
