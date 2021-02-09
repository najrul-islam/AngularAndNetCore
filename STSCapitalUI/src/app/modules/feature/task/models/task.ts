

export interface ITask {
    taskGuid?: string;
    title: string;
    description?: string;
    taskDate: Date;
    taskFromTime?: Date;
    taskToTime?: Date;
    location?: string;
}

export const createTaskModel = ({
    taskGuid = '',
    title = '',
    description = '',
    taskDate = new Date(),
    taskFromTime = new Date(),
    taskToTime = new Date(),
    location = ''
}: ITask = {
        title: '',
        taskDate: new Date()
    }): ITask => ({
        taskGuid,
        title,
        description,
        taskDate,
        taskFromTime,
        taskToTime,
        location
    });
