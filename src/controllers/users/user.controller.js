import prisma from "../../services/prisma.js";

export async function createUser(req, res) {
    const [name, email] = req.body;

    try {

        const user = await prisma.user.create({
            dados:
            {
                name,
                email
            }
        });

        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            error: {
                error: "Ocorreu algum erro ao tentar registar usuario",
                type: err
            }
        })
    }

}

export async function listUser(req, res) {

    try {

        const user = await prisma.user.findMany({ include: { report: true } });

        res.status(200)
            .json(user);
    }
    catch (err) {

        console.error(err);
        res.status(500).json({
            error: {
                error: "Ocorreu algum erro ao tentar registar usuario",
                type: err
            }
        })
    }

}

export async function findById(req, res) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (!id || isNaN(userId)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Ocorreu algum erro ao tentar filtrar usuario pelo id",
      type: err.message
    });
  }
}


// GET /users/search?name=...&status=...
export async function findByName(req, res) {
  try {
    const { name, status } = req.query;

    if (!name) {
      return res.status(400).json({ error: "Parametro 'name' é obrigatório" });
    }

    const validStatus = ["ACTIVO", "DESACTIVO"];
    let statusFilter;

    if (status) {
      if (!validStatus.includes(status)) {
        return res.status(400).json({
          error: `Status inválido. Valores permitidos: ${validStatus.join(", ")}`
        });
      }
      statusFilter = status;
    }

    const users = await prisma.user.findMany({
      where: {
        name: { contains: name }, // sem mode
        ...(statusFilter && { status: statusFilter })
      },
      include: { report: true }
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Ocorreu algum erro ao tentar filtrar usuario pelo nome",
      type: err.message
    });
  }
}

