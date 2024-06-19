#include "http_server/HttpServerBuoy.h"

HttpServerBuoy::HttpServerBuoy(String host, String secretKey, WiFiClient client) : HttpServerBase(host, secretKey, client) {}
    // buoys/update

void HttpServerBuoy::sendBuoyActive()
{
    Serial.println("==================");
    Serial.println("Http Buoy on");

    // HTTPClient https = setupHttp();
    // char requestBody[50]; // Ajuste o tamanho do array conforme necessário

    // strcpy(requestBody, "{\"on\":\"");
    // strcat(requestBody, "true");
    // strcat(requestBody, "\", \"fanId\":\"1\"}");

    // int httpResponseCode = https.PUT(requestBody);
    // Serial.print(requestBody);
    // Serial.print("HTTP Response code: ");
    // Serial.println(httpResponseCode);
    // https.end();
}

void HttpServerBuoy::sendBuoyInactive()
{
    Serial.println("==================");
    Serial.println("Http Buoy off");
    // HTTPClient https = setupHttp();
    // char requestBody[50]; // Ajuste o tamanho do array conforme necessário

    // strcpy(requestBody, "{\"on\":\"");
    // strcat(requestBody, "false");
    // strcat(requestBody, "\", \"fanId\":\"1\"}");

    // int httpResponseCode = https.PUT(requestBody);
    // Serial.print(requestBody);
    // Serial.print("HTTP Response code: ");
    // Serial.println(httpResponseCode);
    // https.end();
}
