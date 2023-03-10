const tasks = [
  {
    id: "1",
    name: "Создать логотип приложения",
    description: "Формат изображения – svg, размеры - 100х100px",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Иванов",
    status: "To Do",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
  {
    id: "2",
    name: "Переименовать константу DELAY_TIME ",
    description:
      "Необходимо переименовать константу с DELAY_TIME на DELAY_API_TIME",
    createdAt: new Date("2023-03-09T23:00:00"),
    assignee: "Иванов",
    status: "To Do",
    priority: "Medium",
    isPrivate: false,
    comments: [
      {
        id: "912",
        text: "Будет сделано!",
        createdAt: new Date("2023-03-09T23:00:05"),
        author: "Иванов",
      },
    ],
  },
  {
    id: "3",
    name: "Разработать дизайн ",
    description: "Необходимо разработать дизайн приложения",
    createdAt: new Date("2023-02-09T23:00:00"),
    assignee: "Петров",
    status: "In progress",
    priority: "Low",
    isPrivate: true,
    comments: [
      {
        id: "9120",
        text: "Будет сделано!",
        createdAt: new Date("2023-02-09T23:00:05"),
        author: "Петров",
      },
    ],
  },
  {
    id: "4",
    name: "Разработать бургер-меню",
    description: "Разработать бургер-меню",
    createdAt: new Date("2023-01-09T23:00:00"),
    assignee: "Коршунов",
    status: "In progress",
    priority: "Medium",
    isPrivate: false,
    comments: [
      {
        id: "9121",
        text: "Ok",
        createdAt: new Date("2023-01-09T23:00:05"),
        author: "Коршунов",
      },
    ],
  },
  {
    id: "5",
    name: "Разработать модалку",
    description: "Сделать модалку",
    createdAt: new Date("2023-01-12T23:00:00"),
    assignee: "Ермолаева",
    status: "Complete",
    priority: "Low",
    isPrivate: false,
    comments: [
      {
        id: "9122",
        text: "Срочно!",
        createdAt: new Date("2023-01-12T23:00:05"),
        author: "Коршунов",
      },
    ],
  },
  {
    id: "6",
    name: "Протестировать бургер-меню",
    description: "Протестировать бургер-меню на разных разрешениях",
    createdAt: new Date("2023-01-15T23:00:00"),
    assignee: "Буян",
    status: "To Do",
    priority: "Low",
    isPrivate: true,
    comments: [
      {
        id: "9123",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-01-15T23:00:05"),
        author: "Коршунов",
      },
    ],
  },
  {
    id: "7",
    name: "Сделать адаптив",
    description: "Сделать адаптивную версию дизайна",
    createdAt: new Date("2023-02-15T23:00:00"),
    assignee: "Варан",
    status: "In progress",
    priority: "Medium",
    isPrivate: true,
    comments: [
      {
        id: "9124",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-01-15T23:00:05"),
        author: "Коршунов",
      },
      {
        id: "9125",
        text: "Не забудь проо логотип!",
        createdAt: new Date("2023-02-15T23:00:05"),
        author: "Варан",
      },
    ],
  },
  {
    id: "8",
    name: "Разработать слайдер",
    description: "Сделать слайдер под фотографии",
    createdAt: new Date("2023-02-1T23:00:00"),
    assignee: "Белусь",
    status: "To Do",
    priority: "Medium",
    isPrivate: false,
    comments: [
      {
        id: "912",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-01-1T23:00:05"),
        author: "Коршунов Илья",
      },
      {
        id: "912",
        text: "Не забудь про новые форматы!",
        createdAt: new Date("2023-02-15T23:00:05"),
        author: "Варан Саша",
      },
    ],
  },
  {
    id: "9",
    name: "Разработать пагинацию",
    description: "Сделать пагинацию основной страницы",
    createdAt: new Date("2023-01-19T23:00:00"),
    assignee: "Варяг",
    status: "In progress",
    priority: "Low",
    isPrivate: true,
    comments: [],
  },
  {
    id: "10",
    name: "Сделать авторизацию",
    description: "Сделать авторизацию пользователя на главной странице",
    createdAt: new Date("2023-02-20T23:00:00"),
    assignee: "Симан",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [
      {
        id: "9129",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-01-20T23:00:05"),
        author: "Коршунов Илья",
      },
      {
        id: "9130",
        text: "Не забудь проо логотип!",
        createdAt: new Date("2023-02-15T23:00:05"),
        author: "Варан Саша",
      },
    ],
  },
  {
    id: "11",
    name: "Сделать страницу админа",
    description: "Сделать страницу админа для администрирования сайта",
    createdAt: new Date("2023-01-20T23:00:00"),
    assignee: "Горян",
    status: "In progress",
    priority: "Low",
    isPrivate: false,
    comments: [
      {
        id: "9135",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-01-20T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "12",
    name: "Сделать страницу 404",
    description: "Сделать страницу 404",
    createdAt: new Date("2023-03-20T23:00:00"),
    assignee: "Ткачук",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [
      {
        id: "9136",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2023-03-20T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "13",
    name: "Разработать header",
    description: "Разработать header для всех страниц",
    createdAt: new Date("2022-12-22T23:00:00"),
    assignee: "Шук",
    status: "To Do",
    priority: "Low",
    isPrivate: false,
    comments: [
      {
        id: "9137",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-12-25T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "14",
    name: "Разработать footer",
    description: "Разработать footer для всех страниц",
    createdAt: new Date("2022-12-25T23:00:00"),
    assignee: "Сидоренко",
    status: "To Do",
    priority: "Medium",
    isPrivate: false,
    comments: [
      {
        id: "9138",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-12-25T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "15",
    name: "Разработать navigation",
    description: "Разработать navigation для всех страниц",
    createdAt: new Date("2022-12-27T23:00:00"),
    assignee: "Сидоренко",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [
      {
        id: "9139",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-12-27T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "16",
    name: "Разработать aside",
    description: "Разработать aside для главной страницы",
    createdAt: new Date("2022-02-27T23:00:00"),
    assignee: "Ткач",
    status: "Complete",
    priority: "Medium",
    isPrivate: false,
    comments: [
      {
        id: "9140",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-02-27T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "17",
    name: "Сверстать confirm modal",
    description:
      "Разработать confirm modal  в соответствии с дизайном  приложения",
    createdAt: new Date("2022-02-28T23:00:00"),
    assignee: "Петров",
    status: "To Do",
    priority: "Low",
    isPrivate: true,
    comments: [
      {
        id: "9141",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-02-29T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "18",
    name: "Сверстать главную страницу",
    description:
      "Сверстать главную страницу в соответствии с дизайном  приложения",
    createdAt: new Date("2022-01-28T23:00:00"),
    assignee: "Петров",
    status: "To Do",
    priority: "Medium",
    isPrivate: true,
    comments: [
      {
        id: "9142",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-01-29T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "19",
    name: "Сверстать  страницу регистрации",
    description:
      "Сверстать страницу регистрации в соответствии с дизайном  приложения",
    createdAt: new Date("2022-01-29T23:00:00"),
    assignee: "Васильев",
    status: "In progress",
    priority: "High",
    isPrivate: false,
    comments: [
      {
        id: "9143",
        text: "Это не срочно, но важно!",
        createdAt: new Date("2022-01-29T23:00:05"),
        author: "Коршунов Илья",
      },
    ],
  },
  {
    id: "19",
    name: "Проверить макет на соответствие ТЗ",
    description: "Проверить все страницы макета на соответствие ТЗ ",
    createdAt: new Date("2022-01-30T23:00:00"),
    assignee: "Васильев",
    status: "Complete",
    priority: "High",
    isPrivate: false,
    comments: [],
  },
];
 const invalidTask = {
  id: "4",
  name: "Проверить макет на соответствие ТЗ",
  description: "Проверить все страницы макета на соответствие ТЗ ",
  createdAt: "2022-01-30T23:00:00", //invalid//
  assignee: "Васильев",
  status: "Complete",
  priority: "High",
  isPrivate: false,
  comments: [],
};
const invalidTask2 = {
  id: "", //invalid//
  name: "Проверить макет на соответствие ТЗ",
  description: "Проверить все страницы макета на соответствие ТЗ ",
  createdAt: new Date("2022-01-30T23:00:00"), 
  assignee: "Васильев",
  status: "Complete",
  priority: "High",
  isPrivate: false,
  comments: [],
};

const invalidTask3 = {
  id: "77", 
 //invalid not name//
  description: "Проверить все страницы макета на соответствие ТЗ ",
  createdAt: new Date("2022-01-30T23:00:00"), 
  assignee: "Васильев",
  status: "Complete",
  priority: "High",
  isPrivate: false,
  comments: [],
};
const invalidComments1 = {
  id: "19",
  name: "Сверстать  страницу регистрации",
  description:
    "Сверстать страницу регистрации в соответствии с дизайном  приложения",
  createdAt: new Date("2022-01-29T23:00:00"),
  assignee: "Васильев",
  status: "In progress",
  priority: "High",
  isPrivate: false,
  comments: [
    {
      id: "9143",
      text: "Это не срочно, но важно!",
      createdAt: "2022-01-29T23:00:05",
      author: "Коршунов Илья",
    },
  ],
};

const invalidComments2 = {
  id: "19",
  name: "Сверстать  страницу регистрации",
  description:
    "Сверстать страницу регистрации в соответствии с дизайном  приложения",
  createdAt: new Date("2022-01-29T23:00:00"),
  assignee: "Васильев",
  status: "In progress",
  priority: "High",
  isPrivate: false,
  comments: [
    {
      id: "9143",     
      createdAt: "2022-01-29T23:00:05",
      author: "Коршунов Илья",
    },
  ],
};

/////////////////*******////////////////

const myModule = (function(){
    let user  = 'Иванов';

    function  getUser () {
      return user;
     }

    function changeUser (usr) {
      if(usr.trim().length && (typeof usr === 'string')) user = usr;
     }

     
    function getTasks(skip = 0, top = 10, filterConfig = {}) {
    let tasksArrSortDate = tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const config = {...filterConfig}
   
    if(config.assignee) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.assignee.includes(config.assignee));

    if(config.description) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.description.includes(config.description));
  
    if(config.status) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.status === config.status);

    if(config.priority) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.priority === config.priority);

    if(config.isPrivate) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.isPrivate === config.isPrivate);

    if(config.dateFrom) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.createdAt.getTime() >= config.dateFrom.getTime());

    if(config.dateTo) tasksArrSortDate = tasksArrSortDate.filter((task)=> task.createdAt.getTime() <= config.dateTo.getTime());

    return tasksArrSortDate.slice(skip, skip + top);
    }

    function getTask(id) {
      return tasks.filter(task=> task.id === id)[0];
    }

    function validateTask(task) {
      let isNotAllKey = false;
      const keysTask = ['id', 'name', 'description', 'createdAt', 'assignee', 'status', 'priority', 'isPrivate','comments']

        for(let item of keysTask) {
          if(!task.hasOwnProperty(item)) {
          isNotAllKey = true;
          }
               
      }
      if(isNotAllKey) return false;     

      const validateId = (typeof task.id === 'string') && task.id.trim().length;
      const validateName = (typeof task.name === 'string') && task.name.length <= 100 && task.name.trim().length;
      const validateDescription = (typeof task.description === 'string') && task.description.length <= 280 && task.description.trim().length;
      const validateCreatedAt = task.createdAt instanceof Date; 
      const validateAssignee = (typeof task.assignee === 'string') && task.assignee.trim().length;
      const validateStatus = (typeof task.status === 'string') && (task.status === 'To Do' || task.status === 'Complete' || task.status === 'In progress');
      const validatePriority = (typeof task.priority === 'string') && (task.priority === 'High' || task.priority === 'Medium' || task.priority === 'Low');
      const validateIsPrivate = (typeof task.isPrivate === 'boolean');
      const validateComments =  task.comments instanceof Array;
     
      return !!(validateId && validateName && validateDescription && validateCreatedAt && validateAssignee && validateStatus && validatePriority && validateIsPrivate && validateComments && true)
    }
        

    function addTask (nameTask, descriptionTask, assigneeTask, statusTask, priorityTask, isPrivateTask) {
      const dateNow = new Date();
      const newTask = {
        id: dateNow.getTime().toString(),
        name: nameTask,
        description: descriptionTask,
        createdAt: new Date(dateNow),
        assignee: user || assigneeTask,
        status: statusTask,
        priority: priorityTask,
        isPrivate: isPrivateTask,
        comments: [],
      };

      if(validateTask(newTask)) {
        tasks.push(newTask);      
        return true;
      }     
      return false;
     }


     function editTask (id,  name = '', description= '', assignee = '', status ='', priority = '', isPrivate = false) {
      const index = tasks.findIndex((task) =>  task.id === id);  
      const editTask = {...tasks[index]}; 
          
      if(editTask.assignee === user) {
          if(name) editTask.name = name;
          if(description) editTask.description = description;
          if(assignee) editTask.assignee = assignee;
          if(status) editTask.status = status;
          if(priority) editTask.priority = priority;
          if(typeof isPrivate === 'boolean') editTask.isPrivate = isPrivate;
          if(!validateTask(editTask)) return false;
          tasks.splice(index, 1, editTask);         
          return true;
      }
     return false
    }
     

    function removeTask(id) {
      const index = tasks.findIndex((task) =>  task.id === id);   
          
      if(tasks[index].assignee === user) {
        tasks.splice(index, 1); 
        return true;
      }
      return false;
    }

   
    function validateComment(comment) {
      let isNotAllKey = false;
      const keysComment = ['id', 'text',  'createdAt', 'author']
     
        for(let item of keysComment) {
          if(!comment.hasOwnProperty(item)) {
          isNotAllKey = true;
          }                
      }
      if(isNotAllKey) return false;     

      const validateId = (typeof comment.id === 'string') && comment.id.trim().length;
      const validateText = (typeof comment.text === 'string') && comment.text.length <= 280 && comment.text.trim().length;      
      const validateCreatedAt = comment.createdAt instanceof Date; 
      const validateAauthor = (typeof comment.author === 'string') && comment.author.length;     
     
      return !!(validateId && validateText && validateAauthor && validateCreatedAt && true)
    }

    function addComment (id, textComment) {
      const index = tasks.findIndex((task) =>  task.id === id);
      const dateNow = new Date();
      const newComment = {
        id: dateNow.getTime().toString(),
        text: textComment,
        createdAt: new Date(dateNow),
        author: user,
      };

      if(validateComment(newComment)) {
        tasks[index].comments.push(newComment);      
        return true;
      }     
      return false;
     }
   


    return {
      getTasks,
      getTask,
      validateTask,
      addTask,
      editTask,
      removeTask,
      validateComment,
      addComment,
      changeUser,
      getUser
    }
    })();

//console.log(myModule.getTasks())
//console.log(myModule.getTasks(0, 2, {assignee: 'Васильев'}))
//console.log(myModule.getTasks(0, 3, {status: 'Complete'}))
//console.log(myModule.getTasks(0, 2, {assignee: 'Петров', status: 'To Do'}))
//console.log(myModule.getTasks(0, 2, {assignee: 'Петров', status: 'To Do', priority: 'Low'}))
//console.log(myModule.getTasks(0, 2, {assignee: 'Петров', isPrivate: true}))
//console.log(myModule.getTasks(0, 2, {assignee: 'Петров', description: 'confirm modal'}))
//console.log(myModule.getTasks(0, 2, {dateFrom: new Date("2022-01-29T23:00:05")}))
//console.log(myModule.getTasks(0, 2, {dateTo: new Date("2022-01-29T23:00:05")}))

//console.log(myModule.getTask('15'))


//console.log(myModule.validateTask(tasks[15]))
//console.log([...tasks.map((task) => myModule.validateTask(task))]) //check all tasks
//console.log(myModule.validateTask(invalidTask))  //id=''
//console.log(myModule.validateTask(invalidTask2))  //date is not Date object
//console.log(myModule.validateTask(invalidTask3))  //task has not all field


//console.log(tasks.length)
//console.log(myModule.addTask('Add modal', 'Description', 'Serg', 'Complete', 'Low', false)) //good task
//console.log(tasks.length)
//console.log(myModule.addTask('Add modal', 'Description', 'Serg', 'Complete', 'Low', 'false')) //bad task
//console.log(tasks.length)


//console.log(myModule.getTask('5'))  //editTask.assignee !== user
//console.log(myModule.editTask('5', 'hi', 'hello'))
//console.log(myModule.getTask('5'))

//console.log(myModule.getTask('1'))  //editTask.assignee === user
//console.log(myModule.editTask('1', 'hi', 'hello'))
//console.log(myModule.getTask('1'))


//console.log(tasks.length)
//console.log(myModule.removeTask('5'))  //removeTask.assignee !== user
//console.log(tasks.length)
//console.log(myModule.removeTask('1')) //removeTask.assignee === user
//console.log(myModule.getTask('1'))
//console.log(tasks.length)

//console.log(myModule.validateComment(tasks[1].comments[0]))  //good comment
//console.log(myModule.validateComment(invalidComments1)); //invalid comment -value Data is not object
//console.log(myModule.validateComment(invalidComments2)); //invalid comment -comment has not all field

//console.log(myModule.getTask('1'))    //add valid comment
//console.log(myModule.addComment('1', 'Hello, user'))
//console.log(myModule.getTask('1'))

//console.log(myModule.getTask('2'))     //add invalid comment
//console.log(myModule.addComment('2', ''))
//console.log(myModule.getTask('2'))

//console.log(myModule.getUser());
//console.log(myModule.changeUser('newUser'));
//console.log(myModule.getUser());
