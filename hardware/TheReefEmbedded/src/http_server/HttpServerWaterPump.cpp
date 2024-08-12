#include "http_server/HttpServerWaterPump.h"

HttpServerWaterPump::HttpServerWaterPump(String host, String secretKey) : HttpServerBase(host, secretKey) {}

void HttpServerWaterPump::sendWaterPumpStatusOn()
{
    Serial.println("==================");
    Serial.println("Http bomba on");

    if (isConnected())
    {
        HTTPClient https = setupHttps("/fans/update_on");
        char requestBody[50] = "{\"on\": \"true\", \"fanId\": 8}";

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
        HTTPClient https = setupHttps("/fans/update_on");
        char requestBody[50] = "{\"on\": \"false\", \"fanId\": 8}";

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
    }
}
