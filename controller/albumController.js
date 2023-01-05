// import { Low } from "lowdb";
// import { JSONFile } from "lowdb/node";

// const db = new Low(new JSONFile("db/data.json"));

import db from "../lib/mongodb.js";
import { ObjectId } from "mongodb";

const collection = db.collection("albums");

export const getAllAlbums = async (req, res) => {
  const albums = await collection.find().toArray();

  res.status(200).json(albums);
};

export const getAlbum = async (req, res) => {
  const album = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!album) return res.status(404).send("Not Found");

  res.status(200).json(album);
};

export const editAlbum = async (req, res) => {
  const album = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!album) return res.status(404).send("Not Found");

  await collection.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { ...req.body } }
  );

  res.status(202).json("updated");
};

export const deleteAlbum = async (req, res) => {
  const album = await collection.findOne({ _id: ObjectId(req.params.id) });
  if (!album) return res.status(404).send("Not Found");

  await collection.deleteOne({ _id: ObjectId(req.params.id) });

  res.status(202).json(`${req.params.id} deleted`);
};

export const saveAlbum = async (req, res) => {
  const newAlbum = await collection.insertOne({ ...req.body });

  res.status(201).json(newAlbum);
};

// await db.read();

// const index = db.data.albums.findIndex((a) => a.id === +req.params.id);

// if (index < 0) return res.status(404).send("Not Found");

// db.data.albums[index] = { ...db.data.albums[index], ...req.body };
// await db.write();
