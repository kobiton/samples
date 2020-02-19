export KOBITON_USERNAME=$1
export KOBITON_API_KEY=$2

curl -R https://repo1.maven.org/maven2/org/json/json/20190722/json-20190722.jar -o ./lib/json.jar
curl -R http://repo1.maven.org/maven2/commons-codec/commons-codec/1.9/commons-codec-1.9.jar -o ./lib/commons-codec-1.9.jar

javac -cp ./lib/\* CheckDeviceStatus.java
java -cp ".:./lib/*" CheckDeviceStatus
