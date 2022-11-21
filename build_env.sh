#bin/bash/
# docker login
docker build -f Dockerfile-BuildEnv-Prepare -t tremendousure/sortlog . 
docker push tremendousure/sortlog   