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

// PUT
export const replace = async (req, res) => {
  const document = { ...req.body };

  const result = await collection.replaceOne(
    { _id: ObjectId(req.params.id) },
    document,
    { upsert: true }
  );
  res.status(204).json(result);
};

//PATCH
export const editAlbum = async (req, res) => {
  const result = await collection.updateOne(
    { _id: ObjectId(req.params.id) },
    { $set: { ...req.body } }
  );
  res.status(204).json(result);
};

export const deleteAlbum = async (req, res) => {
  const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });

  if (result.deletedCount <= 0) return res.status(404).end();

  res.status(204).json(`${req.params.id} deleted`);
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
