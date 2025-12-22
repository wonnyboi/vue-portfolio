const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'portfolio',
  service: 'portfolio-test',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateBlogPost', inputVars);
}
createBlogPostRef.operationName = 'CreateBlogPost';
exports.createBlogPostRef = createBlogPostRef;

exports.createBlogPost = function createBlogPost(dcOrVars, vars) {
  return executeMutation(createBlogPostRef(dcOrVars, vars));
};

const deleteBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteBlogPost', inputVars);
}
deleteBlogPostRef.operationName = 'DeleteBlogPost';
exports.deleteBlogPostRef = deleteBlogPostRef;

exports.deleteBlogPost = function deleteBlogPost(dcOrVars, vars) {
  return executeMutation(deleteBlogPostRef(dcOrVars, vars));
};

const updateBlogPostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateBlogPost', inputVars);
}
updateBlogPostRef.operationName = 'UpdateBlogPost';
exports.updateBlogPostRef = updateBlogPostRef;

exports.updateBlogPost = function updateBlogPost(dcOrVars, vars) {
  return executeMutation(updateBlogPostRef(dcOrVars, vars));
};

const listBlogPostsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListBlogPosts');
}
listBlogPostsRef.operationName = 'ListBlogPosts';
exports.listBlogPostsRef = listBlogPostsRef;

exports.listBlogPosts = function listBlogPosts(dc) {
  return executeQuery(listBlogPostsRef(dc));
};
