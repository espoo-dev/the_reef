#include "http_server/HttpServerFan.h"

HttpServerFan::HttpServerFan(String secretKey, WiFiClient client) : _secretKey(secretKey), _client(client)
{
    _host = "https://myreef.fly.dev/fans/update_on";
}

HTTPClient HttpServerFan::setupHttp()
{
    HTTPClient https;
    https.begin(_client, _host);
    https.addHeader("Content-Type", "application/json");
    https.addHeader("authorization", _secretKey);

    return https;
}

void HttpServerFan::sendFanStatusOn()
{
    HTTPClient https = setupHttp();
    char requestBody[50]; // Ajuste o tamanho do array conforme necessário

    strcpy(requestBody, "{\"on\":\"");
    strcat(requestBody, "true");
    strcat(requestBody, "\", \"fanId\":\"1\"}");

    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}

void HttpServerFan::sendFanStatusOff()
{
    HTTPClient https = setupHttp();
    char requestBody[50]; // Ajuste o tamanho do array conforme necessário

    strcpy(requestBody, "{\"on\":\"");
    strcat(requestBody, "false");
    strcat(requestBody, "\", \"fanId\":\"1\"}");

    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}
