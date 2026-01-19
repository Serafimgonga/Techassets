import prisma from "../services/prisma.js";


export async function creatUser(req, res) {
    const { name, email } = req.body;

    try {
        const user = await prisma.user.create({
            data: { name, email }
        });

        console.log(user);
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json(`Error: Erro ao criar usuario ${err}`);
    }
}

export async function listUser(req, res) {

    const users = await prisma.user.findMany();
    const report = await prisma.report.findMany();


    console.log(users, report);

    return res.json(users);
}