/* jshint esversion: 6 */

class Snegyok {

  constructor(entry, confs) {

    /** 
     * Public props
     */
    this.entry = entry;
    this.data = confs;
    this.template = confs.template;

    
    /** 
     * Private data and methods
     */
    var that = this;
    var entryEl = document.querySelector(this.entry);
    var view = this.template;


    function propsSubst() {
      const key = index => Object.keys(that.data)[index];
      for (let i = 0; i < Object.keys(that.data).length; i++) {
        view = view.replace(new RegExp('\\{\\*' + key(i) + '\\*\\}', 'g'), that.data[key(i)]);
      }
    }


    function forArray() {
      var allLoopArr = view.match(/\{\*for [\s\S]*?endfor\*\}/gm);
      if (allLoopArr === null) return;
      var splitArrays = [];
      allLoopArr = allLoopArr.map(i => i.replace(['{*endfor*}'], '').replace('{*for', ''));
      for (let i = 0; i < allLoopArr.length; i++) {
        var newArr = [];
        newArr.push(allLoopArr[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (let i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        var curHTML = splitArrays[i][0][1];
        var dataList = that.data[curList];
        var newHTML = '';
        for (let j = 0; j < (dataList ? dataList.length : null); j++) {
          var currentItemInList = dataList[j];
          newHTML += curHTML.replace('{*}', currentItemInList).replace('{$}', j + 1);
        }
        view = view.replace(
          new RegExp('\\{\\*for ' + curList + '[\\s\\S]*?endfor\\*\\}', 'g'), 
          newHTML
        );
      }
    }


    function forObj() {
      var splitArrays = [];
      var allLoopArr = view.match(/\{\*obj [\s\S]*?endobj\*\}/gm);
      if (allLoopArr === null) return;
      var  removeEnds = allLoopArr.map(i => {
        return i.replace(['{*endobj*}'], '').replace('{*obj', '');
      });
      for (let i = 0; i < removeEnds.length; i++) {
        var newArr = [];
        newArr.push(removeEnds[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (let i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        var curHTML = splitArrays[i][0][1];
        var dataList = that.data[curList];
        var newHTML = '';
        var pattern = new RegExp(
          '\\{\\*obj ' + curList + '[\\s\\S]*?endobj\\*\\}', 'g'
        );
        for (let j = 0; j < (dataList ? Object.keys(dataList).length : null); j++) {
          var currentItemInList = dataList[j];
          var val = dataList[Object.keys(dataList)[j]];
          var prop = Object.keys(dataList)[j];
          newHTML += curHTML
            .replace('{*val*}', val)
            .replace('{*prop*}', prop)
            .replace('{$}', j);
        }
        view = view.replace(pattern, newHTML);
      }
    }


    function ifElse() {
      var splitArrays = [];
      var allLoopArr = view.match(/\{\*if [\s\S]*?endif\*\}/gm);
      if (allLoopArr === null) return;
      allLoopArr = allLoopArr.map(i => {
        return i.replace('{*endif*}', '').replace('{*if', '');
      });
      for (let i = 0; i < allLoopArr.length; i++) {
        var newArr = [];
        newArr.push(allLoopArr[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (let i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        if (that.data[curList]) {
          var delThis = ['{*endif*}', '{*if ', '*}', curList];
          for (let i = 0; i < delThis.length; i++) {
            view = view.replace(delThis[i], '');
          }
        } else {
          view = view.replace(new RegExp('\\{\\*if ' + curList + '[\\s\\S]*?endif\\*\\}', 'g'), '');
        }
      }
    }


    function expression() {
      var operators = ['+', '-', '*', '%', '(', ')'];
      var splitArrays = [];
      var allLoopArr = view.match(/\{\:[\s\S]*?\:\}/gm);
      if (allLoopArr === null) return;
      var removeEnds = allLoopArr.map(i => {
        return i.replace(':}', '').replace('{:', '');
      });
      var firstArr = [];
      for (let i = 0; i < removeEnds.length; i++) {
        firstArr.push(removeEnds[i]);
        for (let j = 0; j < Object.keys(that.data).length; j++) {
          var val = Object.keys(that.data)[j];
          if (typeof that.data[val] === 'number' ) {
            removeEnds[i] = removeEnds[i].replace(val, that.data[val]);
          }
        }
        splitArrays.push([removeEnds[i].trim()]);
      }
      console.log(firstArr)
      for (let i = 0; i < firstArr.length; i++) {
        var fn = new Function('return ' + splitArrays[i][0])();
        var exp = splitArrays[i][0];
        for (let j = 0; j < operators.length; j++) {
          var newRegExp = new RegExp('\\' + operators[j], 'g');
          firstArr[i] = firstArr[i].replace(newRegExp, '\\' + operators[j]);
        }
        var pattern = new RegExp('\\{\\: ' + firstArr[i].trim() + ' \\:\\}', 'g');
        view = view.replace(pattern, fn);
      }
    }


    function comments() {  
      var pattern = new RegExp('\\{\\#[\\s\\S]*?\\#\\}', 'g');
      view = view.replace(pattern, '');
    }


    (() => {
      expression();
      comments();
      propsSubst();
      forArray();
      forObj();
      ifElse();
      entryEl.innerHTML = view;
    })();


  }
}