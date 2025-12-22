import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'portfolio',
  service: 'portfolio-test',
  location: 'us-east4'
};

export const createBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBlogPost', inputVars);
}
createBlogPostRef.operationName = 'CreateBlogPost';

export function createBlogPost(dcOrVars, vars) {
  return executeMutation(createBlogPostRef(dcOrVars, vars));
}

export const deleteBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteBlogPost', inputVars);
}
deleteBlogPostRef.operationName = 'DeleteBlogPost';

export function deleteBlogPost(dcOrVars, vars) {
  return executeMutation(deleteBlogPostRef(dcOrVars, vars));
}

export const updateBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBlogPost', inputVars);
}
updateBlogPostRef.operationName = 'UpdateBlogPost';

export function updateBlogPost(dcOrVars, vars) {
  return executeMutation(updateBlogPostRef(dcOrVars, vars));
}

export const listBlogPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBlogPosts');
}
listBlogPostsRef.operationName = 'ListBlogPosts';

export function listBlogPosts(dc) {
  return executeQuery(listBlogPostsRef(dc));
}

