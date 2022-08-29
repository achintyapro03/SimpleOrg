const asyncHandler = require('express-async-handler');
const Event = require('../models/eventModels');
const User = require('../models/userModels');
const Org = require('../models/orgsModels');

// @desc Login a user
// @route /api/users/login
// @access Public
const eventCreate = asyncHandler(async (req, res) => {
  //   console.log(req.user);
  const { name, orgId, desc, dateStart, dateEnd, startTime, endTime } =
    req.body;

  console.log(req.body);

  console.log(orgId);

  if (!name) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const eventExists = await Event.findOne({ name });
  const parentOrg = await Org.findById({ _id: orgId });

  if (eventExists) {
    res.status(400);
    throw new Error('Event already exists');
  }

  if (parentOrg.admin !== req.user._id.toString()) {
    res.status(400);
    throw new Error('You need to be admin to create an event in this org!!');
  }

  const event = await Event.create({
    name,
    users: [req.user._id.toString()],
    org: orgId.toString(),
    desc,
    startTime,
    endTime,
    dateEnd,
    dateStart,
  });

  if (event) {
    res.status(201).json({
      _id: event._id,
      name: event.name,
    });

    eventsNew = req.user.events;
    eventsNew.push(event._id.toString());

    orgEvents = parentOrg.events[1];
    orgEvents.push(event._id.toString());

    var arr = [parentOrg.events[0], orgEvents, parentOrg.events[2]];

    await User.updateOne(
      { _id: req.user._id },
      { $set: { events: eventsNew } }
    );

    await Org.updateOne({ _id: orgId }, { $set: { events: arr } });
  } else {
    res.status(400);
    throw new Error('Failed to create Event');
  }
  // res.json(req.user);
});

const joinEvent = asyncHandler(async (req, res) => {
  const { orgId, eventId } = req.body;

  if (!(orgId && eventId)) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  const eventExists = await Event.findOne({ _id: eventId });
  const orgExists = await Org.findOne({ id: orgId });
  if (!eventExists) {
    res.status(400);
    throw new Error('Event does not exist');
  }

  if (eventExists.users.includes(req.user._id.toString())) {
    res.status(400);
    throw new Error('You have already joined this event');
  }
  usersNew = eventExists.users;
  usersNew.push(req.user._id.toString());

  try {
    console.log(eventExists);
    await Event.updateOne({ _id: eventId }, { $set: { users: usersNew } });
    eventsNew = req.user.events;
    eventsNew.push(eventId.toString());
    await User.updateOne(
      { _id: req.user._id },
      { $set: { events: eventsNew } }
    );
    // orgEvents = orgExists.events;
    // orgEvents.push(eventId.toString());
    // await Org.updateOne(
    //   { _id: eventExists.org },
    //   { $set: { events: orgEvents } }
    // );
    res.status(201).json(await ret(eventsNew));
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Failed to join event');
  }
  // res.send('hi');
});

const ret = async (events) => {
  let eventRet = [];
  for (x of events) {
    eventRet.push(await Event.findOne({ _id: x }));
  }
  return eventRet;
};

const getEvents = asyncHandler(async (req, res) => {
  console.log('noooo');
  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  console.log(user.events);
  let events = await ret(user.events);
  res.status(200).json(events);
});

const getEvent = asyncHandler(async (req, res) => {
  console.log('hola');
  const user = await User.findOne({ _id: req.user._id });
  console.log('here');

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  const event = await Event.findOne({ _id: req.params.id });

  if (!event) {
    res.status(404);
    throw new Error('Organization not found');
  }

  if (!event.users.includes(req.user._id)) {
    res.status(401);
    throw new Error('Not authorized');
  }
  res.status(200).json(event);
});

const ret2 = async (events) => {
  let eventRet = [];
  let li = [];
  for (x of events) {
    for (e of x) li.push(await Event.findOne({ _id: x }));
    eventRet.push(li);
    li = [];
  }
  return eventRet;
};

const getAllEvents = asyncHandler(async (req, res) => {
  console.log('yo');
  const { orgId } = req.body;
  console.log(req);
  console.log(req.body);
  const org = await Org.findOne({ _id: orgId.toString() });
  console.log('hello');
  const events = org.events;
  console.log(events);
  console.log('jojo');
  if (!events) {
    res.status(401);
    throw new Error('NO events found');
  }

  res.status(200).json(await ret(events[1]));
});

module.exports = {
  eventCreate,
  joinEvent,
  getEvents,
  getEvent,
  getAllEvents,
};
