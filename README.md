## How to deploy:

1. Clone a repo: 

   `git clone https://github.com/shamanu4/docsearch && cd docsearch`

2. Setup docker or docker swarm:
   ```
   docker-compose up -d   
   
   OR

   docker swarm init --advertise-addr <SERVER_IP>
   docker node update --label-add db_role=master <NODE_ID>
   docker node update --label-add web_role=master <NODE_ID>
   docker node update --label-add nginx_role=master <NODE_ID>
   
   ```
   
3. Run a build script:

   `./build.sh`

4. Deploy a stack:

   `docker stack deploy --compose-file docker-compose.yml docsearch`
   
5. Profit. Your app should be accessible on `http://<SERVER_IP>:80`
