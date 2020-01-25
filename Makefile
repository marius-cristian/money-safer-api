start-postgres:
	docker run --rm   --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $(HOME)/docker/volumes/postgres:/var/lib/postgresql/data  postgres

stop-postgres:
	docker stop pg-docker

connect-postgres:
	psql -h localhost -U postgres -d postgres --password