#include "TemperatureManager.h"
#include <limits.h>

TemperatureManager::TemperatureManager(float minTemperature, float maxTemperature, float setPoint)
    : _minTemperature(minTemperature), _maxTemperature(maxTemperature), _setPoint(setPoint), _intervalMsSendCurrentTemperature(5000) {}

bool TemperatureManager::isIdealTemperature()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    return currentTemperature <= _setPoint;
}

bool TemperatureManager::isOverTemperature()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    return currentTemperature > _maxTemperature;
}

void TemperatureManager::sendTemperatureToServer()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    Serial.println("Temperatura atual: " + String(currentTemperature) + "ºC");
    _httpServerTemperature->sendCurrentTemperature(currentTemperature);
}

bool TemperatureManager::canSendTemperatureToServer()
{

    unsigned long currentMillis = millis();
    static unsigned long previousMillis = 0;

    float elapsedTime = (currentMillis % ULONG_MAX) - previousMillis;

    if (elapsedTime < 0)
    {
        elapsedTime = elapsedTime + ULONG_MAX;
    }

    return elapsedTime >= _intervalMsSendCurrentTemperature;
}

void TemperatureManager::handlerTemperature()
{
    if (canSendTemperatureToServer())
    {
        sendTemperatureToServer();
    }

    bool fanStatusOn = _fan->getStatusFan();

    if (fanStatusOn)
    {
        Serial.println("FAN ON!");
    }

    if (fanStatusOn && isIdealTemperature())
    {
        _fan->turnOff();
        _httpServerFan->sendFanStatusOff();
        return;
    }

    if (isOverTemperature())
    {
        _fan->turnOn();
        _httpServerFan->sendFanStatusOn();
        return;
    }
}

void TemperatureManager::printCurrentTemperatureOnLcd()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    _lcdManager->printTextAtTop("Temperatura: "+String(currentTemperature)+"C");
}

void TemperatureManager::setTemperatureSensor(SensorTemperature *sensor)
{
    _sensor = sensor;
}

void TemperatureManager::setActuatorFan(ActuatorFan *actuator)
{
    _fan = actuator;
}

void TemperatureManager::setHttpServerFan(HttpServerFan *httpServerFan)
{
    _httpServerFan = httpServerFan;
}

void TemperatureManager::setHttpServerTemperature(HttpServerTemperature *httpServerTemperature)
{
    _httpServerTemperature = httpServerTemperature;
}

void TemperatureManager::setLcdManager(LcdManager* lcdManager)
{
    _lcdManager = lcdManager;
}
