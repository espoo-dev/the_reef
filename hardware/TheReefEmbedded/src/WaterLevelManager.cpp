#include "WaterLevelManager.h"

bool WaterLevelManager::_previousBuoyActiveStatus = false;

WaterLevelManager::WaterLevelManager() {}

void WaterLevelManager::setPreviousBuoyActiveStatus(bool lowLevelStatus)
{
    _previousBuoyActiveStatus = lowLevelStatus;
}

void WaterLevelManager::sendBuoyStatusToServer(bool status)
{
    if (status)
    {
        _serverBuoy->sendBuoyActive();
        return;
    }

    _serverBuoy->sendBuoyInactive();
}

void WaterLevelManager::handlerWaterLevel()
{
    // TODO logica para quando tinhamos o controle da bomba via código, por hora vou deixar comentado
    // if (_sensor->isActive() && !_waterPump->isWaterPumpOn())
    // {
    //     _waterPump->turnOn();
    //     _serverBuoy->sendBuoyActive();
    //     return;
    // }

    // if (!_sensor->isActive() && _waterPump->isWaterPumpOn())
    // {
    //     _waterPump->turnOff();
    //     _serverBuoy->sendBuoyInactive();
    //     return;
    // }

    bool currentBuoyActiveStatus = _sensor->isActive();
    if (currentBuoyActiveStatus != _previousBuoyActiveStatus)
    {
        setPreviousBuoyActiveStatus(currentBuoyActiveStatus);
        sendBuoyStatusToServer(currentBuoyActiveStatus);
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
