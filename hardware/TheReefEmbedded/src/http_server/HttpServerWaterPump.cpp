#include "http_server/HttpServerWaterPump.h"

HttpServerWaterPump::HttpServerWaterPump(String host, String secretKey) : HttpServerBase(host, secretKey) {}


void HttpServerWaterPump::sendWaterPumpStatusOn()
{
    Serial.println("==================");
    Serial.println("Http bomba on");
    HTTPClient https = setupHttps("/fans/update_on");
    char requestBody[50] = "{\"on\": \"true\", \"fanId\": 6}";

    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}

void HttpServerWaterPump::sendWaterPumpStatusOff()
{
    Serial.println("==================");
    Serial.println("Http bomba off");
    HTTPClient https = setupHttps("/fans/update_on");
    char requestBody[50] = "{\"on\": \"false\", \"fanId\": 6}";

    int httpResponseCode = https.PUT(requestBody);
    Serial.print(requestBody);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    https.end();
}
