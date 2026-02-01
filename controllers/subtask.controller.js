const { where } = require("sequelize");
const { Task, SubTask } = require("../models/relations.model.js")

const CREATE = async (req, res) => {
    let reqBody = req.body

    const { taskId, title, isCompleted } = reqBody;

        const newData = await SubTask.create({
        taskId,
        title,
        isCompleted
    })
    
    return res.json({
        message: "Success",
        data: newData,
    })

}

const GET = async (req, res) => {
    const data = await SubTask.findAll({
        include: { model: Task, as: 'mainTask' },
    })
    res.json({
        message: "Success",
        data: data,
    })
}

const GET_BY_ID = async (req, res) => {
    const { id } = req.params

    try {
        const data = await SubTask.findByPk(id, {
            include: [
                { model: Task, as: "mainTask" }
            ]
        })

        if (!data) {
            return res.json({ message: "Malumotlar topilmadi" })
        }

        return res.json({
            message: "Success",
            data: data
        })
    } catch (error) {
        console.log({ message: "Server xatosi", error: error.message })
    }
}

const DELETE = async (req, res) => {
    const { id } = req.params

    try {
        const deleted = await SubTask.destroy({
            where: { id }
        })

        if (!deleted) {
            return res.json({ message: "Task topilmadi" })
        }

        return res.json({ message: "Ochirildi" })

    } catch (error) {
        console.log({ message: "Server xatosi", error: error.message })
    }
}

const UPDATE = async (req, res) => {
    const { id } = req.params
    const { title, isCompleted } = req.body

    try {
        const [updatedRows] = await SubTask.update(
            { title, isCompleted },
            { where: { id } }
        )

        if (!updatedRows) {
            return res.json({ message: "Task topilmadi" })
        }

        const updatedTask = await SubTask.findByPk(id, {
            include: { model: Task, as: "mainTask" } 
        })

        return res.json({
            message: "Yangilandi",
            data: updatedTask
        })
    } catch (error) {
        console.log({ message: "Server xatosi", error: error.message })
    }
}


module.exports = {
    CREATE,
    GET,
    GET_BY_ID,
    DELETE,
    UPDATE,
}

