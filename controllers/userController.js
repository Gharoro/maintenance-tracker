import client from '../config/dbconnection';

const user_requests = (req, res) => {
  const { id } = req.user.rows[0];
  const findAll = 'SELECT * FROM requests WHERE customer_id = $1';
  const values = [id];
  client
    .query(findAll, values).then((requests) => {
      if (requests.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          success: `Found ${requests.rowCount} requests`,
          requests: requests.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'No request found',
        requests: requests.rows
      });
    }).catch((err) => console.log(err));
};

const user_request = (req, res) => {
  const user_id = req.user.rows[0].id;
  const id = Number(req.params.requestId);
  if (id < 1 || Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request Id'
    });
  }
  const findOne = 'SELECT * FROM requests WHERE id = $1 AND customer_id = $2';
  const values = [id, user_id];
  client
    .query(findOne, values).then((request) => {
      if (request.rowCount > 0) {
        return res.status(200).json({
          status: 200,
          request: request.rows
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'Request does not exist'
      });
    }).catch((err) => console.log(err));
};

const create_request = (req, res) => {
  const { title, body, category } = req.body;
  const user_id = req.user.rows[0].id;
  const user_name = `${req.user.rows[0].first_name} ${req.user.rows[0].last_name}`;
  const date = new Date();
  if (!title || !body || !category) {
    return res.status(400).json({
      status: 400,
      error: 'Please fill all fields.'
    });
  }
  if (category !== 'repair' && category !== 'maintenance') {
    return res.status(400).json({
      status: 400,
      error: 'Request category can only be "repair or maintenance"'
    });
  }
  const create = `
    INSERT INTO requests(title, body, category, customer_name, customer_id, status, created_at, modified_at) 
    VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`;
  const values = [title, body, category, user_name, user_id, 'Pending', date, date];
  client.query(create, values).then((request) => {
    if (request.rowCount > 0) {
      return res.status(201).json({
        status: 201,
        success: 'Your request have been sent!',
        request: request.rows[0]
      });
    } else {
      return res.status(500).json({
        status: 500,
        error: 'Unable to send your request at the moment'
      });
    }
  }).catch((err) => console.log(err));
};


const modify_request = (req, res) => {
  let { new_title, new_body, new_category } = req.body;
  const user_id = req.user.rows[0].id;
  const id = Number(req.params.requestId);
  if (id < 1 || Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request Id'
    });
  }
  if (new_category !== 'repair' && new_category !== 'maintenance') {
    return res.status(400).json({
      status: 400,
      error: 'Request category can only be "repair or maintenance"'
    });
  }
  const findOne = 'SELECT * FROM requests WHERE id = $1 AND customer_id = $2';
  const values = [id, user_id];
  client
    .query(findOne, values).then((request) => {
      if (request.rowCount > 0) {
        new_title = (!new_title) ? request.rows[0].title : new_title;
        new_body = (!new_body) ? request.rows[0].body : new_body;
        new_category = (!new_category) ? request.rows[0].category : new_category;
        const updateOne = 'UPDATE requests SET title = $1, body = $2, category = $3 WHERE id = $4 AND customer_id = $5';
        const values = [new_title, new_body, new_category, id, user_id];
        if (request.rows[0].status === 'pending') {
          client.query(updateOne, values).then((result) => {
            if (result.rowCount > 0) {
              return res.status(200).json({
                status: 200,
                success: 'Request successfuly updated'
              });
            }
          }).catch((err) => console.log(err));
        } else {
          return res.status(400).json({
            status: 400,
            error: 'Only pending requests can be updated.'
          });
        }
      } else {
        return res.status(404).json({
          status: 404,
          error: 'Request does not exist.'
        });
      }
    }).catch((err) => console.log(err));
};

export { user_requests, user_request, create_request, modify_request };