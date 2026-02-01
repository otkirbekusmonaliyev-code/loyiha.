const { User } = require('./user.model');
const { Task } = require('./task.model');
const { SubTask } = require('./subTask.model');
const { Tag } = require('./tag.model');
const { TaskTags } = require('./TaskTags.model');

// ====================
// 1. User <-> Task (One-to-Many)
User.hasMany(Task, { foreignKey: 'userId', as: 'task'});
Task.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

// ====================
// 2. Task <-> SubTask (One-to-Many)
Task.hasMany(SubTask, { foreignKey: 'taskId', as: 'subtasks' });
SubTask.belongsTo(Task, { foreignKey: 'taskId', as: 'mainTask' });

// ====================
// 3. Task <-> Tag (Many-to-Many)
// Bu yerda Tag modelidagi assotsiatsiya nomini 'taggedTasks' ga o'zgartirdik
Task.belongsToMany(Tag, { through: TaskTags, as: 'tags', foreignKey: 'taskId' });
Tag.belongsToMany(Task, { through: TaskTags, as: 'task', foreignKey: 'tagId' });

// ====================
// 4. TaskTags -> Task & Tag (For include in controller)
TaskTags.belongsTo(Task, { foreignKey: 'taskId', as: 'task' });
TaskTags.belongsTo(Tag, { foreignKey: 'tagId', as: 'tag' });

Task.hasMany(TaskTags, { foreignKey: 'taskId' });
Tag.hasMany(TaskTags, { foreignKey: 'tagId' });

module.exports = { User, Task, SubTask, Tag, TaskTags };
