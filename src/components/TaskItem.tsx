import React, { FC, KeyboardEvent, useEffect, useState } from "react";
import { trpc } from "../utils/trpc";

interface ITaskItem {
    id: string;
    content: string;
    isDone: boolean;
}

const TaskItem: FC<ITaskItem> = ({ id, content, isDone }) => {
    const [done, setDone] = useState<boolean>(isDone);

    const [taskContent, setTaskContent] = useState<string>(content);

    const tasks = trpc.proxy.task.getTask.useQuery();

    const statusUpdateMutation = trpc.proxy.task.taskStatusUpdate.useMutation();

    const updateTaskMutation = trpc.proxy.task.taskContentUpdate.useMutation();

    const deleteMutation = trpc.proxy.task.taskDelete.useMutation();

    const handleCheckboxChange = () => {
        setDone(!done);
        statusUpdateMutation.mutate({ id: id, isDone: !isDone });
    };

    const handleTaskContentChange = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            updateTaskMutation.mutate({ id: id, taskContent: taskContent });
        }
    };

    const handleClickDelete = () => {
        deleteMutation.mutate({ id: id });
    };

    useEffect(() => {
        tasks.refetch();
    }, [deleteMutation.isSuccess]);

    return (
        <div className="w-3/4 border border-orange-600 px-3 py-4 flex space-x-3 rounded-xl bg-neutral-900 text-white text-xl">
            <input
                type="text"
                className={`${
                    done && "line-through"
                } flex-grow bg-transparent outline-none focus:outline-orange-800 p-2 rounded-md`}
                value={taskContent}
                onChange={(e) => setTaskContent(e.target.value)}
                onKeyDown={(e) => handleTaskContentChange(e)}
            />

            <div className="flex items-center space-x-4">
                <div
                    onClick={() => handleClickDelete()}
                    className="w-8 h-8 flex bg-neutral-800 items-center justify-center rounded-full cursor-pointer hover:scale-110 duration-150"
                >
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                    </svg>
                </div>
                <div className="flex items-center justify-center">
                    <input
                        className="accent-red-500 w-4 h-4"
                        type="checkbox"
                        name=""
                        id=""
                        checked={done}
                        onChange={() => handleCheckboxChange()}
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
