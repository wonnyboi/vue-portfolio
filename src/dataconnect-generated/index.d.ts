import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface BlogPost_Key {
  id: string;
  __typename?: 'BlogPost_Key';
}

export interface CreateBlogPostData {
  blogPost_insert: BlogPost_Key;
}

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

export interface CreateProjectData {
  project_insert: Project_Key;
}

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

export interface DeleteBlogPostData {
  blogPost_delete?: BlogPost_Key | null;
}

export interface DeleteBlogPostVariables {
  id: string;
}

export interface DeleteProjectData {
  project_delete?: Project_Key | null;
}

export interface DeleteProjectVariables {
  id: string;
}

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

export interface Project_Key {
  id: string;
  __typename?: 'Project_Key';
}

export interface UpdateBlogPostData {
  blogPost_update?: BlogPost_Key | null;
}

export interface UpdateBlogPostVariables {
  id: string;
  content?: string | null;
  updatedAt?: string | null;
}

export interface UpdateProjectData {
  project_update?: Project_Key | null;
}

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

interface CreateBlogPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateBlogPostVariables): MutationRef<CreateBlogPostData, CreateBlogPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateBlogPostVariables): MutationRef<CreateBlogPostData, CreateBlogPostVariables>;
  operationName: string;
}
export const createBlogPostRef: CreateBlogPostRef;

export function createBlogPost(vars: CreateBlogPostVariables): MutationPromise<CreateBlogPostData, CreateBlogPostVariables>;
export function createBlogPost(dc: DataConnect, vars: CreateBlogPostVariables): MutationPromise<CreateBlogPostData, CreateBlogPostVariables>;

interface DeleteBlogPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteBlogPostVariables): MutationRef<DeleteBlogPostData, DeleteBlogPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteBlogPostVariables): MutationRef<DeleteBlogPostData, DeleteBlogPostVariables>;
  operationName: string;
}
export const deleteBlogPostRef: DeleteBlogPostRef;

export function deleteBlogPost(vars: DeleteBlogPostVariables): MutationPromise<DeleteBlogPostData, DeleteBlogPostVariables>;
export function deleteBlogPost(dc: DataConnect, vars: DeleteBlogPostVariables): MutationPromise<DeleteBlogPostData, DeleteBlogPostVariables>;

interface CreateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProjectVariables): MutationRef<CreateProjectData, CreateProjectVariables>;
  operationName: string;
}
export const createProjectRef: CreateProjectRef;

export function createProject(vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;
export function createProject(dc: DataConnect, vars: CreateProjectVariables): MutationPromise<CreateProjectData, CreateProjectVariables>;

interface UpdateProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProjectVariables): MutationRef<UpdateProjectData, UpdateProjectVariables>;
  operationName: string;
}
export const updateProjectRef: UpdateProjectRef;

export function updateProject(vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;
export function updateProject(dc: DataConnect, vars: UpdateProjectVariables): MutationPromise<UpdateProjectData, UpdateProjectVariables>;

interface DeleteProjectRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProjectVariables): MutationRef<DeleteProjectData, DeleteProjectVariables>;
  operationName: string;
}
export const deleteProjectRef: DeleteProjectRef;

export function deleteProject(vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;
export function deleteProject(dc: DataConnect, vars: DeleteProjectVariables): MutationPromise<DeleteProjectData, DeleteProjectVariables>;

interface ListProjectsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProjectsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProjectsData, undefined>;
  operationName: string;
}
export const listProjectsRef: ListProjectsRef;

export function listProjects(): QueryPromise<ListProjectsData, undefined>;
export function listProjects(dc: DataConnect): QueryPromise<ListProjectsData, undefined>;

interface UpdateBlogPostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateBlogPostVariables): MutationRef<UpdateBlogPostData, UpdateBlogPostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateBlogPostVariables): MutationRef<UpdateBlogPostData, UpdateBlogPostVariables>;
  operationName: string;
}
export const updateBlogPostRef: UpdateBlogPostRef;

export function updateBlogPost(vars: UpdateBlogPostVariables): MutationPromise<UpdateBlogPostData, UpdateBlogPostVariables>;
export function updateBlogPost(dc: DataConnect, vars: UpdateBlogPostVariables): MutationPromise<UpdateBlogPostData, UpdateBlogPostVariables>;

interface ListBlogPostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListBlogPostsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListBlogPostsData, undefined>;
  operationName: string;
}
export const listBlogPostsRef: ListBlogPostsRef;

export function listBlogPosts(): QueryPromise<ListBlogPostsData, undefined>;
export function listBlogPosts(dc: DataConnect): QueryPromise<ListBlogPostsData, undefined>;

