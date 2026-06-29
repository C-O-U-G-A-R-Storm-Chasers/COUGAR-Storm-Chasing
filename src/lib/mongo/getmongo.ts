import { WildMongo } from "./mongo";

let mongo: WildMongo | null = null;

export function getMongo(): WildMongo {
    if (!mongo) {
        if (!process.env.MONGO_URI) throw new Error("Missing process.env.MONGO_URI");

        mongo = new WildMongo(process.env.NODE_ENV === "development" ? "Cougar-Storm-Chasing-Dev" : "Cougar-Storm-Chasing", process.env.MONGO_URI);
    }

    return mongo;
}