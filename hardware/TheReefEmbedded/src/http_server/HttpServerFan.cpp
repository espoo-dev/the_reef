#include "http_server/HttpServerFan.h"

HttpServerFan::HttpServerFan(String host, String secretKey, String fanId, String path) : HttpServerBase(host, secretKey, path), _fanId(fanId) {}

void HttpServerFan::sendFanStatusOn()
{
    Serial.println("==================");
    Serial.println("Http fan on");
    if (isConnected())
    {

        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["fanId"] = _fanId;
        payload["on"] = true;
        char requestBody[50];
        serializeJson(payload, requestBody);

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
    }
}

void HttpServerFan::sendFanStatusOff()
{
    Serial.println("==================");
    Serial.println("Http fan off");

    if (isConnected())
    {
        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["fanId"] = _fanId;
        payload["on"] = false;
        char requestBody[50];
        serializeJson(payload, requestBody);

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
    }
}
