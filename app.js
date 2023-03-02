Vue.createApp({
  data() {
    return {
      valueInput: '',
      timerInput: '',
      needDoList: [],
      completeList: [],
      apps: ['Vs-code', "Telegram", "Google"],
    };
  },
  methods: {
    handleInput(event) {
      this.valueInput = event.target.value;
    },
    handleInput2(event) {
      this.timerInput = event.target.value;
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
      this.needDoList.push({
        title: this.valueInput,
        id: Math.random()
      });
      this.valueInput = '';
    },
    doCheck(index, type) {

      if (type === 'need') {
        const completeMask = this.needDoList.splice(index, 1);
        this.completeList.push(...completeMask);
      }
      else {
        const noCompleteMask = this.completeList.splice(index, 1);
        this.needDoList.push(...noCompleteMask);
      }
    },
    removeMask(index, type) {
      const toDoList = type === 'need' ? this.needDoList : this.completeList;
      toDoList.splice(index, 1);
    }
  }
}
).mount('#app');