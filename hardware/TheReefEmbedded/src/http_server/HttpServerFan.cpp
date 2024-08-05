#include "http_server/HttpServerFan.h"

HttpServerFan::HttpServerFan(String host, String secretKey) : HttpServerBase(host, secretKey) {}

void HttpServerFan::sendFanStatusOn()
{
    Serial.println("==================");
    Serial.println("Http fan on");
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

void HttpServerFan::sendFanStatusOff()
{
    Serial.println("==================");
    Serial.println("Http fan off");

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
