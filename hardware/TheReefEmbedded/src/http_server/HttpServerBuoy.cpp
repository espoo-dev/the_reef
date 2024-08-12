#include "http_server/HttpServerBuoy.h"

HttpServerBuoy::HttpServerBuoy(String host, String secretKey) : HttpServerBase(host, secretKey) {}

// api/v1/on_off_sensor/{id}/on_off_value


void HttpServerBuoy::sendBuoyActive()
{
    Serial.println("==================");
    Serial.println("Http Buoy on");

    if (isConnected())
    {
        HTTPClient https = setupHttps("/buoys/update");
        char requestBody[50] = "{\"buoyId\": \"8\", \"newValue\": true}";

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

        HTTPClient https = setupHttps("/buoys/update");
        char requestBody[50] = "{\"buoyId\": \"8\", \"newValue\": false}";

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
        Serial.println("==================");
    }
}
