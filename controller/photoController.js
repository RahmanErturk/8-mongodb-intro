import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";

const collection = db.collection("photos");

export const getAllPhotos = async (req, res) => {
  const photos = await collection.find().toArray();

  res.status(200).json(photos);
};

export const getPhoto = async (req, res) => {
  const photo = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!photo) return res.status(404).send("Not Found");

  res.status(200).json(photo);
};

// PUT
export const replace = async (req, res) => {
  const document = { ...req.body };

  const result = await collection.replaceOne(
    { _id: ObjectId(req.params.id) },
    document
  );
  res.status(204).json(result);
};

//PATCH
export const editPhoto = async (req, res) => {
  const result = await collection.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { ...req.body } }
  );
  res.status(204).json(result);
};

export const deletePhoto = async (req, res) => {
  const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });

  if (result.deletedCount <= 0) return res.status(404).end();

  res.status(204).json(`${req.params.id} deleted`);
};

export const savePhoto = async (req, res) => {
  const newPhoto = await collection.insertOne({ ...req.body });

  res.status(201).json(`Album created successfully` + " " + newPhoto);
};

// await db.read();

// const index = db.data.photos.findIndex((p) => p.id === +req.params.id);

// if (index < 0) return res.status(404).send("Not Found");

// db.data.photos[index] = { ...db.data.photos[index], ...req.body };
// await db.write();
