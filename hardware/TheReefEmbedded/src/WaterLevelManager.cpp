#include "WaterLevelManager.h"

WaterLevelManager::WaterLevelManager()
{
}

void WaterLevelManager::handlerWaterLevel()
{
    if (_sensor->isWaterLowLevel() && !_waterPump->isWaterPumpOn())
    {
        _waterPump->turnOn();
        _serverBuoy->sendBuoyStatusOn();
        return;
    }

    if (!_sensor->isWaterLowLevel() && _waterPump->isWaterPumpOn())
    {
        _waterPump->turnOff();
        _serverBuoy->sendBuoyStatusOff();
        return;
    }
}

void WaterLevelManager::setActuatorWaterPump(ActuatorWaterPump *actuatorWaterPump)
{
    _waterPump = actuatorWaterPump;
}

void WaterLevelManager::setSensorBuoy(SensorBuoy *sensorBuoy)
{
    _sensor = sensorBuoy;
}

void WaterLevelManager::setHttpServerBuoy(HttpServerBuoy *httpServerBuoy)
{
    _serverBuoy = httpServerBuoy;
}
