const mongoose = require("mongoose");
const EventModel = require("../model/EventModel");

const CreateEvent = async (req, res) => {
    const {title, description, image, organizer, eventDate, startTime, endTime, location, categoryId} = req.body
    
    try {
        if (!title || !description || !image || !organizer || !eventDate || !startTime || !endTime || !location || !categoryId) {
            return res.status(400).json({
              status: "fail",
              message: "All fields are required",
            });
          }
          const userId = req.user._id
          let data = await EventModel.create({
            title: title,
            description: description,
            image: image,
            organizer: organizer,
            eventDate: eventDate,
            startTime: startTime,
            endTime: endTime,
            location: location,
            categoryId: categoryId,
            userId: userId,
          })
        return res.status(201).json({
            status: "success",
            message: "Event created",
            data: data,
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        })
    }
};

const GetEvent = async (req, res) => {
    try {
        let JoinWithCategory = { $lookup:{ from: "categories", localField: "categoryId", foreignField: "_id", as: "category"}
         }
         let UnWindCategory = {$unwind: "$category"}

         let ProjectionStage = {$project: {"createdAt": 0, "updatedAt": 0, "category.createdAt": 0, "category.updatedAt": 0}}

         let data = await EventModel.aggregate([
            JoinWithCategory, UnWindCategory,ProjectionStage
         ])
        return res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        })
    }
};

const GetEventDetailsByID = async (req, res) => {
    try {
         let eventId = new mongoose.Types.ObjectId(req.params.EventId);
         let MatchStage = {$match: {_id: eventId}}
        let JoinWithCategory = { $lookup:{ from: "categories", localField: "categoryId", foreignField: "_id", as: "category"}
         }
         let UnWindCategory = {$unwind: "$category"}

         let ProjectionStage = {$project: {"createdAt": 0, "updatedAt": 0, "category.createdAt": 0, "category.updatedAt": 0}}

         let data = await EventModel.aggregate([
            MatchStage, JoinWithCategory, UnWindCategory,ProjectionStage
         ])
        return res.status(200).json({
            status: "success",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        })
    }
};

const EventByUser =  async (req, res) => {
    try {
        const userId = req.user._id
        let data = await EventModel.find({userId: userId})
        return res.status(200).json({
            status: "success",
            data: data
        })
        
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        })
    }
};

const EventDelete =  async (req, res) => {
    try {
        const EventId= new mongoose.Types.ObjectId(req.params.EventId)
        const userId = req.user._id
        const checkItem = await EventModel.findOne({_id: EventId, userId: userId})
        if(!checkItem){
            return res.status(400).json({
                status: "success",
                message: "item not found"
            })
        }
        let data = await EventModel.deleteOne({_id: EventId})
        return res.status(200).json({
            status: "success",
            data: data
        })
        
    } catch (error) {
        return res.status(500).json({
            status: "fail",
            message: error.message,
        })
    }
};

module.exports ={
    CreateEvent,
    GetEvent,
    GetEventDetailsByID,
    EventByUser,
    EventDelete,
}