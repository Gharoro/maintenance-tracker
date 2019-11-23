const all_requests = (req, res) => {
  console.log('Fetch all requests');
};

const approve_request = (req, res) => {
  console.log('Approve a request');
};

const disapprove_request = (req, res) => {
  console.log('Disapprove a request');
};

const resolve_request = (req, res) => {
  console.log('Resolve a request');
};

export { all_requests, approve_request, disapprove_request, resolve_request };