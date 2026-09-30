document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleBtn');
  const statusDiv = document.getElementById('status');

  // Get current state from storage
  chrome.storage.local.get(['rtlEnabled'], (result) => {
    const enabled = result.rtlEnabled || false;
    updateUI(enabled);
  });

  // Button click handler
  toggleBtn.addEventListener('click', () => {
    chrome.storage.local.get(['rtlEnabled'], (result) => {
      const current = result.rtlEnabled || false;
      const newState = !current;
      
      // Save new state
      chrome.storage.local.set({ rtlEnabled: newState }, () => {
        updateUI(newState);
        
        // Send message to content script of the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: 'toggleRTL',
              enabled: newState
            });
          }
        });
      });
    });
  });

  // Update button appearance and status text
  function updateUI(enabled) {
    toggleBtn.textContent = enabled ? 'Disable' : 'Enable';
    toggleBtn.className = enabled ? '' : 'off';
    statusDiv.textContent = `Status: ${enabled ? 'Enabled âœ…' : 'Disabled âŒ'}`;
  }
});