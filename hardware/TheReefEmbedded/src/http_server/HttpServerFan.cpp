#include "http_server/HttpServerFan.h"

HttpServerFan::HttpServerFan(String host, String secretKey, WiFiClient client) : HttpServerBase(host, secretKey, client) {}
    // _host = "https://myreef.fly.dev/fans/update_on";

void HttpServerFan::sendFanStatusOn()
{
    Serial.println("==================");
    Serial.println("Http fan on");

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

void HttpServerFan::sendFanStatusOff()
{
    Serial.println("==================");
    Serial.println("Http fan off");
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
