const PERMS = { origins: ["<all_urls>"] };

const reqResultElt = document.getElementById("req-result");
const containsResultElt = document.getElementById("contains-result");

const main = () => {
  const doRequest = () =>
    Promise.resolve()
      .then(() => getRequestPerms())
      .then(perms => chromePermissionsRequest(perms))
      .then(granted => {
        reqResultElt.innerText = granted;
      })
      .catch(err => {
        reqResultElt.innerText = `ERROR: ${err.message}`;
      });

  const doCheckContains = () =>
    Promise.resolve()
      .then(() => getContainsPerms())
      .then(perms => chromePermissionsContains(perms))
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

  getRequestPerms();
  doCheckContains();
};

const getRequestPerms = () => _getPerms("perm-req-json", "req-result-perms");
const getContainsPerms = () =>
  _getPerms("perm-contains-json", "con-result-perms");

const _getPerms = (sourceEltId, exEltId) => {
  let text = document.getElementById(sourceEltId).value.trim();
  let data;
  let error;
  try {
    data = JSON.parse(text);
  } catch (e) {
    error = e;
    text = "invalid_json";
  }
  document.getElementById(exEltId).innerText = text;
  if (error) {
    throw error;
  }
  return data;
};

//

const chromePermissionsRequest = perm =>
  _asPromise(chrome.permissions.request, perm);
const chromePermissionsContains = perm =>
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
