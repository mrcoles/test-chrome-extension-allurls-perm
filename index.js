const PERMS = { origins: ["<all_urls>"] };

const main = () => {
  const reqResultElt = document.getElementById("req-result");
  const containsResultElt = document.getElementById("contains-result");

  const doRequest = () =>
    requestPermission(PERMS)
      .then(granted => {
        reqResultElt.innerText = granted;
      })
      .catch(err => {
        reqResultElt.innerText = `ERROR: ${err.message}`;
      });

  const doCheckContains = () =>
    containsPermission(PERMS)
      .then(contains => {
        containsResultElt.innerText = contains;
      })
      .catch(err => {
        containsResultElt.innerText = `ERROR: ${err.message}`;
      });

  document
    .getElementById("req")
    .addEventListener(
      "click",
      evt => doRequest().then(() => doCheckContains()),
      false
    );

  doCheckContains();
};

//

const requestPermission = perm => _asPromise(chrome.permissions.request, perm);
const containsPermission = perm =>
  _asPromise(chrome.permissions.contains, perm);

const _asPromise = (fn, arg) =>
  new Promise((resolve, reject) => {
    fn(arg, result => {
      const error = chrome.runtime.lastError;
      console.log("RESULT!!!??", result, error); //REMMMMMM
      return error ? reject(error) : resolve(result);
    });
  });

//

main();
