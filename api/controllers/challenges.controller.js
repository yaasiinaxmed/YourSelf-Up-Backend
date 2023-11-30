import challengesModel from "../models/challenges.model.js";
import taskModel from "../models/tasks.model.js";

// get challenges
export const getChallenges = async (req, res) => {
  try {
    const challenges = await challengesModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error,
    });
  }
};

// Create Challenge
export const createChallenge = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description } = req.body;

    const newChallenge = new challengesModel({
      title,
      description,
      user: userId,
    });

    const savedChallenge = await newChallenge.save();

    if (!savedChallenge) {
      return res
        .status(400)
        .json({ status: 400, message: "Challenge was not created!" });
    }

    const challengeId = savedChallenge._id;

    // create tasks for the challenge
    const tasks = Array.from({ length: 21 }, (_, index) => ({
      isTrue: false,
      isFalse: false,
      challenge: challengeId,
    }));

    await taskModel.insertMany(tasks)

    const challengeTasks = await taskModel.find({challenge: challengeId})

    // update the challenge with tasks
    await challengesModel.findByIdAndUpdate(
      challengeId,
      { tasks: challengeTasks },
      { new: true }
    );

    res
      .status(200)
      .json({ success: true, message: "Challenges created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error,
    });
  }
};
