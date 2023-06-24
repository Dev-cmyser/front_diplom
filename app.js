Vue.createApp({
  data() {
    return {
      valueInput: '',
      timerInput: '',
      appInput: '',
      needDoList: [],
      completeList: [],
      apps: [],
      user: this.checkData(),

    };

  },
  mounted() {
    this.setneedTasks()
  },
  methods: {
    checkData() {
      let user = this.getCookie('user')
      if (user) {
        return user
      } else {
        return ''
      }

    },


    setneedTasks() {
      let user = this.getCookie('user')
      axios.get(`https://todotaskmaster.space/api/all-tasks/?user=${user}`).then((response) => {
        // console.log(response)
        this.needDoList = response.data.filter(item => (item.is_completed == false))
        this.completeList = response.data.filter(item => (item.is_completed == true))
        // console.log(this.needDoList)
        this.needDoList.forEach(el => {
          let apps_l = el.apps.map(el => Object.values(el))
          let result = []
          apps_l.forEach(el => {
            result.push(el[0])
          })
          el.apps = result
        });
        this.completeList.forEach(el => {
          let apps_l = el.apps.map(el => Object.values(el))
          let result = []
          apps_l.forEach(el => {
            result.push(el[0])
          })
          el.apps = result
        });
      })
      // axios.get(`https://todotaskmaster.space/api/all-tasks/?user=${user}`).then((response) => {
      //   console.log(response)
      //   this.needDoList = response.data.filter(item => (item.is_completed == false))
      //   this.completeList = response.data.filter(item => (item.is_completed == true))
      // })




    },
    setCookie(name, value, options = {}) {

      options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
      };

      if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
      }

      let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    },
    deleteCookie(name) {
      this.setCookie(name, "", {
        'max-age': -1
      })
      window.location.href = "/login.html";
    },
    getCookie(name) {
      let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
      ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    handleInput(event) {
      this.valueInput = event.target.value;
    },
    handleInput2(event) {
      this.timerInput = event.target.value;
    },
    handleInputApp(event) {

      this.appInput = event.target.value;


    },
    TimerRun(index) {
      console.log(index)
      if (this.timerInput === '') { return };

      timeMinut = parseInt(this.timerInput) * 60
      // console.log(this.timerInput)
      var btns = document.querySelectorAll(".temer_b");


      let timerShow = document.querySelectorAll('.temer')[index];
      // console.log(timerShow)
      let node = document.createElement("div");
      node.id = 'time' + this.needDoList.length
      node.classList.add("delete");
      timerShow.append(node);
      var ck;
      ck += 1
      let one = 1000

      timer = setInterval(function () {
        // timeMinut = globalThis.timeMinut
        seconds = timeMinut % 60 // Получаем секунды
        minutes = timeMinut / 60 % 60 // Получаем минуты
        hour = timeMinut / 60 / 60 % 60 // Получаем часы
        // Условие если время закончилось то...
        if (timeMinut <= 0) {
          // Таймер удаляется
          var btns = document.querySelectorAll(".temer_b");

          for (let i = 0; i < btns.length; i++) {
            btns[i].classList.remove("disable");

          }

          node.remove()
          clearInterval(timer);
          // let t = document.getElementById("time1");
          // t.remove()

          return '';
          // Выводит сообщение что время закончилось
          alert("Время закончилось");

          return '';
        } else { // Иначе

          var btns = document.querySelectorAll(".temer_b");
          for (let i = 0; i < btns.length; i++) {
            btns[i].classList.add("disable");

          }
          // Создаём строку с выводом времени
          let strTimer = `${Math.trunc(hour)}:${Math.trunc(minutes)}:${seconds}`;
          // Выводим строку в блок для показа таймера
          children = document.querySelectorAll('.delete');
          // console.log(children.length)


          if (children.length > 1) {
            children[0].innerHTML = strTimer;
            children[1].remove()
          } else {
            node.innerHTML = strTimer;
          }


        }
        timeMinut = timeMinut - 1; // Уменьшаем таймер
      }, one)


    },
    addTask() {
      if (this.valueInput === '') { return };

      let data = {
        // id: 10,
        name: this.valueInput,
        user: {
          username: this.user,
        },
        apps: this.apps,

      }
      data1 = JSON.stringify(data)
      console.log(data1)
      axios.post("https://todotaskmaster.space/api/create-task/", data1).then((response) => {
        console.log(response)
        this.needDoList.push({
          name: response.data.name,
          id: response.data.id
        });
      })

      this.valueInput = '';

    },
    addApp(id) {
      // console.log(id, this.needDoList)
      if (this.appInput === '') { return };
      // this.apps.push(this.appInput)
      document.querySelector(`#task${id}`).querySelector('#addApptask').value = ''
      let name = this.needDoList.filter(item => (item.id === id))
      
      if (name[0].apps){
      name[0].apps.push(this.appInput)

      }else{
        name[0].apps = [this.appInput]
      }
      console.log(1111111111111111,name[0].apps)

      let data = {
        id: id,
        name: name[0].name,
        user: {
          username: this.user,
        },
        apps: name[0].apps,
        is_completed: false,


      }
      data1 = JSON.stringify(data)

      // axios.post("https://todotaskmaster.space/api/create-task/", data1).then((response) => {
      //   console.log(response)
      // })
      axios.post("https://todotaskmaster.space/api/create-task/", data1).then((response) => {
        console.log(response)
      })

    },
    doCheck(index, type) {

      if (type === 'need') {

        let name = this.needDoList.filter(item => (item.id === index))
        console.log(index, type, name)
        let data = {
          id: index,
          name: name[0].name,
          user: {
            username: this.user,
          },
          apps: name[0].apps,
          is_completed: true,


        }
        data1 = JSON.stringify(data)
        if (type === 'need') {
          axios.post("https://todotaskmaster.space/api/create-task/", data1).then((response) => {
            console.log(response)
          })
        }
        this.needDoList = this.needDoList.filter(item => (item.id !== index))
        const completeMask = name[0]
        console.log(completeMask)
        this.completeList.push(completeMask);
      }
      else {
        const noCompleteMask = this.completeList.splice(index, 1);
        this.needDoList.push(...noCompleteMask);
      }
    },
    removeMask(index, type) {
      console.log(index, type)
      if (type === 'need') {
        axios.delete(`https://todotaskmaster.space/api/item/${index}/delete/`,).then((response) => {
          console.log(response)
        })

        this.needDoList = this.needDoList.filter(item => (item.id !== index))


      } else {
        axios.delete(`https://todotaskmaster.space/api/item/${index}/delete/`,).then((response) => {
          console.log(response)
        })
        this.completeList = this.completeList.filter(item => (item.id !== index))


      }
    },
    async getData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json(); // parses JSON response into native JavaScript objects
    },
    async postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

  }
}
).mount('#app');
