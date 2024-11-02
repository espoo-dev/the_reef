#include "http_server/HttpServerTemperature.h"

HttpServerTemperature::HttpServerTemperature(String host, String secretKey, String path, String sensorId) : HttpServerBase(host, secretKey, path), _sensorId(sensorId) {}

void HttpServerTemperature::sendCurrentTemperature(float temperature)
{
    Serial.println("==================");
    Serial.println("Enviado temperatura: " + String(temperature));

    if (isConnected())
    {
        HTTPClient https = setupHttps();
        JsonDocument payload;
        payload["indicatorId"] = _sensorId;
        payload["newValue"] = String(temperature);
        char requestBody[50];
        serializeJson(payload, requestBody);

        int httpResponseCode = https.PUT(requestBody);
        Serial.print(requestBody);
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        https.end();
    }
}