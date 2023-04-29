#!/bin/bash

git status

read -p $'\nDo you want to Push to GitHub? (y/n): ' ANSWER

if [ "$ANSWER" = "y" ]
then
    read -p $'\nInput the commit message: ' COMMIT_MESSAGE

    # Remove non-alphanumeric and non-space characters from the commit message
    CLEANED_COMMIT_MESSAGE=$(echo "$COMMIT_MESSAGE" | sed 's/[^a-zA-Z0-9[:space:]]//g')

    git add .
    git commit -m "$CLEANED_COMMIT_MESSAGE"
    git push origin main

    echo -e "\nPush to GitHub is completed."
else
    echo -e "\nDid not push to GitHub."
fi
