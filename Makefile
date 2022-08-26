start:
	docker-compose up -d --build
	make urls

stop:
	docker-compose stop
	sleep 0.4
	docker-compose down --remove-orphans

urls:
	echo Reachable from
	echo http://127.0.0.1:8000

cache-clear:
	docker exec apache php bin/console cache:clear