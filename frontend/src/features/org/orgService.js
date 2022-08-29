import axios from 'axios';

const API_URL = '/api/orgs/';

const createOrg = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'create', userData, config);

  return response.data;
};

const getOrgs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'get', config);

  return response.data;
};

const getOrg = async (orgId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('yoooo');
  console.log(orgId);
  console.log(config);
  const response = await axios.get(API_URL + 'get/' + orgId, config);

  return response.data;
};

const getAllOrgs = async () => {
  const response = await axios.get(API_URL + 'get_all');
  return response.data;
};

const joinOrg = async (orgId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('in service');
  const response = await axios.post(API_URL + 'join', { orgId: orgId }, config);
  console.log(response.data);
  return response.data;
};

const orgService = {
  createOrg,
  getOrgs,
  getAllOrgs,
  joinOrg,
  getOrg,
};

export default orgService;
