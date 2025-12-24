# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createBlogPost, deleteBlogPost, createProject, updateProject, deleteProject, listProjects, updateBlogPost, listBlogPosts } from '@dataconnect/generated';


// Operation CreateBlogPost:  For variables, look at type CreateBlogPostVars in ../index.d.ts
const { data } = await CreateBlogPost(dataConnect, createBlogPostVars);

// Operation DeleteBlogPost:  For variables, look at type DeleteBlogPostVars in ../index.d.ts
const { data } = await DeleteBlogPost(dataConnect, deleteBlogPostVars);

// Operation CreateProject:  For variables, look at type CreateProjectVars in ../index.d.ts
const { data } = await CreateProject(dataConnect, createProjectVars);

// Operation UpdateProject:  For variables, look at type UpdateProjectVars in ../index.d.ts
const { data } = await UpdateProject(dataConnect, updateProjectVars);

// Operation DeleteProject:  For variables, look at type DeleteProjectVars in ../index.d.ts
const { data } = await DeleteProject(dataConnect, deleteProjectVars);

// Operation ListProjects: 
const { data } = await ListProjects(dataConnect);

// Operation UpdateBlogPost:  For variables, look at type UpdateBlogPostVars in ../index.d.ts
const { data } = await UpdateBlogPost(dataConnect, updateBlogPostVars);

// Operation ListBlogPosts: 
const { data } = await ListBlogPosts(dataConnect);


```