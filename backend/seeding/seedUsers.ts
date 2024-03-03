import { faker } from "@faker-js/faker";
import { MongoClient } from "mongodb";
import { User } from "../models/user.model";

function createRandomUser(): User {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    authId: faker.string.alphanumeric({ length: 25 }),
    role: faker.helpers.arrayElement(["Volunteer", "Staff", "Admin"]),
  } as User;
}

async function seedUsers(): Promise<void> {
  const uri =
    "mongodb+srv://cwc:jEkj8yE3mOWeviIO@child-witness-centre.6c4i8ne.mongodb.net/";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  });

  await client.connect();

  const collection = client.db("test").collection("users");

  // collection.drop();  // drop() destroys all data in the collection, not sure if we want to every time

  const userData: User[] = [];

  for (let i = 0; i < 10; i += 1) {
    const newUser = createRandomUser();
    userData.push(newUser);
  }
  collection.insertMany(userData);
  client.close();
}

seedUsers();
