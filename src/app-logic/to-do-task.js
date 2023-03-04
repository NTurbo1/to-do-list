import compareAsc from 'date-fns/compareAsc';

export {
    allTasks,
    createNewtoDoTask,
    removeTaskWithTitle,
    returnToDoTasksDueOn,
    returnToDoTasksDueNotOn,
    returnToDoTasksDueBetween,
    returnToDoTasksWithoutDueDates
}

let allTasks = [];

function createNewtoDoTask(title, description, dueDate, priority, project) {

    return {
        title,
        description,
        dueDate,
        priority,
        project
    };
}

function removeTaskWithTitle(title) {
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].title === title) {
            console.log("Found");
            allTasks.splice(i, 1);
            console.log(allTasks);
            break;
        }
    }
}

function returnToDoTasksDueOn(date) {
    return allTasks.filter(task => task.dueDate === date);
}

function returnToDoTasksDueNotOn(date) {
    return allTasks.filter(task => task.dueDate !== date);
}

function returnToDoTasksDueBetween(startDate, endDate) {
    return allTasks.filter(task => {
        let dueDate = new Date(task.dueDate);

        return (compareAsc(dueDate, startDate) === 1 && 
                compareAsc(dueDate, endDate) === -1) ||
               (compareAsc(dueDate, startDate) === 0 ||
                compareAsc(dueDate, startDate) === 0);
    });
}

function returnToDoTasksWithoutDueDates() {
    return allTasks.filter(task => task.dueDate === "");
}