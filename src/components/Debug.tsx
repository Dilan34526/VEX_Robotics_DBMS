import React, { useState } from "react";
import { VexRoboticsLayout } from "./VexRoboticsLayout";
import { VdbRes } from "../types";

export const Debug = ({onReset, onFinish}: {onReset: () => void, onFinish: () => void}) => {
    const [working, setWorking] = useState(false);
    const [done, setDone] = useState(false);

    const initializeDb = async () => {
        setDone(false);
        setWorking(true);
        onReset();
        try {
            const response = await fetch("//localhost:5174/debug/initialize", {method: "POST"});
            const data: VdbRes<null> = await response.json();
            setDone(!data.error);
            onFinish();
        } catch (e) {
            setDone(false);
        } finally {
            setWorking(false);
        }

    };

    const resetDb = async () => {
        setDone(false);
        setWorking(true);
        onReset();
        try {
            const response = await fetch("//localhost:5174/debug/reset", {method: "POST"});
            const data: VdbRes<null> = await response.json();
            setDone(!data.error);
            onFinish();
        } catch (e) {
            setDone(false);
        } finally {
            setWorking(false);
        }
    };

    return <div className="flex gap-2 items-center">
        <button onClick={initializeDb} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Initialize DB</button>
        <button onClick={resetDb} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Reset DB</button>
        {working && <span className="text-gray-500">Working...</span>}
        {done && <span className="text-green-600">Done</span>}
    </div>;
}
