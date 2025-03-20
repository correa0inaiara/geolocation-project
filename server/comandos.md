// constrói a imagem do projeto
docker build . -t node-web-app:1.0

// roda a imagem do projeto
docker run -v //c/Estudos/Entrevistas/technical-assessment-dev-main:/usr/src/ -p 40100:3003 -d node-web-app:1.0

// verifica os logs
docker logs a013cf3b9cbf
