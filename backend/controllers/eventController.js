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

const getAllEvents = asyncHandler(async (req, res) => {
  const { orgId } = req.body;
  console.log(req);
  console.log(req.body);
  const org = await Org.findOne({ _id: orgId.toString() });

  const events = org.events;

  if (!events) {
    res.status(401);
    throw new Error('NO events found');
  }

  res.status(200).json(await ret(events[1]));
});

const del1 = async (users, org, eventId) => {
  for (x of users) {
    const user = await User.findOne({ _id: x });
    var eve = user.events;
    var index = eve.indexOf(eventId);
    if (index !== -1) {
      eve.splice(index, 1);
    }
    await User.updateOne({ _id: x }, { $set: { events: eve } });
  }

  const orgg = await Org.findOne({ _id: org });
  var eve = orgg.events[1];
  var index = eve.indexOf(eventId);
  if (index !== -1) {
    eve.splice(index, 1);
  }
  if (eve == null) eve = [];
  await Org.updateOne(
    { _id: org },
    { $set: { events: [orgg.events[0], eve, orgg.events[2]] } }
  );

  await Event.deleteOne({ _id: eventId });
};

const delEvent = asyncHandler(async (req, res) => {
  console.log('entered del');
  const { eventId } = req.body;
  const event = await Event.findOne({ _id: eventId });
  const users = event.users;
  const org = event.org;

  try {
    await del1(users, org, eventId);
    res.status(200).json('Deleted');
  } catch (err) {
    console.log(err);
    res.status(401);
    throw new Error('Failed to delete event');
  }
});

module.exports = {
  eventCreate,
  joinEvent,
  getEvents,
  getEvent,
  getAllEvents,
  delEvent,
};
