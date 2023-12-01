import challengesModel from "../models/challenges.model.js";
import taskModel from "../models/tasks.model.js";

// get challenges - GET
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

// Create Challenge - POST
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

// Update IsTrue the task - PUT
export const IsTrue = async (req, res) => {
  try {
    
    const challengeId = req.params.challengeID
    const taskId = req.params.taskID
    const isTrue = req.body.isTrue

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { isTrue: !isTrue },
      { new: true }
    )
    
    if(!updatedTask) {
      return res.status(404).json({success: false, message: "Task was not updated"})
    }

    const updatedChallenge = await challengesModel.findOneAndUpdate(
      {_id: challengeId,
       'tasks._id': taskId},
       {
        $set: {
          'tasks.$.isTrue': !isTrue
        }
       },
       {new: true}
    )

    if (!updatedChallenge) {
      return res.status(404).json({ success: false, message: 'Challenge or task not found' });
    }

    res.status(200).json({ success: true, message: "Task updated successfully"});

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error,
    });
  }
}

// Update IsFalse the task - PUT
export const IsFalse = async (req, res) => {
  try {
    const challengeId = req.params.challengeID
    const taskId = req.params.taskID
    const isFalse = req.body.isFalse

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { isFalse: !isFalse },
      { new: true }
    )

    if(!updatedTask) {
      return res.status(404).json({success: false, message: "Task was not updated"})
    }

    const updatedChallenge = await challengesModel.findOneAndUpdate(
      {_id: challengeId, 'tasks._id': taskId},
      {
        $set: {
          'tasks.$.isFalse': !isFalse
        },
      },
      {new: true}
    )

    if(!updatedChallenge) {
      return res.status(404).json({success: false, message: "Challenge or task not found"})
    }

    res.status(200).json({success: true, message: "IsFalse updated successfully"})

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error,
    });
  }
}

// Challenge delete - DELETE
export const deleteChallenge = async (req, res) => {
  try {
    
    const challengeId = req.params.id

    const deletedChallenge = await challengesModel.findByIdAndDelete(challengeId)

    if(!deletedChallenge) {
      return res.status(404).json({success: false, message: "Challenge was not deleted"})
    }

    const deletedTasks = await taskModel.deleteMany({challenge: challengeId})

    if(!deletedTasks) {
      return res.status(404).json({success: false, message: "Challenge was not deleted"})
    }

    res.status(200).json({success: true, message: "Challenge was deleted successfully"})

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error,
    });
  }
}