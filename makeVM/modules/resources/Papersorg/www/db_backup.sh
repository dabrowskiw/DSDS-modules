#!/bin/sh
date=$(date '+%Y-%m-%d')
mysqldump --databases papersorg > "mysqldump/${date}.sql"
