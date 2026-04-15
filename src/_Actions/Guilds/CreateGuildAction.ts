"use server";

import { BasicResult } from "@/_Interfaces/BasicResult";

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export async function CreateGuildAction(prevState: any, data: FormData): Promise<BasicResult> {
    const guildName = data.get("guild-name") as string;
    const guildBio = data.get("guild-bio") as string;
    const guildDescription = data.get("guild-description") as string;
    const guildIconFile = data.get("guild-icon") as File;

    return {
        success: true,
        msg: `You have successfully created ${guildName}!`,
        data: null
    };
}