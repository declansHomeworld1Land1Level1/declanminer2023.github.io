const github = new GitHub({
  // Your GitHub personal access token (PAT)
  accessToken: process.env.GITHUB_PAT, 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
});

// The GitHub username of the account you want to track
const username = 'octocat';

// The file extension you want to track (e.g. "js")
const fileExtension = 'js';

// The function to be called for each commit that is tracked
const onCommit = commit => {
  console.log(`${commit.author.name} committed ${commit.message}`);
};

// Start tracking commits
github.tracking.commits({
  username,
  fileExtension,
  includePrivate: false,
}).on('commit', onCommit);
