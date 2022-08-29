const e = require('express');
const asyncHandler = require('express-async-handler');
const Org = require('../models/orgsModels');
const User = require('../models/userModels');

// @desc  user
// @route /api/users/login
// @access Public
const orgCreate = asyncHandler(async (req, res) => {
  //   console.log(req.user);
  const { name, email, desc, contactNo } = req.body;
  console.log(name);
  console.log(email);
  if (!(name && email)) {
    res.status(400);
    throw new Error('Please include all fields');
  }

  const orgExists = await Org.findOne({ name });

  if (orgExists) {
    res.status(400);
    throw new Error('Organization already exists');
  }
  const org = await Org.create({
    name,
    email,
    desc: desc ? desc : '',
    contactNo: contactNo ? contactNo : '',
    admin: req.user._id.toString(),
    users: [req.user._id.toString()],
  });

  if (org) {
    res.status(201).json({
      _id: org._id,
      name: org.name,
      admin: req.user._id,
    });

    orgsNew = req.user.orgs;
    orgsNew.push(org._id.toString());

    await User.updateOne({ _id: req.user._id }, { $set: { orgs: orgsNew } });
  } else {
    res.status(400);
    throw new Error('Failed to create org');
  }
  // res.json(req.user);
});

const joinOrg = asyncHandler(async (req, res) => {
  const { orgId } = req.body;

  if (!orgId) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  const orgExists = await Org.findOne({ _id: orgId });

  if (!orgExists) {
    res.status(400);
    throw new Error('Organization does not exist');
  }

  if (orgExists.users.includes(req.user._id.toString())) {
    res.status(400);
    throw new Error('You have already joined this org');
  }
  usersNew = orgExists.users;
  usersNew.push(req.user._id.toString());

  try {
    await Org.updateOne({ _id: orgId }, { $set: { users: usersNew } });

    orgsNew = req.user.orgs;
    orgsNew.push(orgId.toString());

    await User.updateOne({ _id: req.user._id }, { $set: { orgs: orgsNew } });

    res.status(201).json(await Org.find());
  } catch (error) {
    console.log(error);
    res.status(400);
    throw new Error('Failed to join org');
  }
  // res.send('hi');
});

const ret = async (orgs) => {
  let orgRet = [];
  for (x of orgs) {
    orgRet.push(await Org.findOne({ _id: x }));
  }
  return orgRet;
};

const getOrgs = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  let orgs = await ret(user.orgs);
  res.status(200).json(orgs);
});

const getOrg = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id });

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const org = await Org.findOne({ _id: req.params.id });

  if (!org) {
    res.status(404);
    throw new Error('Organization not found');
  }

  if (!org.users.includes(req.user._id)) {
    res.status(401);
    throw new Error('Not authorized');
  }
  res.status(200).json(org);
});

const getAllOrgs = asyncHandler(async (req, res) => {
  const orgs = await Org.find();

  if (!orgs) {
    res.status(401);
    throw new Error('NO org found');
  }

  res.status(200).json(orgs);
});

module.exports = {
  orgCreate,
  joinOrg,
  getOrgs,
  getOrg,
  getAllOrgs,
};
