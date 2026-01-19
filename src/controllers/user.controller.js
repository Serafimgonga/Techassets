import prisma from "../services/prisma.js";


export async function creatUser(req, res) {

    if (!req.body)
        throw new Error("Corpo da requisição vazio");

    const { name, email } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name, email },
        });

        console.log(user);
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Erro ao criar Reporter",
            details: err.message
        });
    }
}

export async function creatPost(req, res) {

    const { title, content, userId } = req.body;

    try {
        const post = await prisma.report.create({
            data: { title, content, userId },
        });

        console.log(post);
        res.status(201).json(post);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Erro ao criar Reporter",
            details: err.message
        });
    }
}

export async function listPost(req, res) {

    try {
        const posts = await prisma.report.findMany({ include: { user: true } });

        res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Erro ao listar Posts",
            details: err.message
        });
    }

}

export async function listUser(req, res) {

    const users = await prisma.user.findMany({include: { reports: true }});
    //const report = await prisma.report.findMany();
    return res.json(users);
}