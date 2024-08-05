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
        char requestBody[50] = "{\"buoyId\": \"7\", \"newValue\": true}";

        int httpResponseCode = https.PUT(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        Serial.println("Response");
        Serial.println(https.getString());
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
        char requestBody[50] = "{\"buoyId\": \"7\", \"newValue\": false}";

        int httpResponseCode = https.PUT(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        Serial.println("Response");
        Serial.println(https.getString());
        https.end();
        Serial.println("==================");
    }
}
