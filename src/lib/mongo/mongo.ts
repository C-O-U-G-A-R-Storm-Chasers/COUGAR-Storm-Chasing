import { MongoClient, Db } from "mongodb";

/**
 * The WildMongo wrapper class for the WIldMongoWhispers utility
 * @property {MongoClient} client - The active MongoDB client
 * @property {Db} database - The current working Mongo database
 * @property {string} connectionStatus - The Mongo pool connection status
 */
export class WildMongo {
    public client: MongoClient;
    public database: Db;
    private connectionStatus: string = "closed";

    /**
     * WildMongo constructor
     * @param database The name of the desired database to use
     * @param mongoURI Your Mongo URI
     */
    constructor(database: string, mongoURI: string) {
        this.client = new MongoClient(mongoURI);
        this.database = this.client.db(database);
    }

    /**
     * Manually open the current Mongo pool connection
     * Only use this if you understand how Mongo connection pools work
     */
    async OpenPoolConnection(): Promise<void> {
        await this.client.connect();

        console.log(`[${new Date().toISOString()}] Mongo pool connection closed.`);
    }

    /**
     * Manually closes the current Mongo pool connection
     * Only use this if you understand how Mongo connection pools work
     */
    async ClosePoolConnection(logCloseMessage: boolean = false): Promise<void> {
        await this.client.close();

        if (logCloseMessage) console.log(`[${new Date().toISOString()}] Mongo pool connection closed.`);
    }

    /**
     * Manually set or reset the database you are actively working in
     * @param database The name of the desired database to use
     */
    async setDatabase(database: string): Promise<void> {
        this.database = this.client.db(database);
    }

    /**
     * Manually set or reset the client you are actively working in
     * @param mongoURI Your Mongo URI
     * @returns Promise<MongoClient>
     */
    async setClient(mongoURI: string): Promise<MongoClient> {
        this.client = new MongoClient(mongoURI);

        return this.client;
    }
}