import client from '../config/dbconnection';

const all_requests = (req, res) => {
  const user_id = req.user.rows[0].id;
  client
    .query('SELECT * FROM users WHERE id = $1', [user_id])
    .then((user) => {
      if (user.rows[0].role === 'admin') {
        client.query('SELECT * FROM requests')
          .then((requests) => {
            if (requests.rowCount > 0) {
              return res.status(200).json({
                status: 200,
                success: `Found ${requests.rowCount} requests`,
                requests: requests.rows
              });
            }
            return res.status(404).json({
              status: 404,
              error: 'No requests found',
              requests: requests.rows
            });
          }).catch((err) => console.log(err));
      } else {
        return res.status(403).json({
          status: 403,
          error: 'This resource is available to admins only'
        });
      }
    }).catch((err) => console.log(err));
};

const approve_request = (req, res) => {
  let new_status = 'approved';
  const user_id = req.user.rows[0].id;
  const id = Number(req.params.requestId);
  if (id < 1 || Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request Id'
    });
  }
  client
    .query('SELECT * FROM users WHERE id = $1', [user_id])
    .then((user) => {
      if (user.rows[0].role === 'admin') {
        const findRequest = 'SELECT * FROM requests WHERE id = $1';
        const values = [id];
        client
          .query(findRequest, values).then((request) => {
            if (request.rowCount > 0) {
              new_status = (!new_status) ? request.rows[0].status : new_status;
              const updateOne = 'UPDATE requests SET status = $1 WHERE id = $2';
              const values = [new_status, id];
              if (request.rows[0].status === 'pending') {
                client.query(updateOne, values).then((result) => {
                  if (result.rowCount > 0) {
                    return res.status(200).json({
                      status: 200,
                      success: 'Request Approved'
                    });
                  }
                }).catch((err) => console.log(err));
              } else {
                return res.status(400).json({
                  status: 400,
                  error: 'Only requests with pending status can be approved.'
                });
              }
            } else {
              return res.status(404).json({
                status: 404,
                error: 'Request does not exist.'
              });
            }
          }).catch((err) => console.log(err));
      } else {
        return res.status(403).json({
          status: 403,
          error: 'This resource is available to admins only'
        });
      }
    }).catch((err) => console.log(err));
};

const disapprove_request = (req, res) => {
  let new_status = 'disapproved';
  const user_id = req.user.rows[0].id;
  const id = Number(req.params.requestId);
  if (id < 1 || Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request Id'
    });
  }
  client
    .query('SELECT * FROM users WHERE id = $1', [user_id])
    .then((user) => {
      if (user.rows[0].role === 'admin') {
        const findRequest = 'SELECT * FROM requests WHERE id = $1';
        const values = [id];
        client
          .query(findRequest, values).then((request) => {
            if (request.rowCount > 0) {
              new_status = (!new_status) ? request.rows[0].status : new_status;
              const updateOne = 'UPDATE requests SET status = $1 WHERE id = $2';
              const values = [new_status, id];
              if (request.rows[0].status === 'pending') {
                client.query(updateOne, values).then((result) => {
                  if (result.rowCount > 0) {
                    return res.status(200).json({
                      status: 200,
                      success: 'Request Disapproved'
                    });
                  }
                }).catch((err) => console.log(err));
              } else {
                return res.status(400).json({
                  status: 400,
                  error: 'Only requests with pending status can be disapproved.'
                });
              }
            } else {
              return res.status(404).json({
                status: 404,
                error: 'Request does not exist.'
              });
            }
          }).catch((err) => console.log(err));
      } else {
        return res.status(403).json({
          status: 403,
          error: 'This resource is available to admins only'
        });
      }
    }).catch((err) => console.log(err));
};

const resolve_request = (req, res) => {
  let new_status = 'resolved';
  const user_id = req.user.rows[0].id;
  const id = Number(req.params.requestId);
  if (id < 1 || Number.isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid request Id'
    });
  }
  client
    .query('SELECT * FROM users WHERE id = $1', [user_id])
    .then((user) => {
      if (user.rows[0].role === 'admin') {
        const findRequest = 'SELECT * FROM requests WHERE id = $1';
        const values = [id];
        client
          .query(findRequest, values).then((request) => {
            if (request.rowCount > 0) {
              new_status = (!new_status) ? request.rows[0].status : new_status;
              const updateOne = 'UPDATE requests SET status = $1 WHERE id = $2';
              const values = [new_status, id];
              if (request.rows[0].status === 'pending') {
                client.query(updateOne, values).then((result) => {
                  if (result.rowCount > 0) {
                    return res.status(200).json({
                      status: 200,
                      success: 'Request Resolved'
                    });
                  }
                }).catch((err) => console.log(err));
              } else {
                return res.status(400).json({
                  status: 400,
                  error: 'Only requests with pending status can be resolved.'
                });
              }
            } else {
              return res.status(404).json({
                status: 404,
                error: 'Request does not exist.'
              });
            }
          }).catch((err) => console.log(err));
      } else {
        return res.status(403).json({
          status: 403,
          error: 'This resource is available to admins only'
        });
      }
    }).catch((err) => console.log(err));
};

export { all_requests, approve_request, disapprove_request, resolve_request };