#include "http_server/HttpServerWaterPump.h"

HttpServerWaterPump::HttpServerWaterPump(String host, String secretKey, String waterPumpId, String path) : HttpServerBase(host, secretKey, path), _waterPumpId(waterPumpId) {}

void HttpServerWaterPump::sendWaterPumpStatusOn()
{
    Serial.println("==================");
    Serial.println("Http bomba on");

    if (isConnected())
    {
        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["fanId"] = _waterPumpId;
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

void HttpServerWaterPump::sendWaterPumpStatusOff()
{
    Serial.println("==================");
    Serial.println("Http bomba off");

    if (isConnected())
    {
        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["fanId"] = _waterPumpId;
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
