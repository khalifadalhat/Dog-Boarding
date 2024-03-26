const Petsitter = require("../models/petsittermodel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshtoken");
const jwt = require("jsonwebtoken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const createPetsitter = asyncHandler(async (req, res) => {
  try {
    // Check if req.body is defined
    if (!req.body) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Get the email from req.body
    const email = req.body.email;

    const findPetsitter = await Petsitter.findOne({ email: email });

  if (!findPetsitter) {
    /**
     * TODO:if Petsitter not found user create a new user
     */
    const newPetsitter = await Petsitter.create(req.body);
    res.json(newPetsitter);
    } else {
      // If the Petsitter already exists, send an error response
      res.status(400).json({ error: 'Petsitter already exists' });
    }
  } catch (error) {
    // Handle Mongoose errors
    console.error('Mongoose error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Login a petsitter
const loginPetsitterCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists or not
  const findPetsitter = await Petsitter.findOne({ email });
  if (findPetsitter && (await findPetsitter.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findPetsitter?._id);
    const updatepetsitter = await Petsitter.findByIdAndUpdate(findPetsitter.id, {
      refreshToken: refreshToken,
    }, {
      new: true
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findPetsitter?._id,
      firstname: findPetsitter?.firstname,
      lastname: findPetsitter?.lastname,
      email: findPetsitter?.email,
      mobile: findPetsitter?.mobile,
      token: generateToken(findPetsitter?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }

});

// handle refresh token

const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const petsitter = await Petsitter.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || petsitter.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(petsitter?._id);
    res.json({ accessToken });
  });
});

// logout functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) {
    throw new Error("No Refresh Token in Cookies");
  }

  const refreshToken = cookie.refreshToken;

  const petsitter = await Petsitter.findOne({ refreshToken: refreshToken });

  if (!petsitter) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(401).json({ message: "Unauthorized" });
  }

  await Petsitter.findOneAndUpdate({ refreshToken: refreshToken }, { refreshToken: "" });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });

  res.status(200).json({ message: "Logout successful" });
});


// Update a petsitter

const updatedPetsitter = asyncHandler(async (req, res) => {
  // Ensure req.user is defined and has _id property
  if (!req.petsitter || !req.petsitter._id) {
    return res.status(400).json({ error: 'Invalid user information in the request.' });
  }

  const { _id } = req.petsitter;
  validateMongoDbId(_id);

  try {
    // Check if req.body exists before accessing its properties
    const updatedPetsitterData = {
      ...(req.body.firstname && { firstname: req.body.firstname }),
      ...(req.body.lastname && { lastname: req.body.lastname }),
      ...(req.body.email && { email: req.body.email }),
      ...(req.body.mobile && { mobile: req.body.mobile }),
    };

    const updatedPetsitter = await Petsitter.findByIdAndUpdate(
      _id,
      updatedPetsitterData,
      {
        new: true,
      }
    );

    if (!updatedPetsitter) {
      return res.status(404).json({ error: 'Petsitter not found' });
    }

    res.json(updatedPetsitter);
  } catch (error) {
    // Handle specific errors and send an appropriate response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 // Get all petsitters

const getallPetsitter = asyncHandler(async (req, res) => {
  try {
    const getPetsitters = await Petsitter.find();
    res.json(getPetsitters);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single petsitter

const getaPetsitter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaPetsitter = await Petsitter.findById(id);
    res.json({
      getaPetsitter,
    });
  } catch (error) {
    throw new Error(error);
  }
});
 
// Delete a Petsitter

const deleteaPetsitter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteaPetsitter = await Petsitter.findByIdAndDelete(id);
    res.json({
      deleteaPetsitter,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const blockPetsitter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await Petsitter.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Petsitter Blocked",
    });
  } catch (error) {
    throw new Error(error);
  } 
});
const unblockPetsitter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await Petsitter.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Petsitter unBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = { 
  createPetsitter, 
  loginPetsitterCtrl, 
  getallPetsitter, 
  getaPetsitter, 
  deleteaPetsitter, 
  updatedPetsitter,
  blockPetsitter,
  unblockPetsitter,
  handleRefreshToken,
  logout,
 };
