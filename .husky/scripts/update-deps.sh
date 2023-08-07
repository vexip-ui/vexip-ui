changed_files="$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD)"

check_run() {
  if (echo "$changed_files" | grep --quiet "$1"); then
    echo ""
    echo "Lock file changed, automatically install dependencies"
    echo ""
    eval "$2"
  fi
}

check_run pnpm-lock.yaml "pnpm install"
