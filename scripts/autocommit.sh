#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$repo_root"

# Stage all changes
git add .

# If nothing to commit, exit
if git diff --staged --quiet; then
  echo "No changes to commit."
  exit 0
fi

# Build commit message from staged files
files=$(git diff --staged --name-only)
# Create a short message: verb + list
# Determine action verb by checking git status porcelain for added/modified/deleted
added=$(git diff --staged --name-status | awk '$1=="A"{print $2}' | wc -l)
modified=$(git diff --staged --name-status | awk '$1=="M"{print $2}' | wc -l)
deleted=$(git diff --staged --name-status | awk '$1=="D"{print $2}' | wc -l)

verb="Update"
if [ "$added" -gt 0 ] && [ "$modified" -eq 0 ] && [ "$deleted" -eq 0 ]; then
  verb="Add"
elif [ "$deleted" -gt 0 ] && [ "$added" -eq 0 ] && [ "$modified" -eq 0 ]; then
  verb="Remove"
fi

# Build file list (max 5 files, else show count)
file_list=""
count=0
while read -r f; do
  count=$((count+1))
  if [ $count -le 5 ]; then
    if [ -z "$file_list" ]; then
      file_list="$f"
    else
      file_list="$file_list, $f"
    fi
  fi
done <<< "$files"

if [ $count -gt 5 ]; then
  file_list="$file_list, and $((count-5)) more"
fi

commit_msg="$verb: $file_list"

# Fallback commit message
if [ -z "$file_list" ]; then
  commit_msg="chore: workspace changes"
fi

# Commit and push
git commit -m "$commit_msg"
current_branch=$(git branch --show-current)
git push origin "$current_branch"

echo "Committed and pushed: $commit_msg"