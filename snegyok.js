this.Snegyok = (function() {

  return function(entry, confs) {
    var self = this;

    /** 
     * Public props
     */
    this.entry = entry;
    this.data = confs;
    this.template = confs.template;

    
    /** 
     * Private data and methods
     */
    var startHTML = this.template;


    var  entry = document.querySelector(this.entry);
    var view = this.template;
    var dataArray = Object.keys(this.data);


    // Props substitution
    function propsSubst() {
      function key(index) {
        return Object.keys(self.data)[index];
      }
      for (var i = 0; i < dataArray.length; i++) {
        var pattern = new RegExp('\\{\\*' + key(i) + '\\*\\}', 'g');
        if (typeof view === 'undefined') {
          throw new Error('prop "template" of current component doesn\'t exist or is empty');
        }
        view = view.replace(pattern, self.data[key(i)]);
      }
    }


    // Loop for arrays
    function forArray() {
      var  splitArrays = [];
      var  allLoopArr = view.match(/\{\*for [\s\S]*?endfor\*\}/gm);
      if (allLoopArr === null) return;
      var  removeEnds = allLoopArr.map(function(i) {
        return i.replace(['{*endfor*}'], '').replace('{*for', '');
      });
      for (var i = 0; i < removeEnds.length; i++) {
        var newArr = [];
        newArr.push(removeEnds[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (var i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        var curHTML = splitArrays[i][0][1];
        var dataList = self.data[curList];
        var newHTML = '';
        var pattern = new RegExp(
          '\\{\\*for ' + curList + '[\\s\\S]*?endfor\\*\\}', 'g'
        );
        for (var j = 0; j < (dataList ? dataList.length : null); j++) {
          var currentItemInList = dataList[j];
          newHTML += curHTML
            .replace('{*}', currentItemInList)
            .replace('{$}', j + 1);
        }
        view = view.replace(pattern, newHTML);
      }
    };


    // Loop for objects
    function forObj() {
      var splitArrays = [];
      var allLoopArr = view.match(/\{\*obj [\s\S]*?endobj\*\}/gm);
      if (allLoopArr === null) return;
      var  removeEnds = allLoopArr.map(function(i) {
        return i.replace(['{*endobj*}'], '').replace('{*obj', '');
      });
      for (var i = 0; i < removeEnds.length; i++) {
        var newArr = [];
        newArr.push(removeEnds[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (var i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        var curHTML = splitArrays[i][0][1];
        var dataList = self.data[curList];
        var newHTML = '';
        var pattern = new RegExp(
          '\\{\\*obj ' + curList + '[\\s\\S]*?endobj\\*\\}', 'g'
        );
        for (var j = 0; j < (dataList ? Object.keys(dataList).length : null); j++) {
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


    // If else
    function ifElse() {
      var splitArrays = [];
      var allLoopArr = view.match(/\{\*if [\s\S]*?endif\*\}/gm);
      if (allLoopArr === null) return;
      var removeEnds = allLoopArr.map(function(i) {
        return i.replace('{*endif*}', '').replace('{*if', '');
      });
      for (var i = 0; i < removeEnds.length; i++) {
        var newArr = [];
        newArr.push(removeEnds[i].trim().split(/\*\}$/gm));
        splitArrays.push(newArr);
      }
      for (var i = 0; i < splitArrays.length; i++) {
        var curList = splitArrays[i][0][0].replace(/\s*/g,'');
        var dataList = self.data[curList];
        if (dataList) {
          var delThis = ['{*endif*}', '{*if ', '*}', curList];
          for (var i = 0; i < delThis.length; i++) {
            view = view.replace(delThis[i], '');
          }
        } else {
          var pattern = new RegExp(
            '\\{\\*if ' + curList + '[\\s\\S]*?endif\\*\\}', 'g'
          );
          view = view.replace(pattern, '');
        }
      }
    }


    // Expression
    function expression() {
      var operators = ['+', '-', '*', '%', '(', ')']
      var splitArrays = [];
      var allLoopArr = view.match(/\{\:[\s\S]*?\:\}/gm);
      if (allLoopArr === null) return;
      var  removeEnds = allLoopArr.map(function(i) {
        return i.replace(':}', '').replace('{:', '');
      });
      var firstArr = [];
      for (var i = 0; i < removeEnds.length; i++) {
        var newArr = [];
        firstArr.push(removeEnds[i]);
        for (var j = 0; j < Object.keys(self.data).length; j++) {
          var val = Object.keys(self.data)[j];
          if (typeof self.data[val] === 'number' ) {
            removeEnds[i] = removeEnds[i].replace(val, self.data[val]);
          }
        }
        newArr.push(removeEnds[i].trim());
        splitArrays.push(newArr);
      }
      for (var i = 0; i < firstArr.length; i++) {
        var fn = new Function('return ' + splitArrays[i][0])();
        var exp = splitArrays[i][0];
        var cur = firstArr[i];
        for (var j = 0; j < operators.length; j++) {
          var newRegExp = new RegExp('\\' + operators[j], 'g');
          cur = cur.replace(newRegExp, '\\' + operators[j]);
        }
        var pattern = new RegExp('\\{\\: ' + cur.trim() + ' \\:\\}', 'g');
        view = view.replace(pattern, fn);
      }
    }


    // Comments
    function comments() {  
      var pattern = new RegExp('\\{\\#[\\s\\S]*?\\#\\}', 'g');
      view = view.replace(pattern, '');
    }

    this.update = function(state, onWhat) {
      state = onWhat;
      this.render();
    };


    // For instance
    this.render = function() {
      expression();
      comments();
      propsSubst();
      forArray();
      forObj();
      ifElse();
      entry.innerHTML = view;
    };


    this.render();


  }
}());