# Coding conventions

## Code Style

- Code convention should follow best practices and be consistent. The project have a linter tool to check the code style to ensure consistency.
- Each file should not have excessive lines of code. If a file has too many lines, consider splitting it into multiple files. Preferably, no more than **500** lines of code per file.
- Do not use `any` type in Typescript since it defeats the purpose of using Typescript. Instead, use `unknown` type and type assertion when necessary. If you want to use `any` type for a specific reason, add a comment explaining why you need to use it.
- Each file and function should respect the Single Responsibility Principle (SRP). If a file has multiple responsibilities, consider splitting it into multiple files.
- Do not nested function more than 3 levels. If you need more, consider refactoring the code to split the logic into multiple functions. This includes `if, else, for, while` .etc.

## Folder Structure
- Each page should have it own folder in the `(pages)` directory. If the component is used in multiple pages, consider creating a shared component in the `(shared/components)` directory.


## PR (Pull Request) Guidelines
- When creating a PR, make sure to provide a clear description of the changes made in the PR.
- The branch name should be descriptive and should follow the convention `feature/${ticket_number}-${feature_name}` or `bug/${ticket_number}-${bug_name}`.
- Each commit message need to show the changes made in the commit alongside with the purpose of the changes.
- Each PR will be reviewed by at least one team member before merging it to the `main` branch. We encourage you to pair review with another team member to ensure the quality of the code.
- The PR must passed all the CI/CD pipeline before review.
- After the PR is approved and the pipeline is green, the maintainer will merge the PR to the `main` branch and it will automatically deploy to the dev environment in CD (Continuous Deployment) pipeline.
- Add a <span style="color: white; background-color: #578CBE; padding: 4px; border-radius: 4px;">Ready for Review</span> label to the PR when you want to request a review from the maintainer.
- If the PR is reviewed and need fix, after fixing the requested changes, re-request a review from the maintainer.

## Commit Message
- Commit message should be descriptive and should follow the convention `[ticket_number] - [commit_message]`. For example, `#1234 Add login page`.

## Coding Guidelines
- Use function declaration instead of arrow function assign to a variable. For example, instead of 
```ts
const handleClick = () => { ... }
```

use 

```ts
function handleClick() { ... }
```
- Avoid using 

## Name Convention
- Enum, Enum value should be in PascalCase.
- Type, Interface, Class should be in PascalCase.
- Function, Variable should be in camelCase.
- App Router page folder should be in kebab-case.
- File name should be in camelCase, except for React component file which should be in PascalCase.
- Asset file should be in kebab-case.