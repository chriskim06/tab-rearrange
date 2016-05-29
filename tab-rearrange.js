/**
 * Moves the selected tab left or right ignoring pinned tabs.
 * The movement also wraps around in either direction.
 */
chrome.commands.onCommand.addListener(function(command) {
  var queryInfo = {
    currentWindow: true,
    windowType: "normal"
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    if (tabs.length > 1) {
      var selectedTab = Array.prototype.find.call(tabs, function(value) {
        return value.highlighted;
      });

      if (!selectedTab.pinned) {
        var pinnedTabs = Array.prototype.filter.call(tabs, function(value) {
          return value.pinned;
        });

        if (command === 'move-tab-left') {
          var left = selectedTab.index - 1;
          chrome.tabs.move(selectedTab.id, {
            index: (left < pinnedTabs.length) ? -1 : left
          });
        } else if (command === 'move-tab-right') {
          var right = selectedTab.index + 1;
          chrome.tabs.move(selectedTab.id, {
            index: (right >= tabs.length) ? pinnedTabs.length : right
          });
        }
      }
    }
  });
});

