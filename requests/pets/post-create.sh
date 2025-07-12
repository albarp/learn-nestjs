#!/bin/bash

curl -i -X POST \
  http://localhost:3000/pets \
  -H "Content-Type: application/json" \
  -d '{"name": "Pippo","age": 3, "type": "dog"}'