'use strict';

// ここに音楽のパスを追加
const sounds = [
  /*0*/ 'sound/小パンチ.mp3',
  /*1*/ 'sound/パンチ素振り.mp3',
  /*2*/ 'sound/opening.mp3',
  /*3*/ 'sound/click001.mp3',
  /*4*/ 'sound/gamestart.mp3',
  /*5*/ 'sound/cardclick.mp3',
  /*6*/ 'sound/cardget.mp3',
  /*7*/ 'sound/clear.mp3',
  /*8*/ 'sound/Battle.mp3'
];

// 背景画像のパスを追加
const backGroundPicture = [
  /*0*/'img/pipo-pic003a.jpg',  //タイトル
  /*1*/'img/pipo-battlebg001.jpg', //バトル 草原
  /*2*/'img/pipo-battlebg006.jpg', //バトル 山
  /*3*/'img/pipo-battlebg009.jpg', //バトル ダンジョン
  /*4*/'img/pipo-battlebg010.jpg', //バトル ラスボス
  /*5*/'img/pipo-pic003b.jpg' //エンディング
];

// キャラクター画像のパスを追加
const characterPictiure = [
  /*0*/ 'img/pipo-enemy041.png'
];

// エネミー画像のパスを追加
const enemyPictiure = [
  /*0*/ 'img/pipo-enemy041.png',
  /*1*/ 'img/pipo-enemy032.png',
  /*2*/ 'img/pipo-enemy026.png',
  /*3*/ 'img/pipo-boss004.png'
];

const WIDTH = 600;
const HEIGHT = 400;
const counterBer = document.querySelector('#counter');
const titleView = document.querySelector('#title');
const selectView = document.querySelector('#select');
const battleView = document.querySelector('#battle');
const endingView = document.querySelector('#ending');
const gameoverView = document.querySelector('#gameover');
const statusView = document.querySelector('#status');
const itemView = document.querySelector('#item');
const practiceView = document.querySelector('#practice');
const practice_B_View = document.querySelector('#practice_battle');
const consoleView = document.querySelector('#console');
const hintView = document.querySelector('#hint');

let flag = 0;
let lassbossFlag =0;
let gameoverFlag = false;
let questionNum = 0;
let clearCount = 0;
let flagPra = 0;
let practiceType = 0;

let defeatCount = 0;
let endingCount = 0;
let answerCount = 0;
let missCount = 0;
let gameoverCount = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Wepon {
  constructor(name, looks, atk) {
    this.name = name;
    this.looks = looks;
    this.atk = atk;
  }
}

const wepon1 = new Wepon('どうのつるぎ', undefined, 10);


class Character {
  constructor(looks,hp,atk,def,spe, wepon) {
    this.looks = looks;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spe = spe;
    this.wepon = wepon;
  }
}

const character = new Character(undefined , 100, 20, 20, 20, 1);


class Enemy {
  constructor(looks,hp,atk,def,spe) {
    this.looks = looks;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spe = spe;
  }
}
const eneLevel_1 = {
  //looks,hp,atk,def,spe
  0 : new Enemy(enemyPictiure[0], 100, 0, 10, 30),
  1 : new Enemy(enemyPictiure[1], 200, 10, 10, 46),
  2 : new Enemy(enemyPictiure[2], 300, 35, 10, 40)
}
const lastBoss = new Enemy(enemyPictiure[3], 500, 42, 40, 35);


class Counter {
  constructor() {
    document.querySelector('#defeat').innerText = defeatCount;
    document.querySelector('#correct').innerText = answerCount;
    // document.querySelector('#miss').innerText = missCount;
    document.querySelector('#clear').innerText = endingCount;
    document.querySelector('#down').innerText = gameoverCount;
  }
}

const anime = {
  ex: 'animate__animated',
  shake: 'animate__headShake',
  bounce: 'animate__bounce',
  flash: 'animate__flash',
  rubber: 'animate__rubberBand'
}

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////



class Practice {
  constructor() {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[3]);
    this.text = this._createText('れんしゅうモード', 'practice_title');
    this.menue = this._createMenue();
    this.backBtn = this._createBackBtn(practiceView);
    this.clickEvent = this._clickEvent(document.querySelector('.back_btn'));
    // this.goPractice = this._goPractice();
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 1;
    practice_B_View.style.zIndex = 0;
  }

  _clearElement() {
    while(selectView.firstChild) {
      selectView.removeChild(selectView.firstChild);
    }
    while(practiceView.firstChild) {
      practiceView.removeChild(practiceView.firstChild);
    }
    while(practice_B_View.firstChild) {
      practice_B_View.removeChild(practice_B_View.firstChild);
    }
    while(battleView.firstChild) {
      battleView.removeChild(battleView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
  }

  _createImg(img) {
    practiceView.style.backgroundImage = `url(${img})`;
  }

  _createText(text, id) {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    h1.id = id;
    h1.classList.add('badge', 'badge-warning');
    practiceView.appendChild(h1);
  }

  _createMenue() {
    const ul = document.createElement('ul');
    ul.id = 'practice_menue';
    practiceView.appendChild(ul);
    for (let i = 1; i < 10; i++) {
      const li = document.createElement('li');
      li.classList.add(`practice_${i}`, 'btn', 'btn-info');
      li.innerText = `${i}の段`;
      ul.appendChild(li);
    }
    const allBtn = document.createElement('span');
    allBtn.classList.add('btn', 'btn-danger');
    allBtn.id = 'allbtn';
    allBtn.innerText = '全チャレ';
    ul.appendChild(allBtn);
    ul.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn') != true) return;
      practiceType = e.target.className[9];
      flag = rand(1, 3);
      new PracticeBattle();
    });
  }

  _createBackBtn(view) {
    const backBtn = document.createElement('span');
    backBtn.classList.add('back_btn');
    backBtn.innerText = '🔙';
    view.appendChild(backBtn);
  }

  _clickEvent(btn) {
    btn.addEventListener('click', (e) => {
      new Control()._btnClick(btn, new Select(eneLevel_1));
    });
  }


}


class PracticeBattle {
  constructor() {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[3]);
    this.text = this._createText(`${practiceType}の段`, 'practice_title');
    this.enemy = this._displayEnemy(eneLevel_1);
    this.input = this._createInput();
    this.console = this._createConsole();
    this.practiceMission = this._createMisson();
    this.hintbtn = this._hintBtn();
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
    practice_B_View.style.zIndex = 1;
  }

  _clearElement() {
    while(practiceView.firstChild) {
      practiceView.removeChild(practiceView.firstChild);
    }
    while(practice_B_View.firstChild) {
      practice_B_View.removeChild(practice_B_View.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
  }

  _createImg(img) {
    practice_B_View.style.backgroundImage = `url(${img})`;
  }

  _createText(text, id) {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    if (practiceType == 'a') h1.innerText = '全チャレ';
    h1.id = id;
    h1.classList.add('badge', 'badge-warning');
    practice_B_View.appendChild(h1);
    this._hintMessage();
  }

  _displayEnemy(enemy) {
    flag = rand(1, 3);
    const tage = enemy[flag - 1];
    const img = document.createElement('img');
    img.src = tage.looks;
    practice_B_View.appendChild(img);
  }

  _createInput() {
    const input = document.createElement('input');
    input.type = 'tel';
    input.id = 'input_answer';
    input.setAttribute('maxlength', '2');
    practice_B_View.appendChild(input);
  }

  _createConsole() {
    const div = document.createElement('div');
    div.id = 'con_con';
    consoleView.appendChild(div);

    for (let i = 0; i < 10; i++) {
      const numBtn = document.createElement('li');
      numBtn.innerText = i;
      numBtn.classList.add('numbtn', 'btn', 'btn-primary');
      div.appendChild(numBtn);
    }

    const atkBtn = document.createElement('span');
    atkBtn.innerText = '攻撃';
    atkBtn.id = 'atkbtn';
    atkBtn.classList.add('btn', 'btn-danger');
    div.appendChild(atkBtn);

    const cureBtn = document.createElement('span');
    cureBtn.innerText = '回復';
    cureBtn.id = 'curebtn';
    cureBtn.classList.add('btn', 'btn-success');
    div.appendChild(cureBtn);

    const hintBtn = document.createElement('span');
    hintBtn.innerText = 'もどる';
    hintBtn.id = 'hintbtn';
    hintBtn.classList.add('btn', 'btn-info');
    div.appendChild(hintBtn);

  }

  _createMisson() {
    const questionsPra = []
    const answersPra = []
    if (practiceType == 'a') {
      for (let i = 1; i < 10; i++) {
        let x = rand(1, 9);
        let y = rand(1, 9);
        questionsPra.push(`${x} × ${y}`);
        answersPra.push(x * y);
      }
      this._displayMission(questionsPra, answersPra);
      console.log(questionsPra);
      console.log(answersPra);
      return;
    }
    for (let i = 1; i < 10; i++) {
      questionsPra.push(`${practiceType} × ${i}`);
      answersPra.push(practiceType * i);
    }
    this._displayMission(questionsPra, answersPra);
  }

  _displayMission(q, a) {
    const question = document.createElement('p');
    const questionAnder = document.createElement('span');
    question.id = 'question';
    questionAnder.id = 'question_ander';
    question.innerText = `${q[questionNum]} は？`;
    practice_B_View.appendChild(question);
    practice_B_View.appendChild(questionAnder);
    this._judgeKeybord(q, a);
    this._judgeConsole(q, a);
  }

  _judgeKeybord(q, a) {
    const input = document.querySelector('#input_answer');
    document.addEventListener('keydown', e => {
      if (e.keyCode == 13) {
        setTimeout(() => new Efect()._animation(input, 500, anime.shake), 100);
        const flying = document.createElement('span');
        flying.classList.add('flying');
        flying.innerText = input.value;
        practice_B_View.appendChild(flying);
        setTimeout(() => {
          flying.innerText = '';
          input.value = '';
          flying.remove()
        }, 150);

        if (input.value == a[questionNum]) {
          document.querySelector('#input_answer').value = '';
          new Efect()._animation(practice_B_View.querySelector('img'), 500, anime.shake);
          new Efect()._attackDamege(a[questionNum], practice_B_View, 1000);
          this._displayMath(q, a);
          questionNum++;
          answerCount++;
          new Counter();
          if (questionNum == 9) {
            document.querySelector('#question').innerText = 'がんばったね！';
            this._next(q, a);
            return;
          }
          document.querySelector('#question').innerText = `${q[questionNum]} は？`;
          } else {
          if (a[questionNum] == undefined) return;
          document.querySelector('#input_answer').value = '';
          console.log('bu-bu-');
        }
      }
    });
  }

  _judgeConsole(q, a) {
    const input = document.querySelector('#input_answer');
    document.querySelector('#con_con').addEventListener('click', (e) => {
      e.target.classList.add('active');
      setTimeout(() => e.target.classList.remove('active'),50);
      if (e.target.id == 'atkbtn') {
        new Efect()._animation(input, 500, anime.shake);
        const flying = document.createElement('span');
        flying.classList.add('flying');
        flying.innerText = input.value;
        practice_B_View.appendChild(flying);
        setTimeout(() => {
          flying.innerText = '';
          input.value = '';
          flying.remove()
        }, 150);

        if (input.value == a[questionNum]) {
          document.querySelector('#input_answer').value = '';
          setTimeout(() => new Efect()._animation(practice_B_View.querySelector('img'), 500, anime.shake), 100 );
          new Efect()._attackDamege(a[questionNum], practice_B_View, 1000);
          this._displayMath(q, a);
          questionNum++;
          answerCount++;
          new Counter();
          if (questionNum == 9) {
            document.querySelector('#question').innerText = 'がんばったね！';
            this._next(q, a);
            return;
          }
          document.querySelector('#question').innerText = `${q[questionNum]} は？`;
          } else {
          if (a[questionNum] == undefined) return;
          document.querySelector('#input_answer').value = '';
          console.log('bu-bu-');
        }
      }
      if (e.target.id == 'hintbtn') {
        if (input.value != '') input.value = '';
      }
      if (e.target.id == 'curebtn') {
        console.log('回復です');
      }

      if (input.value.length == 2) return;
      if (e.target.classList.contains('numbtn') == true)
      input.value += e.target.innerText;
    });
  }


    _next(q, a) {
      document.querySelector('#input_answer').remove();
      const btn = document.createElement('button');
      btn.innerText = "戻る";
      btn.id = 'input_answer';
      btn.classList.add('next_btn');
      practice_B_View.appendChild(btn);
      btn.addEventListener('click', () => {
        questionNum = 0;
        flag = 0;
        q.length = 0;
        a.length = 0;
        new Practice();
      });
    }

    _displayMath(q, a) {
      const math = document.createElement('span');
      math.classList.add('math_history');
      math.innerText = `${q[questionNum]} = ${a[questionNum]}`;
      new Efect()._animation(math, 1000, anime.flash);
      practice_B_View.appendChild(math);
    }

    _hintMessage() {
      const hintM = document.createElement('span');
      hintM.innerText = `1あたりの数が${practiceType}つ × それがいくつ分？ = 全体の数`;
      if (practiceType == 'a') hintM.innerText = `最後までがんばろう！９問正解できたらクリア！`;
      hintM.id = 'hint_message';
      practice_B_View.appendChild(hintM);
      const animes = () => {
        hintM.classList.add('animate__animated', anime.rubber);
          setTimeout(() => hintM.classList.remove('animate__animated', anime.rubber), 2000);
      }
      setInterval(animes, rand(8000, 15000));
    }

    _hintBtn() {
      const hintBtn = document.createElement('span');
      hintBtn.classList.add('hint_btn');
      hintBtn.classList.add('btn', 'btn-info')
      hintBtn.innerText = 'ヒント';
      practice_B_View.appendChild(hintBtn);
      hintBtn.addEventListener('click', (e) => {
        hintView.classList.add('opaUp');
        hintView.classList.remove('opaDown');
        hintView.addEventListener('click', (e) => {
          hintView.classList.remove('opaUp');
          hintView.classList.add('opaDown');
        });
      });
    }

}





class Title {
  constructor() {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[0]);
    this.title = this._createText('THE かけざんバトル', 'main_title');
    this.startBtn = this._createBtn('ゲームスタート！', 'start');
    this.statusBtn = this._createBtn('ステータス', 'status');
    this.itemBtn = this._createBtn('ごほうび', 'item');
  }

  _view() {
    titleView.style.zIndex = 1;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
  }

  _clearElement() {
    while(selectView.firstChild) {
      selectView.removeChild(selectView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
  }


  _createImg(img) {
    titleView.style.backgroundImage = `url(${img})`;
  }

  _createText(text, id) {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    h1.id = id;
    titleView.appendChild(h1);
  }

  _createBtn(text, id) {
    const btn = document.createElement('button');
    btn.innerText = text;
    btn.id = id;
    titleView.appendChild(btn);
    this._addEvent(btn);
  }

  _addEvent(btn) {
    btn.addEventListener('click', () => {
      new Select(eneLevel_1);
    });
  }
}



class Select {
  constructor(enemys) {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[1]);
    this.text = this._createText('だれと戦う？', 'select');
    this.enemyList = this._createEnemyList(enemys);
    this.practiceBtn = this._practiceBtn();
    this.backBtn = this._createBackBtn(selectView);
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 1;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
  }

  _clearElement() {
    while(practiceView.firstChild) {
      practiceView.removeChild(practiceView.firstChild);
    }
    while(titleView.firstChild) {
      titleView.removeChild(titleView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
    while(battleView.firstChild) {
      battleView.removeChild(battleView.firstChild);
    }
    if (clearCount == 0) return;
    while(selectView.firstChild) {
      selectView.removeChild(selectView.firstChild);
    }
  }

  _createImg(img) {
    const image = selectView.style.backgroundImage = `url(${img})`;
  }

  _createText(text, id) {
    const h1 = document.createElement('h1');
    h1.innerText = text;
    h1.id = id;
    selectView.appendChild(h1);
  }

  _createEnemyList(enemys) {
    // if (practiceFlag == true) return;
      Object.keys(enemys).forEach((i) => {
      const img = document.createElement('img');
      img.src = enemys[i].looks;
      img.classList.add(`enemy_${i}`, 'enemy');
      selectView.appendChild(img);
      this._selectEnemy(img);
    });
  }

  _selectEnemy(img) {
    img.addEventListener('click', (e) => {
      if (e.target.classList.contains('enemy_0')) flag = 1;
      if (e.target.classList.contains('enemy_1')) flag = 2;
      if (e.target.classList.contains('enemy_2')) flag = 3;
      if (flag !== 0) new Battle();
    });
  }

  _practiceBtn() {
    const btn = document.createElement('button');
    btn.id = 'practiceBtn';
    btn.innerText = 'れんしゅうモード';
    btn.classList.add('btn', 'btn-warning');
    selectView.appendChild(btn);
    btn.addEventListener('click', (e) => {
      e.target.classList.add('active');
      setTimeout(() => e.target.classList.remove('active'), 100);
      setTimeout(() => new Practice(), 200);
    });
  }

  _createBackBtn(view) {
    const backBtn = document.createElement('span');
    backBtn.classList.add('back_btn');
    backBtn.innerText = '🔙';
    view.appendChild(backBtn);
    this._clickEvent(document.querySelector('.back_btn'));
  }

  _clickEvent(btn) {
    btn.addEventListener('click', (e) => {
      new Control()._btnClick(btn, new Title());
    });
  }

}



class Battle {
  constructor() {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[2], backGroundPicture[4]);
    this.enemy = this._displayEnemy(eneLevel_1, lastBoss);
    this.character = this._createCharacter(character);
    this.hintbtn = this._hintBtn();
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 1;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
  }

  _clearElement() {
    while(practiceView.firstChild) {
      practiceView.removeChild(practiceView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
    // if (clearCount == 0) return;
    while(battleView.firstChild) {
      battleView.removeChild(battleView.firstChild);
    }
  }

  _createImg(img, img2) {
    battleView.style.backgroundImage = `url(${img})`;
    if (clearCount == 3) battleView.style.backgroundImage = `url(${img2})`;
  }

  _displayEnemy(enemy, lastboss) {
    if (clearCount == 3) {
      const tage = lastboss;
      const img = document.createElement('img');
      img.src = tage.looks;
      img.style.top = '21%';
      img.style.width = '130%';
      battleView.appendChild(img);
      this._createHpMater(tage);
      this._createInput();
      lassbossFlag = 1;
      this._createConsole();
      new Control()._createMisson(tage);
    }

    const tage = enemy[flag - 1];
    if (flag == 1) {
      const img = document.createElement('img');
      img.src = tage.looks;
      battleView.appendChild(img);
      this._createHpMater(tage);
      this._createInput();
      this._createConsole();
      new Control()._createMisson(tage);
    }
    if (flag == 2) {
      const img = document.createElement('img');
      img.src = tage.looks;
      battleView.appendChild(img);
      this._createHpMater(tage);
      this._createInput();
      this._createConsole();
      new Control()._createMisson(tage);
    }
    if (flag == 3) {
      const img = document.createElement('img');
      img.src = tage.looks;
      battleView.appendChild(img);
      this._createHpMater(tage);
      this._createInput();
      this._createConsole();
      new Control()._createMisson(tage);
    }
  }

  _createHpMater(tage) {
    const hpMater = document.createElement('progress');
    hpMater.id = 'hp_mater';
    hpMater.value = tage.hp;
    hpMater.max = tage.hp;
    hpMater.style.width = '100px';
    battleView.appendChild(hpMater);
  }

  _createInput() {
    const input = document.createElement('input');
    input.type = 'tel';
    input.id = 'input_answer';
    input.setAttribute('maxlength', '2');
    battleView.appendChild(input);
    if (lassbossFlag == 1) {
      input.style.top = '70%';
    }
  }

  _createCharacter(chara) {
    const hpMater = document.createElement('progress');
    hpMater.id = 'myhp_mater';
    hpMater.value = chara.hp;
    hpMater.max = chara.hp;
    hpMater.style.width = `${hpMater.value * 3}px`;
    battleView.appendChild(hpMater);
  }

  _createConsole() {
    const div = document.createElement('div');
    div.id = 'con_con';
    consoleView.appendChild(div);

    for (let i = 0; i < 10; i++) {
      const numBtn = document.createElement('li');
      numBtn.innerText = i;
      numBtn.classList.add('numbtn', 'btn', 'btn-primary');
      div.appendChild(numBtn);
    }

    const atkBtn = document.createElement('span');
    atkBtn.innerText = '攻撃';
    atkBtn.id = 'atkbtn';
    atkBtn.classList.add('btn', 'btn-danger');
    div.appendChild(atkBtn);

    const cureBtn = document.createElement('span');
    cureBtn.innerText = '回復';
    cureBtn.id = 'curebtn';
    cureBtn.classList.add('btn', 'btn-success');
    div.appendChild(cureBtn);

    const hintBtn = document.createElement('span');
    hintBtn.innerText = 'もどる';
    hintBtn.id = 'hintbtn';
    hintBtn.classList.add('btn', 'btn-info');
    div.appendChild(hintBtn);

  }

  _hintBtn() {
    const hintBtn = document.createElement('span');
    hintBtn.classList.add('hint_btn');
    hintBtn.classList.add('btn', 'btn-info')
    hintBtn.innerText = 'ヒント';
    battleView.appendChild(hintBtn);
    const ul = document.createElement('ul');
    ul.id = 'math_his_container';
    battleView.appendChild(ul);
    hintBtn.addEventListener('click', (e) => {
      hintView.classList.add('opaUp');
      hintView.classList.remove('opaDown');
      hintView.addEventListener('click', (e) => {
        hintView.classList.remove('opaUp');
        hintView.classList.add('opaDown');
      });
    });
  }


}


class Control {
  constructor(tage) {

  }

  _createMisson(tage) {
    const questions = [];
    const answers = [];
    for (let i = 0; i < 500; i++) {
      let x = rand(1, 9);
      let y = rand(1, 9);
      questions.push(`${x} × ${y}`);
      answers.push(x * y);
    }
    this._count(50 - tage.spe, tage);
    this._displayMission(questions, answers, tage);
    this._judgeKeybord(questions, answers, tage);
    this._judgeConsole(questions, answers, tage);
  }

  _displayMission(q, a, tage) {
    const question = document.createElement('p');
    const questionAnder = document.createElement('span');
    question.id = 'question';
    questionAnder.id = 'question_ander';
    question.innerText = `${q[questionNum]} は？`;
    this._coution(question, questionAnder, tage);
    battleView.appendChild(question);
    battleView.appendChild(questionAnder);
  }

  _coution(question, questionAnder, tage) {
    const tageSpeed = 50 - tage.spe;
    question.style.animation = `coution ${tageSpeed}s infinite`;
    questionAnder.style.animation = `coution_border ${tageSpeed}s infinite`;
  }

  _count(tageSpeed, tage) {
    const hp = document.querySelector('#hp_mater');
    const tagespe = () => {
      if (hp.value <= 0) {
        clearInterval(id);
        document.querySelector('#question').removeAttribute('style');
        document.querySelector('#question_ander').removeAttribute('style');
        return;
      }
      tageSpeed--;
      if (tageSpeed == 0 && hp.value > 0) {
        this._attack(tage, id);
        clearInterval(id);
      }
    }
    const id = setInterval(tagespe, 1000);
  }

  _attack(tage, id) {
    const charaHp = document.querySelector('#myhp_mater');
    const hpFlame = document.querySelector('#battle');
    new Efect()._attackMotion();
    new Efect()._damageDisplay(tage, 1000);
    charaHp.value = charaHp.value - tage.atk;
    if (lassbossFlag == 1) new Efect()._animation(consoleView, 500, anime.shake);
    new Efect()._animation(charaHp, 500, anime.shake);
    if (charaHp.value <= 0) {
      document.querySelector('#question').removeAttribute('style');
      document.querySelector('#question_ander').removeAttribute('style');
      clearInterval(id);
      battleView.classList.add('black_out');
      const p = document.createElement('p');
      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      setTimeout(() => {
        charaHp.style.opacity = 0;
        document.querySelector('#hp_mater').style.opacity = 0;
        battleView.firstElementChild.style.opacity = 0;
        gameoverView.style.zIndex = 2;
        p.id = 'game_over';
        p1.id = 'continue';
        p2.id = 'reset';
        p.innerText = 'GAMEOVER';
        p1.innerText = 'つづきからがんばる';
        p2.innerText = 'あきらめる';
        gameoverView.appendChild(p);
        gameoverView.appendChild(p1);
        gameoverView.appendChild(p2);
      },1000);
      p1.addEventListener('click', () => {
        if (clearCount != 0) clearCount--;
        gameoverCount++;
        new Counter();
        charaHp.value = charaHp.max;
        charaHp.style.borderColor = 'blue';
        hpFlame.style.borderBottomColor = 'blue';
        p.remove();
        p1.remove();
        p2.remove();
        gameoverView.style.zIndex = 0;
        battleView.classList.remove('black_out');
        charaHp.style.opacity = 1;
        document.querySelector('#hp_mater').style.opacity = 1;
        battleView.firstElementChild.style.opacity = 1;
        document.querySelector('#question').style.animation = `coution ${50 - tage.spe}s infinite`;
        document.querySelector('#question_ander').style.animation = `coution_border ${50 - tage.spe}s infinite`;
        this._count(50 - tage.spe, tage);
        return;
      });
      p2.addEventListener('click', () => {
        new Gameover();
      });
      return;
    }
    if (charaHp.value <= 20) {
      charaHp.style.borderColor = 'red';
      hpFlame.style.borderBottomColor = 'red';
    }
    if (charaHp.value <= 50 && charaHp.value >= 20) {
      charaHp.style.borderColor = 'yellow';
      hpFlame.style.borderBottomColor = 'yellow';
    }
    this._count(50 - tage.spe, tage);
  }


  _judgeKeybord(q, a, tage) {
    const input = document.querySelector('#input_answer');
    document.addEventListener('keydown', e => {
      if (e.keyCode == 13) {
        setTimeout(() => new Efect()._animation(input, 500, anime.shake), 100);
        const flying = document.createElement('span');
        flying.classList.add('flying');
        flying.innerText = input.value;
        battleView.appendChild(flying);
        setTimeout(() => {
          flying.innerText = '';
          input.value = '';
          flying.remove()
        }, 150);

        if (input.value == a[questionNum]) {
          document.querySelector('#input_answer').value = '';
          const hp = document.querySelector('#hp_mater');
          new Efect()._animation(battleView.firstElementChild, 500, anime.shake);
          new Efect()._attackDamege(a[questionNum], battleView, 1000);
          hp.value -= a[questionNum];
          this._displayMath(q, a);
          questionNum++;
          answerCount++;
          new Counter();
          document.querySelector('#question').innerText = `${q[questionNum]} は？`;

          if (hp.value <= 0) {
            battleView.firstElementChild.classList.add('scale_down');
            document.querySelector('#question').innerText = 'まいりました~';
            defeatCount++;
            new Counter();
            this._next(q, a);
          }
        } else {
          if (a[questionNum] == undefined) return;
          document.querySelector('#input_answer').value = '';
          console.log('bu-bu-');
        }
      }
    });
  }

  _judgeConsole(q, a, tage) {
    const input = document.querySelector('#input_answer');
    document.querySelector('#con_con').addEventListener('click', (e) => {
      e.target.classList.add('active');
      setTimeout(() => e.target.classList.remove('active'),50);
      if (e.target.id == 'atkbtn') {
        new Efect()._animation(input, 500, anime.shake);
        const flying = document.createElement('span');
        flying.classList.add('flying');
        flying.innerText = input.value;
        battleView.appendChild(flying);
        setTimeout(() => {
          flying.innerText = '';
          input.value = '';
          flying.remove()
        }, 150);

        if (input.value == a[questionNum]) {
          document.querySelector('#input_answer').value = '';
          const hp = document.querySelector('#hp_mater');
          setTimeout(() => new Efect()._animation(battleView.firstElementChild, 500, anime.shake), 100 );
          new Efect()._attackDamege(a[questionNum], battleView, 1000);
          hp.value -= a[questionNum];
          this._displayMath(q, a);
          questionNum++;
          answerCount++;
          new Counter();
          document.querySelector('#question').innerText = `${q[questionNum]} は？`;

          if (hp.value <= 0) {
            battleView.firstElementChild.classList.add('scale_down');
            document.querySelector('#question').innerText = 'まいりました~';
            defeatCount++;
            new Counter();
            this._next(q, a);
          }
        } else {
          if (a[questionNum] == undefined) return;
          document.querySelector('#input_answer').value = '';
          console.log('bu-bu-');
        }
      }
      if (e.target.id == 'hintbtn') {
        if (input.value != '') input.value = '';
      }
      if (e.target.id == 'curebtn') {
        console.log('回復です');
      }

      if (input.value.length == 2) return;
      if (e.target.classList.contains('numbtn') == true)
      input.value += e.target.innerText;
    });
  }

  _next(q, a) {
    document.querySelector('#input_answer').remove();
    const btn = document.createElement('button');
    const charaHp = document.querySelector('#myhp_mater');
    const hpFlame = document.querySelector('#battle');
    btn.innerText = "次へ";
    btn.id = 'input_answer';
    btn.classList.add('next_btn');
    battleView.appendChild(btn);
    btn.addEventListener('click', () => {
      charaHp.style.borderColor = 'blue';
      hpFlame.style.borderBottomColor = 'blue';
      questionNum = 0;
      flag = 0;
      clearCount++;
      q.length = 0;
      a.length = 0;
      if (lassbossFlag == 1) {
        new Ending();
        return;
      }
      if (clearCount == 3) {
        new Battle();
        return;
      }
      new Select(eneLevel_1);
    });
  }

  _displayMath(q, a) {
    const math = document.createElement('span');
    math.classList.add('math_history_battle');
    math.innerText = `${q[questionNum]} = ${a[questionNum]}\n`;
    new Efect()._animation(math, 1000, anime.flash);
    document.querySelector('#math_his_container').appendChild(math);
  }

  _btnClick(btn, where) {
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 100);
      setTimeout(() => where, 200);
  }


}


class Ending {
  constructor() {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[5]);
    this.message = this._createMessage();
    this._addEvent();
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 1;
    gameoverView.style.zIndex = 0;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
  }

  _createImg(img) {
    endingView.style.backgroundImage = `url(${img})`;
  }

  _createMessage() {
    const img = document.createElement('img');
    img.src = `img/img/cat00${rand(1,9)}.jpg`;
    const p = document.createElement('p');
    p.innerText = 'こうしてあなたの頭は少しよくなった...';
    endingView.appendChild(img);
    endingView.appendChild(p);
  }

  _addEvent() {
    endingView.addEventListener('click', (e) => {
      console.log('titleへ...');
      lassbossFlag = 0;
      clearCount = 0;
      endingCount++;
      new Counter();
      this._clearElement();
      new Title();
    });
  }

  _clearElement() {
    while(titleView.firstChild) {
      titleView.removeChild(titleView.firstChild);
    }
    while(selectView.firstChild) {
      selectView.removeChild(selectView.firstChild);
    }
    while(battleView.firstChild) {
      battleView.removeChild(battleView.firstChild);
    }
    while(endingView.firstChild) {
      endingView.removeChild(endingView.firstChild);
    }
    while(gameoverView.firstChild) {
      gameoverView.removeChild(gameoverView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
  }

}

class Gameover {
  constructor(p1, p2) {
    this.view = this._view();
    this.clearElement = this._clearElement();
    this.background = this._createImg(backGroundPicture[5]);
    this.message = this._createMessage(p1, p2);
  }

  _view() {
    titleView.style.zIndex = 0;
    selectView.style.zIndex = 0;
    battleView.style.zIndex = 0;
    endingView.style.zIndex = 0;
    gameoverView.style.zIndex = 1;
    statusView.style.zIndex = 0;
    itemView.style.zIndex = 0;
    practiceView.style.zIndex = 0;
  }

  _createImg(img) {
    gameoverView.style.backgroundImage = `url(${img})`;
  }

  _createMessage() {
    const img = document.createElement('img');
    img.src = `img/img/cat00${rand(1,9)}.jpg`;
    const a = document.createElement('a');
    a.href = '';
    a.innerText = 'もっと勉強しなくちゃね...';
    gameoverView.appendChild(img);
    gameoverView.appendChild(a);
  }

  _clearElement() {
    while(titleView.firstChild) {
      titleView.removeChild(titleView.firstChild);
    }
    while(selectView.firstChild) {
      selectView.removeChild(selectView.firstChild);
    }
    while(battleView.firstChild) {
      battleView.removeChild(battleView.firstChild);
    }
    while(endingView.firstChild) {
      endingView.removeChild(endingView.firstChild);
    }
    while(gameoverView.firstChild) {
      gameoverView.removeChild(gameoverView.firstChild);
    }
    while(consoleView.firstChild) {
      consoleView.removeChild(consoleView.firstChild);
    }
  }

}

class Efect {
  constructor(tage) {

  }

  _damageDisplay(tage, time) {
    const damege = document.createElement('span');
    damege.id = 'ene_damage';
    damege.innerText = tage.atk;
    battleView.appendChild(damege);
    damege.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
      damege.classList.remove('animate__animated', 'animate__bounce');
      damege.remove();
    }, time);
  }

  _attackDamege(answer, where, time) {
    const damege = document.createElement('span');
    damege.id = 'attack_damage';
    damege.innerText = answer;
    where.appendChild(damege);
    damege.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
      damege.classList.remove('animate__animated', 'animate__bounce');
      damege.remove();
    }, time);
  }

  _attackMotion() {
    const img = battleView.firstElementChild;
    img.style.top = '40%';
    if (lassbossFlag == 1) {
      setTimeout(() => img.style.top = '21%', 300);
      return;
    }
    setTimeout(() => img.style.top = '32%', 300);
  }

  _animation(ele, time, animation) {
    ele.classList.add('animate__animated', animation);
    setTimeout(() => ele.classList.remove('animate__animated', animation), time);
  }

}


new Title();
