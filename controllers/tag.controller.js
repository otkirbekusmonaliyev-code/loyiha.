const { where } = require("sequelize");
const { Task, Tag } = require("../models/relations.model.js")

const CREATE = async (req, res) => {

    const { name, tasks } = req.body

    const newData = await Tag.create({
        name,
        tasks
    })

    return res.json({
        message: "Success",
        data: newData,
    })

}

const GET = async (req, res) => {
    const data = await Tag.findAll({
        include: { model: Task, as: 'task' },
    })
    res.json({
        message: "Success",
        data: data,
    });
}


module.exports = {
    CREATE,
    GET
}

