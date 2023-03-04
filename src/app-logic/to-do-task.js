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
    return allTasks.filter(task => (compareDates(task.dueDate, startDate) === 1 && 
                                    compareDates(task.dueDate, endDate) === -1) ||
                                    (compareDates(task.dueDate, startDate) === 0 ||
                                    compareDates(task.dueDate, startDate) === 0));
}

function returnToDoTasksWithoutDueDates() {
    return allTasks.filter(task => task.dueDate === "");
}

function compareDates(date1, date2) { // If date1 > date2 => 1
                                      // If date1 < date2 => -1
                                      // If date1 == date2 => 0 
    let a1 = date1.split("-");
    let a2 = date2.split("-");
    let year1 = date1[0]; let year2 = date2[0];
    let month1 = date1[1]; let month2 = date2[1];
    let day1 = date1[2]; let day2 = date2[2];

    if (year1 > year2) {
        return 1;
    } else if (year1 < year2) {
        return -1;
    } else {
        if (month1 > month2) {
            return 1;
        } else if (month1 < month2) {
            return -1;
        } else {
            if (day1 > day2) {
                return 1;
            } else if (day1 < day2) {
                return -1;
            } else {
                return 0;
            }
        }       
    }
}