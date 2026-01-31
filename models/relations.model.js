const {User} = require('./user.model');
const {Task} = require('./task.model');
const {SubTask} = require('./subTask.model');
const {Tag} = require('./tag.model');

// 1. User <-> Task (One-to-Many)
// Har bir User ko'plab Task-larga ega bo'lishi mumkin
User.hasMany(Task, {foreignKey: 'userId', as: 'tasks', onDelete: 'CASCADE'}) // User o'chsa, unga tegishli hamma tasklar ham o'chadi (ai qilib berdi !!! :) )
Task.belongsTo(User, {foreignKey: 'userId', as: 'owner'})

// 2. Task <-> SubTask (One-to-Many)
// Har bir Task ko'plab SubTask-larga ega bo'lishi mumkin
Task.hasMany(SubTask, {foreignKey: 'taskId',  as: 'subtasks', onDelete: 'CASCADE'})
SubTask.belongsTo(Task, {foreignKey: 'taskId', as: 'mainTask'})

// 3. Task <-> Tag (Many-to-Many)
// Task ko'plab Tag-larga ega bo'lishi mumkin va aksincha.
// Buning uchun "TaskTags" nomli bog'lovchi jadval ishlatiladi.
Task.belongsToMany(Tag, {through: 'TaskTags', as: 'tags', foreignKey: 'taskId'})
Tag.belongsToMany(Task, {through: 'TaskTags', as: 'tasks', foreignKey: 'tagId'})

module.exports = { User, Task, SubTask, Tag };