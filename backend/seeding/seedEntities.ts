import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import { Entity } from "../models/entity.model";

function createRandomEntity(): Entity {
  return {
    id: faker.string.uuid(),
    stringField: faker.word.words({ count: { min: 1, max: 10 } }),
    intField: faker.number.int({ min: 2015, max: 2024 }),
    enumField: faker.helpers.arrayElement(["A", "B", "C", "D"]),
    stringArrayField: faker.helpers.arrayElements([
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
    ]),
    boolField: faker.datatype.boolean(),
    fileName: faker.word.noun(),
  } as Entity;
}

async function seedEntities(): Promise<void> {
  const uri =
    "mongodb+srv://cwc:jEkj8yE3mOWeviIO@child-witness-centre.6c4i8ne.mongodb.net/";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  await client.connect();
  const collection = client.db("test").collection("entities");

  // collection.drop();  // drop() destroys all data in the collection, not sure if we want to every time

  const entityData: Entity[] = [];

  for (let i = 0; i < 10; i += 1) {
    const entity = createRandomEntity();
    entityData.push(entity);
  }
  collection.insertMany(entityData);
  client.close();
}

seedEntities();
