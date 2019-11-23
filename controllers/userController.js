const user_requests = (req, res) => {
  console.log('Fetch all requests');
};

const user_request = (req, res) => {
  console.log('Fetch single request');
};

const create_request = (req, res) => {
  console.log('Create a request');
};

const modify_request = (req, res) => {
  console.log('Modify request');
};

export { user_requests, user_request, create_request, modify_request };