# Chrome Extension <all_urls> Permission Bug

This demos an issue with the `chrome.permissions.request` and `chrome.permissions.contains` functions when used with `{ origins: ['<all_urls>'] }`. In packed extensions, the contains call always yields `false` even after making a successful request that yields `true`. This does, however, work in unpacked extensions...

Pack this extension locally and then add it to chrome://extensions to test it out. Alternatively, load it as an unpacked extension to see it work fine in that environment.

Test on:

- Mac OSX 10.13.6
- Chrome 73.0.3683.86
