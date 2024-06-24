#include "TemperatureManager.h"
#include <limits.h>

bool TemperatureManager::_previousMillisInitialized = false;
unsigned long TemperatureManager::_previousMillis = 0;

TemperatureManager::TemperatureManager(float minTemperature, float maxTemperature)
    : _minTemperature(minTemperature), _maxTemperature(maxTemperature), _intervalMsSendCurrentTemperature(5000) {}

bool TemperatureManager::isIdealTemperature()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    return currentTemperature <= _minTemperature;
}

bool TemperatureManager::isOverTemperature()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    return currentTemperature >= _maxTemperature;
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
    if (!_previousMillisInitialized)
    {
        _previousMillis = 0;
        _previousMillisInitialized = true;
    }

    float elapsedTime = (currentMillis % ULONG_MAX) - _previousMillis;
    Serial.print("elapsedTime: ");
    Serial.println(elapsedTime);
    Serial.print("_previousMillis:");
    Serial.println(_previousMillis);

    if (elapsedTime < 0)
    {
        elapsedTime = elapsedTime + ULONG_MAX;
    }

    bool isCan = elapsedTime >= _intervalMsSendCurrentTemperature + _previousMillis;

    Serial.print("can: ");
    Serial.println(isCan);

    if (isCan)
    {
        _previousMillis = elapsedTime;
    }

    return isCan;
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

    if (!fanStatusOn && isOverTemperature())
    {
        _fan->turnOn();
        _httpServerFan->sendFanStatusOn();
        return;
    }
}

void TemperatureManager::printCurrentTemperatureOnLcd()
{
    float currentTemperature = _sensor->readCelsiusTemperature();
    _lcdManager->printTemperatureAtTop(currentTemperature);
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

void TemperatureManager::setLcdManager(LcdManager *lcdManager)
{
    _lcdManager = lcdManager;
}
