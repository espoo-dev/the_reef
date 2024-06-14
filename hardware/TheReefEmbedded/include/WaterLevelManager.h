#ifndef WATER_LEVEL_MANAGER_H
#define WATER_LEVEL_MANAGER_H

#include <sensor/Buoy.h>
#include <actuator/WaterPump.h>

class WaterLevelManager
{
private:
    SensorBuoy *_sensor;
    ActuatorWaterPump *_waterPump;

public:
    WaterLevelManager();
    void handlerWaterLevel();
    void setActuatorWaterPump(ActuatorWaterPump* actuatorWaterPump);
    void setSensorBuoy(SensorBuoy* sensorBuoy);
};

#endif
