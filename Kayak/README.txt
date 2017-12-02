
Install ReactJS

On the terminal: npm install -g create-react-app

Follow the steps on the terminal to start the servers:

Copy the Images and CSS folders from React/Public to Src

kafka-back-end server
1. cd kafka-back-end
2. npm install
3. npm start

Back-end server
	1. cd node
	2. npm install
	3. npm start

Front-end server
	1. cd reactlogin
	2. npm install
	3. npm start


KAFKA Server
zookeeper
cd C:\kafka_2.11-0.11.0.1
bin\windows\zookeeper-server-start.bat config\zookeeper.properties

kafka server
cd c:\kafka_2.11-0.11.0.1
 bin\windows\kafka-server-start.bat config\server.properties

topiCreation
cd c:\kafka_2.11-0.11.0.1
bin\windows\kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic
bin\windows\kafka-topics.bat --list --zookeeper localhost:2181
