import React, { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { trpc } from "../utils/trpc";

const TaskInput: FC = () => {
    const [taskContent, setTaskContent] = useState<string>("");

    const tasks = trpc.proxy.task.getTask.useQuery();

    const createMutation = trpc.proxy.task.addNewTask.useMutation();

    const handleInputConfirm = (event: KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        if (key === "Enter") {
            createMutation.mutate({ taskContent: taskContent });
            setTaskContent("");
            console.log("Enter input");
        }
    };

    useEffect(() => {
        tasks.refetch();
    }, [createMutation.isSuccess]);

    return (
        <div className="w-3/4 border-b border-orange-600 px-3 py-4 flex space-x-3 rounded-xl bg-neutral-900 text-white text-xl items-center">
            <div className="flex-grow">
                <input
                    className="w-full bg-transparent outline-none"
                    type="text"
                    name=""
                    id=""
                    onKeyDown={(e) => handleInputConfirm(e)}
                    onChange={(e) => setTaskContent(e.target.value)}
                    value={taskContent}
                />
                {createMutation.isError && <>Error</>}
            </div>
            <div>
                <div className="w-8 h-8 bg-neutral-800 flex justify-center items-center rounded-full text-orange-600 hover:scale-110 duration-150 cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TaskInput;
