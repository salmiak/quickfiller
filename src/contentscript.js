// TODO: Handle SELECT elements


(function(){

  // Maping Zepto (jQuery clone)
  var $z = Zepto, fs, allKeys;

  var addKey = function(key) {
    if(allKeys.indexOf(key)==-1){
      allKeys.push(key)
      fs.add(key)
      chrome.storage.sync.set({'__keys': allKeys }, function(){
        console.log('keyslist updated');
        console.log(allKeys);
      })
    }
  }

  chrome.storage.sync.get('__keys', function(data) {
    allKeys = data.__keys || []
    fs = FuzzySet(allKeys)

    // For all input fields of interest set up watcher and populate cookie data
    $z('input[type=text],input[type=input],input[type=email],input[type=number],input[type=tel],input[type=date],input[type=url],input:not([type]),select').forEach(function(el,i){

      var $this = $z(el)
      console.log($this);

      var elName = $this.attr('name')
      var elId = $this.attr('id')
      var nameKey, nameScore, idKey, idScore, key

      if(elName) {
        var results = fs.get(elName, minScore=.5)
        if (results.length) {
          nameKey = results[0][1]
          nameScore = results[0][0]
        }
      }
      if(elId) {
        var results = fs.get(elId, minScore=.5)
        if (results.length) {
          idKey = results[0][1]
          idScore = results[0][0]
        }
      }

      if (nameScore && idScore) {
        // Both id and name get results, use the one with best mach (prio name)
        key = nameScore >= idScore ? nameKey : idKey
      } else {
        key = nameKey || idKey || elName || elId
      }

      console.log('key is ' + key);

      $this.attr('style','background: #FFD; color: rgba(0,0,0,0.8);')

      // Populate storage data
      chrome.storage.sync.get( key, function(data) {
        var prevVal = data[key]
        if (prevVal) {
          console.log("setting " + key + " to " + prevVal);
          $this.val( prevVal )
          $this.attr('style','background: #FDF; color: rgba(0,0,0,0.8);')
        }
      });

      // Watch for blur-event and update storage if needed
      $this.on('blur', function(){
        chrome.storage.sync.get( key, function(data) {

          var prevVal = data[key]
          var currentVal = $this.val();
          var toStore = {}

          if (currentVal){

            if ( $this.attr('id') ) {
              addKey($this.attr('id'))
              toStore[$this.attr('id')] = currentVal
              console.log("Storing " + currentVal + " on " + $this.attr('id'));
            }

            if ( $this.attr('name') ) {
              addKey($this.attr('name'))
              toStore[$this.attr('name')] = currentVal
              console.log("Storing " + currentVal + " on " + $this.attr('name'));
            }

            chrome.storage.sync.set(toStore, function() {
              $this.attr('style','background: #DFF; color: rgba(0,0,0,0.8);')
            })

          }

        })
      })
    }) // Close for each on queried DOM elements
  }) // Close key lookup from store
})()
