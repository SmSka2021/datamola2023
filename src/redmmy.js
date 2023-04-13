const shortPolling = () => {
  setInterval(async () => {
    const response = await fetch('http://localhost:5000/updates');
    const data = await response.json();
    if (data.randomNum % 2 === 0) {
      document.getElementById('body').style.background = 'red';
    } else {
      document.getElementById('body').style.background = 'white';
    }
  }, 5000);
};
shortPolling();

const response = {
  assignee: {
    id: '10', login: 'test2', photo: 'hjjj', userName: 'test2',
  },
  comments: [{
    id: '2', createdAt: '2023-04-05T05:44:11.876Z', text: 'string',
  }],
  createdAt: '2023-04-05T05:37:15.994Z',
  creator: {
    id: '10', login: 'test2', photo: 'hjjj', userName: 'test2',
  },
  id: '10',
  description: 'That is a crazy event, must go there!',
  isPrivate: true,
  name: 'Interesting Party',
  priority: 'Hight',
  status: 'To Do',
};
console.log(response);

// body: (...)
// bodyUsed: true
// headers: Headers[[Prototype]]: Headers
// ok: true
// redirected: false
// status: 201
// statusText: "Created"
// type: "basic"
// url: "http://169.60.206.50:7777/api/user/register"
// [[Prototype]]: Response

// id: "5"
// login: "SmSka"
// photo: // userName: "SmS"

// login// : // "Login"
// password// : // "Password123."
// photo// : // retypedPassword
// : // "Password123."
// userName
// : // "NameUser";

// {id: '8', login: 'MyLogin', userName: 'MyName',
// photo: 'i='} 'ответ сервера' MyLogin123. или MyPassword123.;
