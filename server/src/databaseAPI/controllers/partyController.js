import uuidv4 from 'uuid/v4';
import db from '../models/query';

const Party = {
  async createParty(req, res) {
    const text = `INSERT INTO
      parties(id, name, address, logo)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.name,
      req.body.address,
      req.body.logo,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: 201,
        data: [rows[0]]
      });
    } catch(error) {
      return res.status(400).send({status: 400, error:"Bad Request"});
    }
  },
 async getAllParty(req, res) {
    const findAllQuery = 'SELECT * FROM parties';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      return res.status(200).send({ 
        status: 201,
        data: rows 
      });
    } catch(error) {
      return res.status(400).send({status: 400, error:"Bad Request"});
    }
  },
}

export default Party;