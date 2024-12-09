import React, { useState } from "react";
import { VexRoboticsLayout } from "./VexRoboticsLayout";
import { VdbRes } from "../types";

export const DebugPage = () => {
    const [done, setDone] = useState(false);

    const resetDb = async () => {
        const response = await fetch("//localhost:5174/debug/reset", {method: "POST"});
        const data: VdbRes<null> = await response.json();
        setDone(!data.error);
    }
    return <VexRoboticsLayout>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Debug</h2>

        <button onClick={resetDb} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Reset DB</button>
        {done && <p>Done</p>}
    </VexRoboticsLayout>;
}
