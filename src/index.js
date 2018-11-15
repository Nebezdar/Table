var grid = document.getElementById("table");

    grid.onclick = function(e) {
      if (e.target.tagName != 'TH') return;

      // Если TH -- сортируем
      if (e.target.getAttribute('data-status') == "null") {
        e.target.setAttribute("data-status", "up")
      } else if (e.target.getAttribute('data-status') == "up") {
        e.target.setAttribute("data-status", "down")
      } else {
        e.target.setAttribute("data-status", "up")
      }
      sortGrid(e.target.cellIndex, e.target.getAttribute('data-type'), e.target.getAttribute('data-status'));
      
    };

    function sortGrid(colNum, type, sortStatus) {
      var tbody = grid.getElementsByTagName('tbody')[0];

      // Составить массив из TR
      var rowsArray = [].slice.call(tbody.rows);

      // определить функцию сравнения, в зависимости от типа
      var compare;

      switch (type) {

        case 'number':
          compare = function(rowA, rowB) {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
          };
          break;
        case 'string':
          compare = function(rowA, rowB) { 
            var str1 = rowA.cells[colNum].innerHTML; 
            var str2 = rowB.cells[colNum].innerHTML;
            if (rowB.cells[colNum].innerHTML != "Name" && 
                rowB.cells[colNum].innerHTML != "Possision"  && 
                rowB.cells[colNum].innerHTML != "Office" && 
                rowB.cells[colNum].innerHTML != "Start date") {
              return ('' + str1).localeCompare(str2);
            }
            return 0;
            
          };
          break;
        case 'salary':
          compare = function(rowA, rowB) 
          {
            var aNumber = rowA.cells[colNum].innerHTML;
              aNumber = aNumber.substr(1);
              aNumber = parseInt(aNumber);
            var bNumber = rowB.cells[colNum].innerHTML;
              bNumber = bNumber.substr(1);
              bNumber = parseInt(bNumber);
            return aNumber - bNumber;
          }
          break;
      }
      if (sortStatus == "up") {
        rowsArray.sort(compare);
      } else if (sortStatus == "down") {
        rowsArray.reverse(compare);
      }
      
      grid.removeChild(tbody);
        for (var i = 0; i < rowsArray.length; i++) 
      {
        tbody.appendChild(rowsArray[i]);
      }

      grid.appendChild(tbody);
    }

    