#include "WaterLevelManager.h"

WaterLevelManager::WaterLevelManager()
{
}

void WaterLevelManager::handlerWaterLevel()
{
    if (_sensor->isWaterLevelAbove())
    {
        _waterPump->turnOn();
        return;
    }

    if (!_sensor->isWaterLevelAbove() && _waterPump->isWaterPumpOn())
    {
        _waterPump->turnOff();
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
