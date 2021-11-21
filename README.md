Development Notes:

Before pushing to production locally run the docker-compose file, push the rebuilt images and in the production enviroment, run docker-compose prod file

Change Intents:

files in api/public and in the database intents table

## For backing up the database in EC2

```
docker exec -it postgres pg_dump -U postgres humaine > humaine_backup_16062021.sql
```

## For initializing the database in RDS(password: abc12345)

```
psql ^
   -f humaine_backup_16062021.sql ^
   --host humaine.ckquecorw64p.us-east-2.rds.amazonaws.com ^
   --port 5432 ^
   --dbname humaine ^
   --username postgres

```

## For prepoulating the database in docker

```
docker exec -i postgres psql -U postgres -v -d humaine < ./API/config/humaine_backup_latest.sql

docker exec -it postgres psql -U postgres -v -d humaine
```

## For running in development

```
docker-compose -f docker-compose.dev.yml up

```

## For backing up databases in the laptop

```
pg_dump -U postgres humaine > C:\Users\saivi\OneDrive\Desktop\humaine_backup_<timestamp>.sql
```

## For changing all the values in the intents file to 0 for putting in the database

```
x={put intent.json here}

Object.keys(x).forEach(function(key){ x[key] = 0 });

<!-- Now type x and right click on it and choose copy object -->

```

# After making the action be on branch stage, I figured out that there are two methods to go ahead with

## First Method

1. make a github action in the stage branch and deploy stage branch everytime a commit is done

## Second Method

2. make 2 different github actions in frontend and backend_v3 which on commit build and push a docker image to docker hub or to ECR, but this requires changing the docker compose file in stage to tell it pull the images and run the images instead of remaking them in production.

The scond method would make the stage branch only a docker-compose file and scripts folder and a few other folders

## QUICK Commands

```
docker volume ls
docker volume rm <option>
```
