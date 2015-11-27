import web

urls = (
	'/', 'index'
)

class index:
	pass

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()