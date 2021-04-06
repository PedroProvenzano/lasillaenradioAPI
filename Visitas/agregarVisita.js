const express = require("express");
const router = express.Router();
const Visita = require("../modelos/Visita");

router.get("/", async (req, res) => {
  let visitaData = await Visita.findOne({
    where: { id: 1 },
  });
  if (!visitaData) {
    Visita.create({
      numerovisitas: 1,
    })
      .then(() => {
        console.log("Creada primer visita");
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    visitaData.numerovisitas += 1;
    await visitaData.save({ fields: numerovisitas });
    await visitaData.reload();
    console.log("Nueva visita!");
    return res.status(200).send("Visita!");
  }
});

module.exports = router;
