import config from '../config'
const urlPrefix = config.domain;

function filterStatus(res) {
	if (res.status >= 200 && res.status < 300) {
		return res
	}
	else {
		let error = new Error(res.statusText);
		error.res = res;
		error.type = 'http';
		throw error;
	}
}

function filterJSON(res) {
	return res.json();
}

export function get(url , params){
  url = urlPrefix + url;
  if(params){
    url += `?${params}`
  }

  if(__DEV__){
    console.info(`GET:` , url )
    console.info(`params:` , params )
  }

  return fetch(url).then(filterStatus).then(filterJSON)
}

export function post(url, body) {
	url = urlPrefix + url;

	if (__DEV__) {
		console.info(`POST: `, url);
		console.info(`Body: `, body)
	}

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}
