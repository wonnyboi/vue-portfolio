# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `portfolio`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListProjects*](#listprojects)
  - [*ListBlogPosts*](#listblogposts)
- [**Mutations**](#mutations)
  - [*CreateBlogPost*](#createblogpost)
  - [*DeleteBlogPost*](#deleteblogpost)
  - [*CreateProject*](#createproject)
  - [*UpdateProject*](#updateproject)
  - [*DeleteProject*](#deleteproject)
  - [*UpdateBlogPost*](#updateblogpost)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `portfolio`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `portfolio` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListProjects
You can execute the `ListProjects` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProjects(): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProjects(dc: DataConnect): QueryPromise<ListProjectsData, undefined>;

interface ListProjectsRef {
  ...
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
}
export const listProjectsRef: ListProjectsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProjectsRef:
```typescript
const name = listProjectsRef.operationName;
console.log(name);
```

### Variables
The `ListProjects` query has no variables.
### Return Type
Recall that executing the `ListProjects` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProjectsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProjectsData {
  projects: ({
    id: string;
    title: string;
    summary?: string | null;
    description?: string | null;
    techStack?: string[] | null;
    role?: string[] | null;
    periodStart?: string | null;
    periodEnd?: string | null;
    images?: string[] | null;
    tags?: string[] | null;
    isPublished: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  } & Project_Key)[];
}
```
### Using `ListProjects`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProjects } from '@dataconnect/generated';


// Call the `listProjects()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProjects();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProjects(dataConnect);

console.log(data.projects);

// Or, you can use the `Promise` API.
listProjects().then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

### Using `ListProjects`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProjectsRef } from '@dataconnect/generated';


// Call the `listProjectsRef()` function to get a reference to the query.
const ref = listProjectsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProjectsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.projects);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.projects);
});
```

## ListBlogPosts
You can execute the `ListBlogPosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listBlogPosts(): QueryPromise<ListBlogPostsData, undefined>;

interface ListBlogPostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListBlogPostsData, undefined>;
}
export const listBlogPostsRef: ListBlogPostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listBlogPosts(dc: DataConnect): QueryPromise<ListBlogPostsData, undefined>;

interface ListBlogPostsRef {
  ...
  (dc: DataConnect): QueryRef<ListBlogPostsData, undefined>;
}
export const listBlogPostsRef: ListBlogPostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listBlogPostsRef:
```typescript
const name = listBlogPostsRef.operationName;
console.log(name);
```

### Variables
The `ListBlogPosts` query has no variables.
### Return Type
Recall that executing the `ListBlogPosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListBlogPostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListBlogPostsData {
  blogPosts: ({
    id: string;
    title: string;
    summary?: string | null;
    content?: string | null;
    category?: string | null;
    tags?: string[] | null;
    isPublished: boolean;
    createdAt?: string | null;
    updatedAt?: string | null;
  } & BlogPost_Key)[];
}
```
### Using `ListBlogPosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listBlogPosts } from '@dataconnect/generated';


// Call the `listBlogPosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listBlogPosts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listBlogPosts(dataConnect);

console.log(data.blogPosts);

// Or, you can use the `Promise` API.
listBlogPosts().then((response) => {
  const data = response.data;
  console.log(data.blogPosts);
});
```

### Using `ListBlogPosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listBlogPostsRef } from '@dataconnect/generated';


// Call the `listBlogPostsRef()` function to get a reference to the query.
const ref = listBlogPostsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listBlogPostsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.blogPosts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.blogPosts);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `portfolio` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateBlogPost
You can execute the `CreateBlogPost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createBlogPost(vars: CreateBlogPostVariables): MutationPromise<CreateBlogPostData, CreateBlogPostVariables>;

interface CreateBlogPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBlogPostVariables): MutationRef<CreateBlogPostData, CreateBlogPostVariables>;
}
export const createBlogPostRef: CreateBlogPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createBlogPost(dc: DataConnect, vars: CreateBlogPostVariables): MutationPromise<CreateBlogPostData, CreateBlogPostVariables>;

interface CreateBlogPostRef {
  ...
  (dc: DataConnect, vars: CreateBlogPostVariables): MutationRef<CreateBlogPostData, CreateBlogPostVariables>;
}
export const createBlogPostRef: CreateBlogPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createBlogPostRef:
```typescript
const name = createBlogPostRef.operationName;
console.log(name);
```

### Variables
The `CreateBlogPost` mutation requires an argument of type `CreateBlogPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateBlogPostVariables {
  id: string;
  title: string;
  summary?: string | null;
  content?: string | null;
  category?: string | null;
  tags?: string[] | null;
  isPublished?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `CreateBlogPost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateBlogPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateBlogPostData {
  blogPost_insert: BlogPost_Key;
}
```
### Using `CreateBlogPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createBlogPost, CreateBlogPostVariables } from '@dataconnect/generated';

// The `CreateBlogPost` mutation requires an argument of type `CreateBlogPostVariables`:
const createBlogPostVars: CreateBlogPostVariables = {
  id: ..., 
  title: ..., 
  summary: ..., // optional
  content: ..., // optional
  category: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  createdAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `createBlogPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createBlogPost(createBlogPostVars);
// Variables can be defined inline as well.
const { data } = await createBlogPost({ id: ..., title: ..., summary: ..., content: ..., category: ..., tags: ..., isPublished: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createBlogPost(dataConnect, createBlogPostVars);

console.log(data.blogPost_insert);

// Or, you can use the `Promise` API.
createBlogPost(createBlogPostVars).then((response) => {
  const data = response.data;
  console.log(data.blogPost_insert);
});
```

### Using `CreateBlogPost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createBlogPostRef, CreateBlogPostVariables } from '@dataconnect/generated';

// The `CreateBlogPost` mutation requires an argument of type `CreateBlogPostVariables`:
const createBlogPostVars: CreateBlogPostVariables = {
  id: ..., 
  title: ..., 
  summary: ..., // optional
  content: ..., // optional
  category: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  createdAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `createBlogPostRef()` function to get a reference to the mutation.
const ref = createBlogPostRef(createBlogPostVars);
// Variables can be defined inline as well.
const ref = createBlogPostRef({ id: ..., title: ..., summary: ..., content: ..., category: ..., tags: ..., isPublished: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createBlogPostRef(dataConnect, createBlogPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.blogPost_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.blogPost_insert);
});
```

## DeleteBlogPost
You can execute the `DeleteBlogPost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteBlogPost(vars: DeleteBlogPostVariables): MutationPromise<DeleteBlogPostData, DeleteBlogPostVariables>;

interface DeleteBlogPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBlogPostVariables): MutationRef<DeleteBlogPostData, DeleteBlogPostVariables>;
}
export const deleteBlogPostRef: DeleteBlogPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteBlogPost(dc: DataConnect, vars: DeleteBlogPostVariables): MutationPromise<DeleteBlogPostData, DeleteBlogPostVariables>;

interface DeleteBlogPostRef {
  ...
  (dc: DataConnect, vars: DeleteBlogPostVariables): MutationRef<DeleteBlogPostData, DeleteBlogPostVariables>;
}
export const deleteBlogPostRef: DeleteBlogPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteBlogPostRef:
```typescript
const name = deleteBlogPostRef.operationName;
console.log(name);
```

### Variables
The `DeleteBlogPost` mutation requires an argument of type `DeleteBlogPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteBlogPostVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteBlogPost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteBlogPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteBlogPostData {
  blogPost_delete?: BlogPost_Key | null;
}
```
### Using `DeleteBlogPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteBlogPost, DeleteBlogPostVariables } from '@dataconnect/generated';

// The `DeleteBlogPost` mutation requires an argument of type `DeleteBlogPostVariables`:
const deleteBlogPostVars: DeleteBlogPostVariables = {
  id: ..., 
};

// Call the `deleteBlogPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteBlogPost(deleteBlogPostVars);
// Variables can be defined inline as well.
const { data } = await deleteBlogPost({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteBlogPost(dataConnect, deleteBlogPostVars);

console.log(data.blogPost_delete);

// Or, you can use the `Promise` API.
deleteBlogPost(deleteBlogPostVars).then((response) => {
  const data = response.data;
  console.log(data.blogPost_delete);
});
```

### Using `DeleteBlogPost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteBlogPostRef, DeleteBlogPostVariables } from '@dataconnect/generated';

// The `DeleteBlogPost` mutation requires an argument of type `DeleteBlogPostVariables`:
const deleteBlogPostVars: DeleteBlogPostVariables = {
  id: ..., 
};

// Call the `deleteBlogPostRef()` function to get a reference to the mutation.
const ref = deleteBlogPostRef(deleteBlogPostVars);
// Variables can be defined inline as well.
const ref = deleteBlogPostRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteBlogPostRef(dataConnect, deleteBlogPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.blogPost_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.blogPost_delete);
});
```

## CreateProject
You can execute the `CreateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface CreateProjectRef {
  ...
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
}
export const createProjectRef: CreateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProjectRef:
```typescript
const name = createProjectRef.operationName;
console.log(name);
```

### Variables
The `CreateProject` mutation requires an argument of type `CreateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProjectVariables {
  id: string;
  title: string;
  summary?: string | null;
  description?: string | null;
  techStack?: string[] | null;
  role?: string[] | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  images?: string[] | null;
  tags?: string[] | null;
  isPublished?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `CreateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProjectData {
  project_insert: Project_Key;
}
```
### Using `CreateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProject, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  id: ..., 
  title: ..., 
  summary: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  role: ..., // optional
  periodStart: ..., // optional
  periodEnd: ..., // optional
  images: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  createdAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `createProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProject(createProjectVars);
// Variables can be defined inline as well.
const { data } = await createProject({ id: ..., title: ..., summary: ..., description: ..., techStack: ..., role: ..., periodStart: ..., periodEnd: ..., images: ..., tags: ..., isPublished: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProject(dataConnect, createProjectVars);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
createProject(createProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

### Using `CreateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProjectRef, CreateProjectVariables } from '@dataconnect/generated';

// The `CreateProject` mutation requires an argument of type `CreateProjectVariables`:
const createProjectVars: CreateProjectVariables = {
  id: ..., 
  title: ..., 
  summary: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  role: ..., // optional
  periodStart: ..., // optional
  periodEnd: ..., // optional
  images: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  createdAt: ..., // optional
  updatedAt: ..., // optional
};

// Call the `createProjectRef()` function to get a reference to the mutation.
const ref = createProjectRef(createProjectVars);
// Variables can be defined inline as well.
const ref = createProjectRef({ id: ..., title: ..., summary: ..., description: ..., techStack: ..., role: ..., periodStart: ..., periodEnd: ..., images: ..., tags: ..., isPublished: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProjectRef(dataConnect, createProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_insert);
});
```

## UpdateProject
You can execute the `UpdateProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface UpdateProjectRef {
  ...
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
}
export const updateProjectRef: UpdateProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProjectRef:
```typescript
const name = updateProjectRef.operationName;
console.log(name);
```

### Variables
The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProjectVariables {
  id: string;
  title?: string | null;
  summary?: string | null;
  description?: string | null;
  techStack?: string[] | null;
  role?: string[] | null;
  periodStart?: string | null;
  periodEnd?: string | null;
  images?: string[] | null;
  tags?: string[] | null;
  isPublished?: boolean | null;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProjectData {
  project_update?: Project_Key | null;
}
```
### Using `UpdateProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProject, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  title: ..., // optional
  summary: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  role: ..., // optional
  periodStart: ..., // optional
  periodEnd: ..., // optional
  images: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  updatedAt: ..., // optional
};

// Call the `updateProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProject(updateProjectVars);
// Variables can be defined inline as well.
const { data } = await updateProject({ id: ..., title: ..., summary: ..., description: ..., techStack: ..., role: ..., periodStart: ..., periodEnd: ..., images: ..., tags: ..., isPublished: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProject(dataConnect, updateProjectVars);

console.log(data.project_update);

// Or, you can use the `Promise` API.
updateProject(updateProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

### Using `UpdateProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProjectRef, UpdateProjectVariables } from '@dataconnect/generated';

// The `UpdateProject` mutation requires an argument of type `UpdateProjectVariables`:
const updateProjectVars: UpdateProjectVariables = {
  id: ..., 
  title: ..., // optional
  summary: ..., // optional
  description: ..., // optional
  techStack: ..., // optional
  role: ..., // optional
  periodStart: ..., // optional
  periodEnd: ..., // optional
  images: ..., // optional
  tags: ..., // optional
  isPublished: ..., // optional
  updatedAt: ..., // optional
};

// Call the `updateProjectRef()` function to get a reference to the mutation.
const ref = updateProjectRef(updateProjectVars);
// Variables can be defined inline as well.
const ref = updateProjectRef({ id: ..., title: ..., summary: ..., description: ..., techStack: ..., role: ..., periodStart: ..., periodEnd: ..., images: ..., tags: ..., isPublished: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProjectRef(dataConnect, updateProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_update);
});
```

## DeleteProject
You can execute the `DeleteProject` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface DeleteProjectRef {
  ...
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
}
export const deleteProjectRef: DeleteProjectRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProjectRef:
```typescript
const name = deleteProjectRef.operationName;
console.log(name);
```

### Variables
The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProjectVariables {
  id: string;
}
```
### Return Type
Recall that executing the `DeleteProject` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProjectData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}
```
### Using `DeleteProject`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProject, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProject()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProject(deleteProjectVars);
// Variables can be defined inline as well.
const { data } = await deleteProject({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProject(dataConnect, deleteProjectVars);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
deleteProject(deleteProjectVars).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

### Using `DeleteProject`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProjectRef, DeleteProjectVariables } from '@dataconnect/generated';

// The `DeleteProject` mutation requires an argument of type `DeleteProjectVariables`:
const deleteProjectVars: DeleteProjectVariables = {
  id: ..., 
};

// Call the `deleteProjectRef()` function to get a reference to the mutation.
const ref = deleteProjectRef(deleteProjectVars);
// Variables can be defined inline as well.
const ref = deleteProjectRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProjectRef(dataConnect, deleteProjectVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.project_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.project_delete);
});
```

## UpdateBlogPost
You can execute the `UpdateBlogPost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateBlogPost(vars: UpdateBlogPostVariables): MutationPromise<UpdateBlogPostData, UpdateBlogPostVariables>;

interface UpdateBlogPostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBlogPostVariables): MutationRef<UpdateBlogPostData, UpdateBlogPostVariables>;
}
export const updateBlogPostRef: UpdateBlogPostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateBlogPost(dc: DataConnect, vars: UpdateBlogPostVariables): MutationPromise<UpdateBlogPostData, UpdateBlogPostVariables>;

interface UpdateBlogPostRef {
  ...
  (dc: DataConnect, vars: UpdateBlogPostVariables): MutationRef<UpdateBlogPostData, UpdateBlogPostVariables>;
}
export const updateBlogPostRef: UpdateBlogPostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateBlogPostRef:
```typescript
const name = updateBlogPostRef.operationName;
console.log(name);
```

### Variables
The `UpdateBlogPost` mutation requires an argument of type `UpdateBlogPostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateBlogPostVariables {
  id: string;
  content?: string | null;
  updatedAt?: string | null;
}
```
### Return Type
Recall that executing the `UpdateBlogPost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateBlogPostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateBlogPostData {
  blogPost_update?: BlogPost_Key | null;
}
```
### Using `UpdateBlogPost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateBlogPost, UpdateBlogPostVariables } from '@dataconnect/generated';

// The `UpdateBlogPost` mutation requires an argument of type `UpdateBlogPostVariables`:
const updateBlogPostVars: UpdateBlogPostVariables = {
  id: ..., 
  content: ..., // optional
  updatedAt: ..., // optional
};

// Call the `updateBlogPost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateBlogPost(updateBlogPostVars);
// Variables can be defined inline as well.
const { data } = await updateBlogPost({ id: ..., content: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateBlogPost(dataConnect, updateBlogPostVars);

console.log(data.blogPost_update);

// Or, you can use the `Promise` API.
updateBlogPost(updateBlogPostVars).then((response) => {
  const data = response.data;
  console.log(data.blogPost_update);
});
```

### Using `UpdateBlogPost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateBlogPostRef, UpdateBlogPostVariables } from '@dataconnect/generated';

// The `UpdateBlogPost` mutation requires an argument of type `UpdateBlogPostVariables`:
const updateBlogPostVars: UpdateBlogPostVariables = {
  id: ..., 
  content: ..., // optional
  updatedAt: ..., // optional
};

// Call the `updateBlogPostRef()` function to get a reference to the mutation.
const ref = updateBlogPostRef(updateBlogPostVars);
// Variables can be defined inline as well.
const ref = updateBlogPostRef({ id: ..., content: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateBlogPostRef(dataConnect, updateBlogPostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.blogPost_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.blogPost_update);
});
```

