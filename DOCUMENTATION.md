# Documentation

## Small diagram of routes

[<img src="https://i.ibb.co/wgMdR7k/api.png" width=450 style="display: block; margin: auto;"/>](https://i.ibb.co/wgMdR7k/api.png=100x200)

## **User-Routes**

> **Login**

- URL: &nbsp; `/users/login`
- Method: &nbsp; `POST`
- URL Params: &nbsp; `none`
- Success Response:
  - Code: `200`
  - Content: `{ "name": "berke", "token": "[JWT TOKEN]" }`
- Error Response 1:
  - Code: `404`
  - Content: `{ "error": "Invalid credentials." }`
- Error Response 2:
  - Code: `406`
  - Content: `{ "error": "Please provide both name and password." }`
- Sample call:

```js
axios.post('http://localhost:3000/users/login', {
	name: 'berke',
	password: 'pass',
});
```

> **Register**

- URL: &nbsp; `/users/register`
- Method: &nbsp; `POST`
- URL Params: &nbsp; `none`
- Success Response:
  - Code: `201`
  - Content: `{ "name": "berke", "token": "[JWT TOKEN]" }`
- Error Response 1:
  - Code: `404`
  - Content: `{ "error": "Invalid credentials" }`
- Error Response 2:
  - Code: `406`
  - Content: `{ "error": "Please provide both name and password." }`
- Sample call:

```js
axios.post('http://localhost:3000/user/register', {
	name: 'berke',
	password: 'pass',
});
```

> **Logout**

- URL: &nbsp; `/users/logout`
- Method: &nbsp; `POST`
- URL Params: &nbsp; `none`
- Headers: `Authorization: "Bearer [TOKEN]"`
- Success Response:
  - Code: `200`
  - Content: `{ "info": "Logged out." }`
- Error Response 1:
  - Code: `403`
  - Content: `{ "error": "Please authenticate." }`
- Error Response 2:
  - Code: `403`
  - Content: `{ "error": "Invalid or expired token." }`
- Sample call:

```js
axios.post(
	'http://localhost:3000/user/logout',
	{},
	{
		headers: { Authorization: `Bearer [TOKEN]` },
	}
);
```

---

## **Movie-Routes**

> **Movie Poster**

- URL: &nbsp; `/movies/:title`
- Method: &nbsp; `GET`
- URL Params: &nbsp; `:title`
- Success Response:
  - Code: `200`
  - Content: `{ "title": "Blade Runner", "poster": "[URL]" }`
- Error Response:
  - Code: `200`
  - Content: `{ "error": "Movie not found." }`
- Sample call:

```js
axios.get('http://localhost:3000/movies/blade+runner');
```

> **Favourite Movies**

- URL: &nbsp; `/movies/favourite`
- Method: &nbsp; `GET`
- URL Params: &nbsp; `none`
- Headers: `Authorization: "Bearer [TOKEN]"`
- Success Response:
  - Code: `200`
  - Content:
  ```json
  [
  	{
  		"title": "Blade Runner",
  		"posterUrl": "[URL]"
  	},
  	{
  		"title": "Avengers",
  		"posterUrl": "[URL]"
  	}
  ]
  ```
- Error Response:
  - Code: `403`
  - Content: `{ "error": "Please authenticate." }`
- Sample call:

```js
axios.get('http://localhost:3000/movies/blade+runner');
```

> **Add Favourite Movie**

- URL: &nbsp; `/movies/favourite`
- Method: &nbsp; `GET`
- URL Params: &nbsp; `none`
- Headers: `Authorization: "Bearer [TOKEN]"`
- Success Response:
  - Code: `201`
  - Content: `{ "info": "Movie [NAME] has been added" }`
- Error Response 1:
  - Code: `403`
  - Content: `{ "error": "Please authenticate." }`
- Error Response 2:
  - Code: `200`
  - Content: `{ "error": "Movie not found." }`
- Sample call:

```js
axios.post(
	'http://localhost:3000/movies/blade+runner',
	{
		title: 'Avengers',
	},
	{
		headers: { Authorization: `Bearer [TOKEN]` },
	}
);
```
