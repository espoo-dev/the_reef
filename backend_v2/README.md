[![CI](https://github.com/espoo-dev/rails_boilerplate/actions/workflows/ci.yml/badge.svg)](https://github.com/espoo-dev/rails_boilerplate/actions/workflows/ci.yml)

## Requirements
- Docker
- Docker-compose

## Getting Started
- cd backend
- create a .env file based on .env.example and copy the content of .env.example to .env (`$ cp .env.example .env`)
- docker compose build
- docker compose run web bundle install
- docker compose run web bin/rails db:setup
- bin/dev
- visit http://localhost:3000/

## Graphql
- visit http://localhost:3000/graphiql

## Run tests
- docker compose exec web bundle exec bin/rspec -P ./*/**/*_spec.rb (-P ./*/**/*_spec.rb is needed to run specs from packs)
- open coverage/index.html (Check coverage report)

## Check lint
- docker compose exec web bundle exec bin/lint

## Check Security Vulnerabilities
- docker compose exec web bundle exec bin/scan

## API Doc Swagger
- http://localhost:3000/api-docs/index.html

## Sidekiq

- http://localhost:3000/sidekiq/

Observation: Every time that a new job is created, the server should be stopped and sidekiq image needs to be re-build, to perform that run the followed commands:

- docker compose stop
- docker compose up --build

## Contributing

We encourage you to contribute to [rails_boilerplate](https://github.com/espoo-dev/rails_boilerplate)! Please check out the [Contributing to rails_boilerplate guide](https://github.com/espoo-dev/rails_boilerplate/blob/master/CONTRIBUTING.md) for guidelines about how to proceed.
