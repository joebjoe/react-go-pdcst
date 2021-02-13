NAME=golang-heroku

fmt:
	@goimports -w .

build:: fmt
	@docker build -t $(NAME) .

# deploying changes
run:
	docker run  --name $(NAME) -p 3000:8080 -d $(NAME)

#restarting current 
start:
	@docker start $(NAME)
	
stop:
	@docker stop $(NAME)
