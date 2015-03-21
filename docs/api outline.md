#/User
	post:/
		email
		password
		username
		return:/
			uid: string (hash)
			authToken: string
			username: string


	post:/:id
		email
		password
		username
		return:/
			uid: string (hash)
			authToken: string
			username: string

	get:/auth
		username or email: string
		password: string
		return:/
			authtoken: string
			user: user (object)

	get:/:id
		authtoken: string
		return:/
			email
			username
			uid

	get:/:id/rooms
		authtoken: string
		return:/
			rooms: array [room objects]


	delete:/:id
		authtoken: string
		return:/
			http code (200, 500, 400, etc...)


#/Room
	post:/
		author: string(uid)
		Title: string
		content: string (url)
		lat(float)
		lng(float)
		radius(int)
		return:/
			room: room object

	post:/:id
		authtoken: str
		title: str
		radius: int
		return/
			get:/:id

	post:/join/:id
		authtoken: str
		lat: float
		lng: float
		return:/
			room: room (object)

	post:/archive/:id
		authtoken: str
		return:/
			http code

	get:/discover
		lat: float
		lng: float
		limit: int
		return:
			rooms: [Room room]
	get:/:id
		authtoken: string
			or
		lat: float
		lng: float
		return:
			rid(string hash)
			title: string
			author(user object)
			content: string
			date: datetime
			lat: float
			lng: float
			radius: int
			members: int
			newComments: int
			contentType: int
			member: bool

	get:/:id/members
		authtoken: string
		return:/
			members: [User Objects]

	get:/:id/comments
		authtoken: str
			or
		lat: float
		long: float
		limit: int
		before: datetime
		after: datetime
		return:/
			comments: [compactComments (Just cid, rid, author: User (object), date, comment)]



#/Comment
	get:/:id
		authtoken: string
		return:/
			cid: string
			room: room (object)
			author: user (object)
			date: datetime
			comment: string

	post:/
		authtoken: str
		content: str
		rid: int
		return:
			comment: comment (object)


#Envelope
	{
		meta:{
			status:
			error:
		},
		data:{
			response data
		}
	}
