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

export const editPhoto = async (req, res) => {
  const photo = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!photo) return res.status(404).send("Not Found");

  await collection.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { ...req.body } }
  );
  res.status(202).json("updated");
};

export const deletePhoto = async (req, res) => {
  const photo = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!photo) return res.status(404).send("Not Found");

  await collection.deleteOne({ _id: ObjectId(req.params.id) });

  res.status(202).json(`${req.params.id} deleted`);
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
