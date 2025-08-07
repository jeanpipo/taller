FROM amazoncorretto:21

COPY target/taller-0.0.1-SNAPSHOT.jar /taller.jar

ENTRYPOINT ["java","-jar","/taller.jar"]