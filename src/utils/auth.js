class Auth {
	constructor(option) {
		this._baseURL = option.baseURL;
		this._headers = option.headers;
	}

	_checkResponse(res) {
		if (res.ok) return res.json();
		else return Promise.reject(`Ошибка: ${res.status}`);
	}

	// Регистрация
	signUp(email, password) {
		return fetch(this._baseURL+'/signup', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				"password": password,
				"email": email
			})
		})
				.then(res => {
					if (res.status === 400) return Promise.reject(`возможно неправильно введен email`);
					this._checkResponse(res)
				});
	}
  // Вход
	signIn(email, password) {
		return fetch(this._baseURL+'/signin', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				"password": password,
				"email": email
			})
		})
				.then(res => {
					if (res.status === 400) return Promise.reject(`Не передано одно из полей`)
					else if (res.status === 401) return Promise.reject(`email или пароль введены неверно!`)
					else return this._checkResponse(res);
				});
	}

	//Проверка токена
	checkToken(token)
	{
		return fetch(this._baseURL+'/users/me', {
			method: 'GET',
			headers: {
				"Content-Type": "application/json",
				"Authorization" : `Bearer ${token}`
			}
		})
				.then(res => this._checkResponse(res));
	}
}


// Создание Апи
export const auth = new Auth({
	baseURL: 'https://auth.nomoreparties.co',
	headers: {
		'Content-Type': 'application/json'
	}
});