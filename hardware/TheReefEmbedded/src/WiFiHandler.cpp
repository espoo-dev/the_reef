#include "WiFiHandler.h"

WiFiHandler::WiFiHandler() : _wifiManager(WiFiManager()), _client(WiFiClient()) {}

bool WiFiHandler::begin()
{
    bool res = _wifiManager.autoConnect("TheReefConnectAP", "password");

    if (res)
    {
        Serial.println("connected...");
    }

    return res;
}

void WiFiHandler::disconnect()
{
    delay(100);
    static bool disconnected = false;

    if (!disconnected)
    {
        Serial.println("Desconectando");
        _wifiManager.resetSettings();
        disconnected = true;
        // ESP.restart(); ativar depois com botão
    }
    delay(100);
}

bool WiFiHandler::isConnected()
{
    return WiFi.status() == WL_CONNECTED;
}

String WiFiHandler::getLocalIp()
{
    return WiFi.localIP().toString();
}

WiFiClient &WiFiHandler::getClient()
{
    return _client;
}
