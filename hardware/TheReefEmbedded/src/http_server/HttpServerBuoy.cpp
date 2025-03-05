// Não usado no momento
#include "http_server/HttpServerBuoy.h"

HttpServerBuoy::HttpServerBuoy(String host, String secretKey, String buoyId, String path) : HttpServerBase(host, secretKey, path), _buoyId(buoyId) {}

// api/v1/on_off_sensor/{id}/on_off_value

void HttpServerBuoy::sendBuoyActive()
{
    Serial.println("==================");
    Serial.println("Http Buoy on");

    if (isConnected())
    {
        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["buoyId"] = _buoyId;
        payload["newValue"] = true;
        char requestBody[50];
        serializeJson(payload, requestBody);

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
        Serial.println("==================");
    }
}

void HttpServerBuoy::sendBuoyInactive()
{
    Serial.println("==================");
    Serial.println("Http Buoy off");

    if (isConnected())
    {

        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["buoyId"] = _buoyId;
        payload["newValue"] = false;
        char requestBody[50];
        serializeJson(payload, requestBody);

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
        Serial.println("==================");
    }
}
