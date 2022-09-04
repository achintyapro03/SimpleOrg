import axios from 'axios';

const API_URL = '/api/events/';

const createEvent = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('ooo');

  const data = { ...userData[0], orgId: userData[1] };

  console.log(userData);

  const response = await axios.post(API_URL + 'create', data, config);
  console.log(response.data);

  return response.data;
};

const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + 'get', config);
  return response.data;
};

const getEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('yoooo');
  console.log(eventId);
  console.log(config);
  const response = await axios.get(API_URL + 'get/' + eventId, config);

  return response.data;
};

const getAllEvents = async (orgId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + 'get_all',
    { orgId: orgId },
    config
  );
  return response.data;
};

const joinEvent = async (eventId, orgId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log('in service');
  const response = await axios.post(
    API_URL + 'join',
    { eventId: eventId, orgId: orgId },
    config
  );
  console.log(response.data);
  return response.data;
};

const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + 'del_event',
    { eventId: eventId },
    config
  );

  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
  getAllEvents,
  joinEvent,
  getEvent,
  deleteEvent,
};

export default eventService;
