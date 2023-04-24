#!/bin/bash

git status

read -p $'\nDo you want to Push to GitHub? (y/n): ' ANSWER

if [ "$ANSWER" = "y" ]
then
    read -p $'\nInput the commit message: ' COMMIT_MESSAGE

    git add .
    git commit -m "$COMMIT_MESSAGE"
    git push origin main

    echo -e "\nPush to GitHub is completed."
else
    echo -e "\nDid not push to GitHub."
fi