const date = new Date();

const user_info = {
  first_name: 'Jane',
  last_name: 'Smith',
  username: 'JSmith',
  email: 'janesmith@email.com',
  password: '1234567',
  role: 'customer',
  gravatar: 'myprofilepic',
  created_at: date,
  modified_at: date
};

const request_info = {
  title: 'Plumbing Request',
  body: 'lorem ipsum dolor',
  category: 'repair'
};

export { user_info, request_info };
