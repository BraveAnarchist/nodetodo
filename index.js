const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tasksFilePath = path.join(__dirname, 'tasks.txt');


if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([]));
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function readTasks() {
  const data = fs.readFileSync(tasksFilePath, 'utf8');
  return JSON.parse(data);
}


function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}


function showMenu() {
  console.log('\nTask Manager Menu:');
  console.log('1. Add a new task');
  console.log('2. View list of tasks');
  console.log('3. Mark a task as complete');
  console.log('4. Remove a task');
  console.log('5. Exit');
  rl.question('Choose an option: ', handleMenuOption);
}


function handleMenuOption(option) {
  switch (option.trim()) {
    case '1':
      addTask();
      break;
    case '2':
      viewTasks();
      break;
    case '3':
      markTaskAsComplete();
      break;
    case '4':
      removeTask();
      break;
    case '5':
      rl.close();
      break;
    default:
      console.log('Invalid option. Please try again.');
      showMenu();
  }
}


function addTask() {
  rl.question('Enter the task description: ', (description) => {
    const tasks = readTasks();
    tasks.push({ description, completed: false });
    writeTasks(tasks);
    console.log('Task added successfully.');
    showMenu();
  });
}


function viewTasks() {
  const tasks = readTasks();
  console.log('\nTasks List:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.description} [${task.completed ? 'Completed' : 'Not Completed'}]`);
  });
  showMenu();
}


function markTaskAsComplete() {
  
  rl.question('Enter the task number to mark as complete: ', (taskNumber) => {
    const tasks = readTasks();
    const index = parseInt(taskNumber.trim(), 10) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      writeTasks(tasks);
      console.log('Task marked as complete.');
    } else {
      console.log('Invalid task number.');
    }
    viewTasks();
  });
}


function removeTask() {
  
  rl.question('Enter the task number to remove: ', (taskNumber) => {
    const tasks = readTasks();
    const index = parseInt(taskNumber.trim(), 10) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      writeTasks(tasks);
      console.log('Task removed successfully.');
    } else {
      console.log('Invalid task number.');
    }
    viewTasks();
  });
}

showMenu();
