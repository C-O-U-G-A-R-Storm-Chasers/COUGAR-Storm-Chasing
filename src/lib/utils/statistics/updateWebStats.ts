import { fetchWebStats } from "@/lib/database/statistics/fetchWebStats";
import { insertInitialWebStats } from "@/lib/database/statistics/insertInitialWebStats";
import { updateWebStats } from "@/lib/database/statistics/updateWebStats";

export async function updateWebVisits() {
    const webStats = await fetchWebStats();

    if (webStats) await updateWebStats({
        ...webStats,
        webVisits: webStats.webVisits + 1
    });

    else await insertInitialWebStats();
}