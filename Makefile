build:
	docker build -t venom .

run:
	docker run -it -p 3000:3000 -v $(pwd)/session:/app/session venom
